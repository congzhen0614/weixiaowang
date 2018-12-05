<template>
  <main class="spyp-details">
    <header class="spyp-header">
      <img class="header-left-icon"  @click="$router.goBack()" src="../../spypIcon/go-back-icon.png"/>
      <img class="header-right-icon" @click="clickMore" src="../../spypIcon/more-icon.png" />
      <img class="header-right-icon" @click="clickCode" src="../../spypIcon/code-icon.png" />
    </header>
    <section class="spyp-player">
      <v-player></v-player>
    </section>
    <section class="spyp-intro">
      <div class="spyp-album">
        <img src="../../spypIcon/avatar.jpg" alt="">
        <span class="spyp-album-name">当前音频专辑名称</span>
        <span class="spyp-album-coll">12.5万人已收藏</span>
      </div>
      <div class="spyp-anchor">
        <span class="spyp-anchor-title">主播</span>
        <div class="spyp-anchor-head">
          <img src="../../spypIcon/avatar.jpg" />
          <div class="spyp-anchor-content">
            <p class="spyp-anchor-name">
              <span>主播名主播名主播名主播名主播名主播名</span>
              <img src="../../spypIcon/anchor-icon.png" />
            </p>
            <p class="spyp-anchor-coll">10万人关注</p>
          </div>
          <span class="spyp-anchor-follow">关注TA</span>
          <!--<span class="spyp-anchor-follow">取消关注</span>-->
        </div>
        <div class="spyp-anchor-intro">主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简介主播简</div>
      </div>
    </section>
    <section class="spyp-comment"></section>
  </main>
</template>

<script>
import player from '@/components/spyp/spypPlayer/spypPlayer.vue'
export default {
  name: 'spyp-details',
  components: {
    'v-player': player
  },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickMore () {
      // 更多
    },
    clickCode () {
      // 二维码
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './spypDetails.styl'
</style>
