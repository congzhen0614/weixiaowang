<template>
  <div class="actQuery">
    <v-top :scrollTop="scrollHeight"></v-top>
    <div class="query">
      <ul class="queryList">
        <li v-for="(item, index) in queryArray" :key="index" @click="clickQuery(index)">{{ item }}<span :class="{clickStyle: clickIndex==index+1}"></span></li>
      </ul>
    </div>
    <div class="queryShade" :style="{height: winHeight}" v-if="clickIndex>0" @click="clickHidden()">
      <ul>
        <li>全部<span></span></li>
        <li>亲子活动<span></span></li>
        <li>校园活动<span></span></li>
        <li>节目剧场<span></span></li>
      </ul>
    </div>
    <div class="shade"></div>
    <div class="wrapper" ref="wrapper" :style="{height: winHeight}">
      <div class="content" ref="content">
        <v-hot :list="list" :titleFlag="titleFlag"></v-hot>
      </div>
    </div>
    <img v-show="showToTopBtn" @click="scrollToTop()" class="to-top-icon" src="./to_top_icon.png">
  </div>
</template>

<script>
  import top from './top/top.vue'
  import hot from '../hot/hot.vue'
  import BScroll from 'better-scroll'
  export default {
    name: 'actQuery',
    components: {
      'v-top': top,
      'v-hot': hot
    },
    data () {
      return {
        // 屏幕高度
        winHeight: window.innerHeight - 103 + 'px',
        scroller: '',
        scrollHeight: 0,
        queryArray: ['亲子活动', '西湖区', '全年龄段', '发布时间'],
        clickIndex: 0,
        titleFlag: false,
        list: []
      }
    },
    computed: {
      params () {
        return {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
          city_id: this.$route.query.city_id,
          cls: 14
        }
      },
      showToTopBtn () {
        return this.scrollHeight > window.innerHeight
      }
    },
    created () {},
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$ajax.listActivity(this.params).then(res => {
          this.list = res.data.data.list
          this.$nextTick(() => {
            setTimeout(() => {
              this.initBetterScroll()
            }, 500)
          })
        }, err => {
          console.log(err)
        })
      },
      initBetterScroll () {
        if (!this.scroller) {
          this.scroller = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true
          })
          this.listenScroll()
        } else {
          this.scroller.refresh()
        }
      },
      listenScroll () {
        this.scroller.on('scroll', pos => {
          if (pos.y > 100) {
            console.log('上拉刷新!')
          }
          this.scrollHeight = -pos.y
        })
      },
      clickQuery (index) {
        this.clickIndex = index + 1
      },
      clickHidden () {
        this.clickIndex = 0
      },
      scrollToTop () {
        this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
      }
    },
    watch: {
      scrollHeight (val) {
        // 下拉到最下面加载更多
        if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
          console.log('下拉加载更多!')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './query.styl'
</style>
