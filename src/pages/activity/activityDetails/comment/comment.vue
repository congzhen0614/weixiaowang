<template>
  <div class="activity-details-comment">
    <div class="title">
      <p>最新评论({{ commentQuantity }})</p>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in commentList" :key="index" @click.stop="clickTocommentList()">
          <div class="user-message">
            <div class="right-icon" @click.stop="clickZan(item)">
              <img class="zan-icon" src="./zan-icon.png" v-if="item.is_zan===0"/>
              <img class="zan-icon" src="./zaned-icon.png" v-if="item.is_zan===1"/>
              {{ item.zan_quantity }}
            </div>
            <img :src="item.avatar"/>
            <p>{{ item.name }}</p>
          </div>
          <div class="user-comment">
            <p>{{ item.content }}</p>
            <img :src="item.imgs"/>
            <div>
              <div class="button-icon">
                <span class="location-icon"></span>{{ item.area }}
              </div>
              <div class="button-icon">
                <span class="time-icon"></span>{{ item.created_at | createdTime }} 小时前
              </div>
              <div class="button-icon" @click.stop="clickComment(item)">
                <span class="comment-icon"></span>{{ item.comment_quantity }}
              </div>
              <div class="button-icon" v-if="uid==item.uid">
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
        uid: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
        sid: 0,
        cls: 0,
        commentList: [],
        commentQuantity: 0,
      }
  },
  props: {
    listData: {
      type: Object
    },
    scrollHeight: {
      type: Number
    },
    contentHeight: {
      type: Number
    }
  },
  created () {
  },
  mounted () {
  },
  filters: {
    createdTime (val) {
      let createdDate = new Date(val).getTime()
      let todayDate = new Date().getTime()
      let data = (todayDate - createdDate)/(1000 * 60 * 60)
      return parseInt(data)
    }
  },
  computed: {
    params () {
      return {
        cls: this.cls,
        uid: localStorage.getItem('userId'),
        sid: this.sid
      }
    }
  },
  methods: {
    loadCommentList () {
      this.$ajax.commentList(this.params).then(res => {
        this.commentQuantity = res.data.pageInfo.list.length
        this.commentList = res.data.pageInfo.list
      }, err => {
        console.log(err)
      })
    },
    clickComment (item) {
      // this.$emit('comment', item)
    },
    clickZan (item) {
      let param = {
        cls : item.cls,
        _uid: localStorage.getItem('userId'),
        event_id: item.sid,
        comment_id : item.id
      }
      this.$ajax.zan(param).then(res => {
        if (res.data.result.status==0) {
          this.reload()
        }
      }, err => {
        console.log(err)
      })
    },
    reload () {
      this.commentList = []
      this.loadCommentList()
    },
    clickTocommentList () {
      this.$router.push({
        path: '/commentList',
        query: {
          params: JSON.stringify(this.params),
          areaId: this.listData.area_id,
          sid: this.listData.sid,
          businessid: this.listData.businessid
        }
      })
    }
  },
  watch: {
    scrollHeight (val) {},
    listData (val) {
      this.sid = val.sid
      this.cls = val.cls
      this.loadCommentList()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './comment.styl'
</style>
