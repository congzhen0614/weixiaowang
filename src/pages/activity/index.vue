<template>
  <div class="active-list-page">
    <v-top :scrollTop="scrollHeight"></v-top>
    <div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
      <section ref="content" class="content">
        <v-banner :style="{ height: bannerHeight }" :listImg="listImg" class="banner" @chooseItem="chooseItem"></v-banner>
        <v-menu :params="params"></v-menu>
        <v-praise :starList="starList"></v-praise>
        <v-hot :list="list" :titleFlag="titleFlag"></v-hot>
      </section>
    </div>
    <img v-show="showToTopBtn" @click="scrollToTop()" class="to-top-icon" src="./to_top_icon.png">
  </div>
</template>

<script>
  import top from './top/top.vue'
  import menu from './menu/menu.vue'
  import praise from './praise/praise.vue'
  import hot from './hot/hot.vue'
  import banner from '@/components/common/banner/banner'
  import BScroll from 'better-scroll'
  import area from '../../../static/data/area.json'
  import {getLocation, latitude, longitude, cityName} from '@/store/location/location'
  export default {
    name: 'active-list-page',
    components: {
      'v-top': top,
      'v-menu': menu,
      'v-praise': praise,
      'v-hot': hot,
      'v-banner': banner
    },
    data () {
      return {
        // banner高度
        bannerHeight: window.innerWidth * 0.6 + 'px',
        // 屏幕高度
        winHeight: window.innerHeight - 52 + 'px',
        cityId: '3501',
        adviceList: [],
        starList: [],
        list: [],
        scroller: '',
        scrollHeight: 0,
        pageNum: 1,
        reload: true,
        loadMore: true,
        titleFlag: true,
        refresh: true
      }
    },
    computed: {
      params () {
        // 调取百度地图api接口
        getLocation()
        // 遍历area城市信息
        area.result.forEach(items => {
          items.citylist.forEach(item => {
            if (item.cityname == cityName) {
              this.cityId = item.cityid
            }
          })
        })
        return {
          lat: latitude !== '' ? latitude : '39',
          lng: longitude !== '' ? longitude : '116',
          city_id: this.cityId,
          pageNum: this.pageNum,
          cls: 14
        }
      },
      showToTopBtn () {
        return this.scrollHeight > window.innerHeight
      },
      listImg () {
        let list = []
        if (this.adviceList.length) {
          this.adviceList.forEach(item => {
            list.push({
              url: item.logo
            })
          })
        } else {
          list = [{
            url: require('./bannerIsNone.png')
          }]
        }
        return list
      }
    },
    created () {
      this.loadData()
    },
    mounted () {},
    methods: {
      loadData () {
        this.$ajax.actHomeJson(this.params).then(res => {
          this.adviceList = res.data.data.adviceList
          this.starList = res.data.data.starList
          this.list = res.data.data.list
          this.reload = true
          this.$nextTick(() => {
            this.initBetterScroll()
          })
        }, err => {
          console.log(err)
        })
      },
      loadMoreList () {
        this.$ajax.listActivity(this.params).then(res => {
          this.loadMore = true
          res.data.data.list.forEach(item => {
            this.list.push(item)
          })
          this.$nextTick(() => {
            setTimeout(() => {
              this.initBetterScroll()
            }, 500)
          })
        }, err => {
          console.log(err)
        })
      },
      // 初始化 scroller
      initBetterScroll () {
        if (!this.scroller) {
          this.scroller = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true
          })
          // 监听滚动条
          this.listenScroll()
        } else {
          this.scroller.refresh()
        }
      },
      listenScroll () {
        this.scroller.on('scroll', pos => {
          if (pos.y >= 100 && this.reload) {
            this.loadData()
            this.reload = false
            if (this.scrollTop > this.$refs.content.offsetHeight - window.innerHeight && this.refresh) {
              this.refresh = false
              this.initBetterScroll()
            }
          }
          this.scrollHeight = -pos.y
        })
      },
      scrollToTop () {
        this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
      },
      chooseItem (index) {
        console.log(index)
      }
    },
    watch: {
      scrollHeight (val) {
        // 下拉到最下面加载更多
        if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
          this.loadMore = false
          this.pageNum += 1
          this.loadMoreList()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './index.styl'
</style>
