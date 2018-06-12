<template>
  <div class="activity-details-top">
    <header>
      <div class="head-icon" @click.stop="clickMore('更多')">
        <img src="./more-icon.png"/>
      </div>
      <div class="head-icon" @click.stop="clickShare('分享')">
        <img src="./share-icon.png"/>
      </div>
      <div class="head-icon" @click.stop="clickCollec('收藏')">
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
    clickCollec (item) {
      this.$emit('clickType', item)
    },
    clickShare (item) {
      this.$emit('clickType', item)
    },
    clickMore (item) {
      this.$emit('clickType', item)
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
