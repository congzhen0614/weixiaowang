<template>
  <div class="activity-details-top">
    <header>
      <div class="head-icon" @click.stop="clickMore()">
        <img src="./more-icon.png"/>
      </div>
      <div class="head-icon" @click.stop="clickShare()">
        <img src="./share-icon.png"/>
      </div>
      <div class="head-icon" @click.stop="clickCollec()">
        <img v-if="!collected" src="./collect-icon.png"/>
        <img v-if="collected" src="./collected-icon.png"/>
      </div>
      <div class="back-icon" @click.stop="goback()">
        <img src="../../../../common/icons/back_icon.png"/>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      collected: false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    clickCollec () {
      console.log('收藏')
    },
    clickShare () {
      console.log('分享')
    },
    clickMore () {
      console.log('更多')
    },
    goback () {
      this.$router.goBack()
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './top.styl'
</style>
