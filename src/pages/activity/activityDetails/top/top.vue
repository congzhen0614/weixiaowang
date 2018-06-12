<template>
  <div class="activity-details-top">
    <header>
      <div class="head-icon" @click.stop="clickMore('更多')">
        <img src="./more-icon.png"/>
      </div>
      <div class="head-icon" @click.stop="clickShare('分享')">
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
  props: {
    listData: {
      type: Object
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    clickCollec () {
      let param = {
        sid: this.listData.sid,
        uid: localStorage.getItem('userId'),
        cls: 14
      }
      this.$ajax.addCollect(param).then(res => {
        if (res.data.result.status==='0') {
          this.collected = true
        }
      }, err => {
        console.log(err)
      })
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
