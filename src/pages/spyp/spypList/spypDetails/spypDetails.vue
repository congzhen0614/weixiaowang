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
      <v-anchor :anchorId="spypInfoList.anchor_id" v-if="spypInfoList.anchor_id"></v-anchor>
    </section>
    <section class="spyp-comment">
      <v-comment :cls="spypInfoList.cls" :eventId="spypInfoList.id" v-if="commentFlag"></v-comment>
    </section>
  </main>
</template>

<script>
import player from '@/components/spyp/spypPlayer/spypPlayer.vue'
import anchor from '@/components/spyp/anchor/anchor.vue'
import comment from '@/components/spyp/comment/comment.vue'
export default {
  name: 'spyp-details',
  components: {
    'v-player': player,
    'v-anchor': anchor,
    'v-comment': comment
  },
  data () {
    return {
      spypInfoList: [],
      spypEpisodesList: [],
      anchorInfo: {},
      commentFlag: false
    }
  },
  created () {
    this.loadSpypInfo()
    this.loadSpypEpisodes()
  },
  computed: {},
  methods: {
    loadSpypInfo () {
      this.$ajax.spypInfo(this.$route.query.id).then(res => {
        this.spypInfoList = res.data.detail
        this.commentFlag = true
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    loadSpypEpisodes () {
      this.$ajax.spypEpisodes(this.$route.query.id).then(res => {
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
