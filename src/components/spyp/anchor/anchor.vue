<template>
  <div class="spyp-anchor">
    <span class="spyp-anchor-title">主播</span>
    <div class="spyp-anchor-head">
      <img :src="anchorInfo.anchorAvatar" />
      <div class="spyp-anchor-content">
        <p class="spyp-anchor-name">
          <span>{{ anchorInfo.anchorName }}</span>
          <img src="./anchorIcon/anchor-icon.png" />
        </p>
        <p class="spyp-anchor-coll">{{ anchorInfo.fansNum }}人关注</p>
      </div>
      <span class="spyp-anchor-follow" v-if="anchorInfo.focused === 0" @click="spypAnchorFocus">关注TA</span>
      <span class="spyp-anchor-follow" v-if="anchorInfo.focused === 1" @click="spypAnchorFocus">取消关注</span>
    </div>
    <div class="spyp-anchor-intro">{{ anchorInfo.anchorIntroductions || '暂无简介' }}</div>
  </div>
</template>

<script>
export default {
  name: 'spyp-anchor',
  components: {},
  props: ['anchorId'],
  data () {
    return {
      anchorInfo: {}
    }
  },
  created () {
    this.loadSpypAnchor()
  },
  mounted () {
  },
  computed: {},
  methods: {
    loadSpypAnchor () {
      this.$ajax.spypAnchor(this.anchorId).then(res => {
        this.anchorInfo = res.data
      }, err => {
        this.Toast.fail({title: err})
      })
    },
    spypAnchorFocus () {
      this.$ajax.spypAnchorFocus({
        uid: localStorage.getItem('userId'),
        anchorId: this.anchorId
      }).then(res => {
        if (res.data.result.status === '0') {
          this.loadSpypAnchor()
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './anchor.styl'
</style>
