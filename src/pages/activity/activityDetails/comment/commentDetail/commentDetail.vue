<template>
  <div class="activity-comment-detail">
    <header>
      <img src="../../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <span class="more-icon"></span>
      <p>详情</p>
    </header>
    <section>
      <div class="comment-content">
        <div class="comment-title">
          <div class="zan">
            <img class="zan-icon" src="./zan-icon.png" v-if="comment.is_zan===0"/>
            <img class="zan-icon" src="./zaned-icon.png" v-if="comment.is_zan===1"/>
            <span class="zan-quantity">{{ comment.zan_quantity }}</span>
          </div>
          <div class="observer">
            <img class="observer-avatar" :src="comment.avatar">
            <p class="observer-name">{{ comment.name }}</p>
          </div>
        </div>
        <div class="comment-detail">
          <p>{{ comment.content }}</p>
          <img :src="comment.imgs"/>
          <div class="comment-icons">
            <p><span class="location-icon"></span>2公里</p>
            <p><span class="time-icon"></span>1小时前</p>
          </div>
        </div>
        <div class="zan-list">
          <p>
            <span class="link-icon"></span>
            100人赞过
          </p>
          <ul>
            <li>
              <img src="../../../../../common/icons/avatar.jpg"/>
            </li>
          </ul>
        </div>
        <div class="comment-list">
          <ul>
            <li v-for="(item, index) in commentList" :key="index" @click.stop="clickTocommentDetail(item)">
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
    </section>
    <footer>
      <div class="add-comment">
        <div class="comment-input" @click.stop="clickComment()">
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
      comment: {},
      commentList: [],
      uid: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0
    }
  },
  created () {
  },
  mounted () {
    this.getComment()
    this.loadZanList()
    this.loadCommentList()
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
    zanParams () {
      return {
        cls: this.comment.cls,
        _uid: localStorage.getItem('userId'),
        toid: this.comment.uid,
        event_id: this.comment.sid,
        page_number: 1
      }
    },
    commentParams () {
      return {
        cls: this.comment.cls,
        uid: localStorage.getItem('userId'),
        sid: this.comment.sid,
        writer: this.comment.uid
      }
    }
  },
  methods: {
    loadCommentList () {
      this.$ajax.commentList(this.commentParams).then(res => {
        this.commentList = res.data.pageInfo.list
      }, err => {
        console.log(err)
      })
    },
    loadZanList () {
      this.$ajax.zanList(this.zanParams).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    },
    getComment () {
      this.comment = JSON.parse(this.$route.query.comment)
      console.log(this.comment)
    },
    goBack () {
      this.$router.goBack()
    },
    clickComment (item) {
      this.$router.push({
        path: '/activityComment',
        query: {
          cls: 14,
          sid: this.$route.query.sid,
          areaId: this.$route.query.areaId,
          tocontent: this.comment.content,
          toid: this.comment.id,
          touid: this.comment.uid
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'commentDetail.styl'
</style>
