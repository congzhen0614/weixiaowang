<template>
  <div class="activity-details">
    <v-head></v-head>
    <div class="wrapper" ref="wrapper" :style="{height: winHeight}">
      <section class="content" ref="content">
        <v-banner :style="{ height: bannerHeight }" :listImg="listImg" @chooseItem="chooseItem"></v-banner>
        <v-title :listData="listData"></v-title>
        <div class="interval"></div>
        <v-message :listData="listData"></v-message>
        <div class="interval"></div>
        <v-introduction :listData="listData"></v-introduction>
        <div class="interval"></div>
        <v-comment :listData="listData" :scrollHeight="scrollHeight" :contentHeight="contentHeight"></v-comment>
      </section>
    </div>
    <v-footer :listData="listData"></v-footer>
    <img v-show="showToTopBtn" @click="scrollToTop()" class="to-top-icon" src="./to_top_icon.png">
  </div>
</template>

<script>
import head from './top/top.vue'
import banner from '@/components/common/banner/banner'
import title from './title/title.vue'
import message from './message/message.vue'
import introduction from './introduction/introduction.vue'
import comment from './comment/comment.vue'
import footer from './footer/footer.vue'
import BScroll from 'better-scroll'
export default {
  name: 'activity-details',
  components: {
    'v-head': head,
    'v-banner': banner,
    'v-title': title,
    'v-message': message,
    'v-introduction': introduction,
    'v-comment': comment,
    'v-footer': footer
  },
  data () {
    return {
      // 屏幕高度
      winHeight: window.innerHeight - 45 + 'px',
      // 初始化Bscroll
      scroller: '',
      // BScroll滚动高度
      scrollHeight: 0,
      // banner高度
      bannerHeight: window.innerWidth * 0.6 + 'px',
      // banner图片数组
      bannerImages: [],
      // 是否可以刷新
      reload: true,
      // 是否可以加载更多
      loadMore: true,
      // 页码
      pageNum: 0,
      // 数据
      listData: {},
      // content的高度
      contentHeight: 0
    }
  },
  created () {},
  mounted () {
    this.loadData()
    this.contentHeight = this.$refs.content.offsetHeight
  },
  computed: {
    showToTopBtn () {
      return this.scrollHeight > window.innerHeight
    },
    listImg () {
      let list = []
      if (this.bannerImages.length) {
        this.bannerImages.forEach(item => {
          list.push({
            url: item
          })
        })
      } else {
        list.push({
          url: require('./banner.jpg'),
          link: ''
        })
      }
      return list
    },
    params () {
      return {
        id: this.$route.query.id,
        cls: this.$route.query.cls,
        lat: this.$route.query.lat,
        lng: this.$route.query.lng,
        _uid: localStorage.getItem('userId')
      }
    }
  },
  methods: {
    loadData () {
      this.$ajax.activityDetil(this.params).then(res => {
        this.listData = res.data.data
        this.bannerImages = res.data.data.imgs
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
        this.listenScroll()
      } else {
        this.scroller.refresh()
      }
    },
    // 监听BScroll滑动
    listenScroll () {
      this.scroller.on('scroll', pos => {
        if (pos.y >= 100 && this.reload) {
          console.log('上拉到顶部刷新数据')
        }
        this.scrollHeight = -pos.y
      })
    },
    // 点击回到顶部
    scrollToTop () {
      this.scroller.scrollTo(0, 0, 500)
    },
    // 点击banner
    chooseItem (param) {
      console.log(param)
    },
  },
  watch: {
    scrollHeight (val) {
      // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        this.pageNum += 1
        console.log('下拉到底部加载更多')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './index.styl'
</style>
