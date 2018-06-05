<template>
  <div class="actQuery">
    <v-top :scrollTop="scrollHeight"></v-top>
    <div class="query">
      <ul class="queryList">
        <li v-for="(item, index) in queryArray" :key="index" @click="clickQuery(index)">{{ item }}<span :class="{clickStyle: clickIndex==index+1}"></span></li>
      </ul>
    </div>
    <div class="queryShade" :style="{height: winHeight}" v-if="clickIndex>0" @click="clickHidden()">
      <ul :style="{'max-height': winHeight}" style="overflow: auto">
        <li v-for="(item, index) in queryTypeList" @click.stop="clickLoadQuery(item.code)">{{ item.type_name }}<span></span></li>
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
        queryArray: ['活动类型', '活动区域', '适合年龄段', '其他'],
        clickIndex: 0,
        titleFlag: false,
        list: [],
        pageNum: 1,
        loadMore: true,
        activity_type_list: [],
        age_type_list: [],
        other_type_list: [],
        region_list: [],
        queryTypeList: [],
        activityType: 0
      }
    },
    computed: {
      params () {
        return {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
          city_id: this.$route.query.city_id,
          page_number: this.pageNum,
          page_size: 20,
          cls: 14
        }
      },
      typeActivity () {
        return {
          type: 'activity_type',
          type1: 'age_type',
          type2: 'train_type',
          type3: 'other_type',
          city_id: this.$route.query.city_id,
        }
      },
      showToTopBtn () {
        return this.scrollHeight > window.innerHeight
      }
    },
    created () {},
    mounted () {
      this.loadEnumVelue()
      this.loadData(this.params)
    },
    methods: {
      loadData (params) {
        this.$ajax.listActivity(params).then(res => {
          this.loadMore = true
          this.list = this.list.concat(res.data.data.list)
          this.$nextTick(() => {
            setTimeout(() => {
              this.initBetterScroll()
            }, 500)
          })
        }, err => {
          console.log(err)
        })
      },
      loadEnumVelue () {
        this.$ajax.enumVelue(this.typeActivity).then(res => {
          this.activity_type_list = res.data.data.activity_type_list
          this.age_type_list = res.data.data.age_type_list
          this.other_type_list = res.data.data.other_type_list
          this.region_list = res.data.data.region_list
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
        this.activityType = index
        if (this.clickIndex > 0 || this.clickIndex === index + 1) {
          this.clickIndex = 0
        } else {
          this.clickIndex = index + 1
        }
        if (index === 0) {
          this.queryTypeList = this.activity_type_list
        } else if (index === 1) {
          this.queryTypeList = []
          this.region_list.forEach(item => {
            this.queryTypeList.push({
              code: item.id,
              type_name: item.region
            })
          })
        } else if (index === 2) {
          this.queryTypeList = this.age_type_list
        } else if (index === 3) {
          this.queryTypeList = this.other_type_list
        }
      },
      clickHidden () {
        this.clickIndex = 0
      },
      clickLoadQuery (code) {
        let params = {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
          city_id: this.$route.query.city_id,
          page_number: this.pageNum,
          page_size: 20,
          cls: 14
        }
        this.clickIndex = 0
        switch (this.activityType) {
          case 0:
            // 活动类型
            params.type = code
            break;
          case 1:
            // 活动地区
            params.region_id = code
            break;
          case 2:
            // 年龄阶段
            params.age = code
            break;
          case 3:
            // 其他
            if (code==='1') {
              // 按照距离赛选
              params.near = 1
            } else if (code==='2') {
              // 按照热度赛选
              params.ishot = 1
            } else if (code==='3') {
              // 按照时间赛选
              params.ord_time = 1
            } else if (code==='4') {
              // 按照价格赛选
              params.fee = 1
            }
            break;
        }
        this.loadData(params)
      },
      scrollToTop () {
        this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
      }
    },
    watch: {
      scrollHeight (val) {
        // 下拉到最下面加载更多
        if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
          this.loadMore = false
          this.pageNum += 1
          this.initBetterScroll()
          this.loadData(this.params)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './query.styl'
</style>
