<template>
  <div class="activity-details-comment">
    <div class="title">
      <p>最新评论({{ listData.comment_quantity }})</p>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in listDatas" :key="index">
          <div class="user-message">
            <div class="right-icon"><img class="zan-icon" src="./zan-icon.png"/>100</div>
            <img src="./avatar.jpg"/>
            <p>谁家陌上青年郎</p>
          </div>
          <div class="user-comment">
            <p>静看庭前花开花落，意随天外云卷云舒。</p>
            <img src="./avatar.jpg"/>
            <img src="./avatar.jpg"/>
            <div>
              <div class="button-icon">
                <span class="location-icon"></span>2公里
              </div>
              <div class="button-icon">
                <span class="time-icon"></span>1小时前
              </div>
              <div class="button-icon">
                <span class="comment-icon"></span>100
              </div>
              <div class="button-icon">
                <span class="delete-icon"></span>删除
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        listDatas: [0, 1, 2, 3, 4]
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
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './comment.styl'
</style>
