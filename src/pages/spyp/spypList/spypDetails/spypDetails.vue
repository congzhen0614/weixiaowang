<template>
  <main class="spyp-details">
    <header class="spyp-header">
      <img class="header-left-icon"  @click="$router.goBack()" src="../../spypIcon/go-back-icon.png"/>
      <img class="header-right-icon" @click="clickMore" src="../../spypIcon/more-icon.png" />
      <img class="header-right-icon" @click="clickCode" src="../../spypIcon/code-icon.png" />
    </header>
    <section class="spyp-player">
      <v-player :spypEpisodesList="spypEpisodesList"></v-player>
    </section>
    <section class="spyp-intro">
      <div class="spyp-album">
        <img :src="spypInfoList.logo" alt="">
        <span class="spyp-album-name">{{ spypInfoList.name }}</span>
        <span class="spyp-album-coll">12.5万人已收藏</span>
      </div>
      <div class="spyp-anchor">
        <span class="spyp-anchor-title">主播</span>
        <div class="spyp-anchor-head">
          <img :src="anchorInfo.anchorAvatar" />
          <div class="spyp-anchor-content">
            <p class="spyp-anchor-name">
              <span>{{ anchorInfo.anchorName }}</span>
              <img src="../../spypIcon/anchor-icon.png" />
            </p>
            <p class="spyp-anchor-coll">{{ anchorInfo.fansNum }}人关注</p>
          </div>
          <span class="spyp-anchor-follow">关注TA</span>
          <!--<span class="spyp-anchor-follow">取消关注</span>-->
        </div>
        <div class="spyp-anchor-intro">{{ anchorInfo.anchorIntroductions }}</div>
      </div>
    </section>
    <section class="spyp-comment">
      <v-comment></v-comment>
    </section>
  </main>
</template>

<script>
import player from '@/components/spyp/spypPlayer/spypPlayer.vue'
import comment from '@/components/spyp/comment/comment.vue'
export default {
  name: 'spyp-details',
  components: {
    'v-player': player,
    'v-comment': comment
  },
  data () {
    return {
      spypInfoList: [],
      spypEpisodesList: [],
      anchorInfo: {}
    }
  },
  created () {
    this.loadSpypInfo()
    this.loadSpypEpisodes()
  },
  computed: {},
  methods: {
    loadSpypInfo () {
      this.$ajax.spypInfo(203).then(res => {
        this.spypInfoList = res.data.detail
        this.loadSpypAnchor(res.data.detail.anchor_id)
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadSpypAnchor (id) {
      this.$ajax.spypAnchor(id).then(res => {
        this.anchorInfo = res.data
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadSpypEpisodes () {
      this.$ajax.spypEpisodes(203).then(res => {
        this.spypEpisodesList = res.data
        this.playList = this.spypEpisodesList.pageInfo.list
      }, err => {
        this.Toast.fail({title: err})
      })
    },
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
