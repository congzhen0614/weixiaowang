 <template>
  <div class="comment">
    <span class="comment-title">最新评论 (10)</span>
    <ul>
      <li v-for="item in commentList" :key="item">
        <div class="comment-head-portrait">
          <img src="../../../assets/avatar.jpg" alt="">
        </div>
        <div class="comment-content">
          <div class="comment-content-top">
            <span class="comment-content-title">谁家陌上青年郎</span>
            <div class="comment-content-zan">
              <!--<img src="./commentIcon/zaned-icon.png" />-->
              <img src="./commentIcon/zan-icon.png" />
              <span>100</span>
            </div>
          </div>
          <div class="comment-content-middle">
            <p>落霞与孤鹜齐飞，秋水共长天一色。</p>
            <div class="comment-content-images">
              <img src="../../../assets/avatar.jpg" />
            </div>
          </div>
          <div class="comment-content-bottom">
            <div class="comment-content-icon">
              <img class="place-icon" src="./commentIcon/place-icon.png" />
              <span>2公里</span>
            </div>
            <div class="comment-content-icon">
              <img src="./commentIcon/time-icon.png" />
              <span>1小时前</span>
            </div>
            <div class="comment-content-icon">
              <img src="./commentIcon/review-icon.png" />
              <span>100</span>
            </div>
            <div class="comment-content-icon">
              <img src="./commentIcon/delete-icon.png" />
              <span>删除</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      commentList: [1, 2, 3, 4, 5, 6, 7, 8]
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
