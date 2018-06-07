<template>
  <div class="activity-details-footer">
    <footer>
      <div class="footer" v-if="commentFlag">
        <span class="sign-up">我要报名</span>
        <div class="footer-left">
          <div class="consulting" @click.stop="callUp()">
            <img src="./consulting-icon.png"/>
            <p>咨询</p>
          </div>
          <div class="comment" @click.stop="commentFlag = false">
            <img src="./comment-icon.png"/>
            <p>评论</p>
          </div>
        </div>
      </div>
      <div class="add-comment" v-if="!commentFlag">
        <div class="comment-input" @click.stop="clickAddComment()">
          <span>发表评论...</span>
          <img src="./add-comment-icon.png"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        commentFlag: true,
        tel: ''
      }
  },
  props: {
    listData: {
      type: Object
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    clickAddComment () {
      this.$router.push({
        path: '/activityComment',
        query: {
          cls: this.listData.cls,
          sid: this.listData.sid,
          areaId: this.listData.area_id
        }
      })
    },
    callUp () {
      window.location.href = 'tel:' + this.listData.tel
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './footer.styl'
</style>
