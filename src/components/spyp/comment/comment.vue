 <template>
  <div class="comment" v-if="commentList.length > 0">
    <span class="comment-title">最新评论 ({{ commentTotal }})</span>
    <ul>
      <li v-for="item in commentList" :key="item.id">
        <div class="comment-head-portrait">
          <img :src="item.avatar" alt="">
        </div>
        <div class="comment-content">
          <div class="comment-content-top">
            <span class="comment-content-title">{{ item.nick_name }}</span>
            <div class="comment-content-zan" @click="onZan(item)">
              <img src="./commentIcon/zaned-icon.png" v-if="item.is_zan === 1" />
              <img src="./commentIcon/zan-icon.png" v-if="item.is_zan === 0" />
              <span>{{ item.zan_quantity }}</span>
            </div>
          </div>
          <div class="comment-content-middle">
            <p>{{ item.content }}</p>
            <div class="comment-content-images">
              <img v-for="img in item.imgs" :src="img" />
            </div>
          </div>
          <div class="comment-content-bottom">
            <div class="comment-content-icon">
              <img class="place-icon" src="./commentIcon/place-icon.png" />
              <span>{{ item.area }}</span>
            </div>
            <div class="comment-content-icon">
              <img src="./commentIcon/time-icon.png" />
              <span>{{ item.created_at | timeInterval }}</span>
            </div>
            <div class="comment-content-icon" v-if="false">
              <img src="./commentIcon/review-icon.png" />
              <span>{{ item.comment_quantity }}</span>
            </div>
            <div class="comment-content-icon" @click="onDelete(item)" v-if="userId === item.uid">
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
  props: ['cls', 'eventId'],
  data () {
    return {
      commentList: [],
      commentTotal: 0,
      userId: localStorage.getItem('userId')
    }
  },
  created () {
    this.loadCommentList()
  },
  methods: {
    loadCommentList () {
      this.$ajax.listComment({cls: this.cls, sid: this.eventId}).then(res => {
        this.commentList = res.data.pageInfo.list
        this.commentTotal = res.data.pageInfo.total
      }, err => {
        console.log(err)
      })
    },
    onDelete (item) {
      this.Dialog.alert({
        title: '温馨提示',
        msg: '小主，确定要取消付款吗',
        buttons: ['我确定', '再想想']
      }, res => {
        if (res.buttonIndex === 1) {
          this.$ajax.commentDel({
            id: item.id,
            cls: item.cls,
            toid: 0
          }).then(res => {
            if (res.data.result.status === '0') {
              this.commentList = []
              this.loadCommentList()
            }
          }, err => {
            console.log(err)
          })
        }
      })
    },
    onZan (item) {
      this.$ajax.zan({
        cls : item.cls,
        _uid: localStorage.getItem('userId'),
        event_id: item.sid,
        comment_id : item.id
      }).then(res => {
        if (res.data.result.status === '0') {
          this.loadCommentList()
        }
      }, err => {
        console.log(err)
      })
    },
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './comment.styl'
</style>
