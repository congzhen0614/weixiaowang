<template>
  <div class="activity-more">
    <section class="mask" @click="change('click')"></section>
    <div class="more-box" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <ul>
        <li @click="goHome()">
          <img src="./toHome.png">
          <p>首页</p>
        </li>
        <li @click="goMessage()">
          <img src="./toMessage.png">
          <p>消息</p>
        </li>
        <li @click="goSearch()">
          <img src="./toSearch.png">
          <p>搜索</p>
        </li>
        <li @click="goMine()">
          <img src="./toMine.png">
          <p>我的微校网</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    goHome () {
      this.$router.push({
        path: '/'
      })
    },
    goMessage () {
      this.$router.push({
        path: '/mine/message/index'
      })
    },
    goSearch () {
      this.$router.push({
        path: '/search'
      })
    },
    goMine () {
      this.$router.push({
        path: '/mine'
      })
    },
    change () {
      this.$emit('closeMore')
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mask
  position fixed
  z-index 2
  width 100%
  height 100%
  background-color rgba(0, 0, 0, 0.5)
  top 0.88rem
  left 0
.more-box
  width 100%
  height 2.26rem
  position absolute
  left 0
  top 0rem
  background #fff
  z-index 2
  animation-duration 0.5s !important
  > ul
    display flex
    text-align center
    margin-top 0.5rem
    li
      flex 1
      width 100%
      height 1.28rem
      > img
        width 0.8rem
        height 0.8rem
      > p
        font-size 0.26rem
        color: #8D7A53
        font-family PingFangSC
  .more-area
    width 100%
</style>
