<template>
  <div class="spyp-album">
    <div class="spyp-album-head">
      <div class="spyp-album-detail">
        <div class="spyp-album-detail-left">
          <img :src="spypInfoList.logo" />
        </div>
        <div class="spyp-album-detail-right">
          <p class="spyp-album-detail-title">{{ spypInfoList.name }}</p>
          <div class="spyp-album-detail-source">
            <img :src="spypInfoList.anchorAvatar" />
            <span>{{ spypInfoList.anchorName }}</span>
          </div>
          <div class="spyp-album-detail-number">
            <div>
              <img src="../spypIcon/play-icon.png" />
              <span>{{ spypInfoList.playnum }}</span>
            </div>
            <div>
              <img src="../spypIcon/list-icon.png" />
              <span>{{ spypInfoList.num }}</span>
            </div>
          </div>
          <div class="spyp-album-detail-price">
            <span class="price-free" v-if="spypInfoList.free === 1">免费</span>
            <span class="price-buy" v-if="spypInfoList.free === 0">￥{{ fee | getInteger }}{{ fee | getFixed1 }}购买</span>
            <span class="price-hear" @click="onListeningTest">试听</span>
          </div>
        </div>
      </div>
      <div class="spyp-album-tag">
        <span v-for="item in spypInfoList.tagList">{{ item }}</span>
      </div>
    </div>
    <div class="spyp-album-intro">
      <span class="spyp-album-intro-title">专辑简介</span>
      <p class="spyp-album-intro-content">{{ spypInfoList.introductions }}</p>
    </div>
    <div class="spyp-album-anchor">
      <v-anchor :anchorId="77"></v-anchor>
    </div>
    <div class="spyp-album-comment">
      <v-comment :cls="51" :eventId="415" v-if="commentFlag"></v-comment>
    </div>
  </div>
</template>

<script>
import anchor from '@/components/spyp/anchor/anchor.vue'
import comment from '@/components/spyp/comment/comment.vue'
export default {
  name: 'spyp-list',
  components: {
    'v-anchor': anchor,
    'v-comment': comment
  },
  data () {
    return {
      spypInfoList: {},
      commentFlag: false
    }
  },
  created () {
    this.loadSpypInfo()
  },
  mounted () {
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
    onListeningTest () {
      this.$router.push({
        path: '/spypDetails',
        query: {
          id: this.spypInfoList.id
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './spypAlbum.styl'
</style>
