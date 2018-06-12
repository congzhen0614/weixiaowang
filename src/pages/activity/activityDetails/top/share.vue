<template>
  <div class="activity-share">
    <section class="mask" @click="change('click')"></section>
    <!-- 分享模块 -->
    <div class="share-box" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <h3>分享到</h3>
      <div class="share-type">
        <ul>
          <li @click="shareWeixin('onMenuShareAppMessage')">
            <img src="./shareImg/weixin.png">
            <p>微信好友</p>
          </li>
          <li @click="shareWeixin('onMenuShareTimeline')">
            <img src="./shareImg/friend.png">
            <p>微信朋友圈</p>
          </li>
          <li @click="shareWeixin('onMenuShareQQ')">
            <img src="./shareImg/qq.png">
            <p>手机QQ</p>
          </li>
          <li @click="shareWeixin('onMenuShareQZone')">
            <img src="./shareImg/kongjian.png">
            <p>QQ空间</p>
          </li>
          <li>
          </li>
          <li @click="shareWeixin()">
            <img src="./shareImg/weibo.png">
            <p>新浪微博</p>
          </li>
          <li @click="shareWeixin()">
            <img src="./shareImg/wxlogo.png">
            <p>微校网圈子</p>
          </li>
          <li>
          </li>
        </ul>
      </div>
      <div class="cle" @click="change('click')">
        <p>取消</p>
      </div>
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
    shareWeixin (val) {
      console.log(val)
    },
    change (item) {
      this.$emit('closeShare', item)
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
  top 0
  left 0
.share-box
  width 100%
  height 6.88rem
  position fixed
  left 0
  bottom 0
  background #fff
  z-index 3
  animation-duration 0.5s !important
  > h3
    line-height 1.5rem
    font-size 0.3rem
    color #9C9890
    font-family PingFangSC
    text-align center
  .share-type
    width 100%
    height 4.4rem
    background #fff
    text-align center
    display flex
    flex-wrap: wrap
    ul
      width 100%
      display flex
      flex-wrap: wrap
      li
        flex 1
        width 25%
        max-width 25%
        min-width 25%
        height 2.2rem
        img
          width 1rem
          height 1rem
        > p
          margin-top 0.2rem
          color #C7C7CC
          font-size 0.2rem
          font-family PingFangSC
  .cle
    background #F8F7F6
    height 1.1rem
    > p
      font-size 0.34rem
      color #52504C
      line-height 1.1rem
      text-align center
</style>
