<template>
  <div class="activity-comment-detail">
    <header>
      <img src="../../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <span class="more-icon" @click.stop="clickShowMore()"></span>
      <p>详情</p>
    </header>
    <section>
      <div class="comment-content">
        <div class="comment-title">
          <div class="zan" @click.stop="clickZan(comment)">
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
          <img v-if="comment.img_quantity>0" v-for="img in comment.images" :src="img"/>
          <div class="comment-icons">
            <p><span class="location-icon"></span>2公里</p>
            <p><span class="time-icon"></span>1小时前</p>
          </div>
        </div>
        <div class="zan-list">
          <p>
            <span class="link-icon"></span>
            {{ zanQuantity }}人赞过
          </p>
          <ul>
            <li v-for="(item, index) in zanList">
              <img :src="item.avatar"/>
            </li>
          </ul>
        </div>
        <div class="comment-list">
          <ul>
            <li v-for="(item, index) in commentList" :key="index">
              <div class="user-message">
                <img :src="item.avatar"/>
                <p>{{ item.name }}</p>
              </div>
              <div class="user-comment">
                <p>{{ item.content }}</p>
                <img v-if="item.img_quantity>0" v-for="img in item.images" :src="img"/>
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
                  <div class="button-icon" v-if="uid==item.uid" @click.stop="clickDelete(item)">
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
    <div class="more-list" v-if="moreFlag">
      <section class="mask" @click.stop="clickCloseMore()"></section>
      <ul>
        <li @click.stop="clickShield()">屏蔽该评论</li>
        <li @click.stop="clickReport()">举报</li>
        <li @click.stop="clickFollow()">关注</li>
        <li @click.stop="clickCloseMore()">取消</li>
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
      comment: {},
      commentList: [],
      uid: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
      moreFlag: false,
      zanList: [],
      zanQuantity: 0
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
        toid: this.comment.id,
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
        this.commentList.forEach((item, index) => {
          this.commentList[index].images = item.imgs.split(',')
        })
      }, err => {
        console.log(err)
      })
    },
    loadZanList () {
      this.$ajax.zanList(this.zanParams).then(res => {
        this.zanList = res.data.data.listUser
        this.zanQuantity = this.zanList.length
      }, err => {
        console.log(err)
      })
    },
    getComment () {
      this.comment = JSON.parse(this.$route.query.comment)
    },
    goBack () {
      this.$router.goBack()
    },
    clickComment () {
      this.$router.push({
        path: '/activityComment',
        query: {
          cls: 14,
          sid: this.comment.sid,
          areaId: this.$route.query.areaId,
          tocontent: this.comment.content,
          toid: this.comment.id,
          touid: this.comment.uid
        }
      })
    },
    clickZan (item) {
      let param = {
        cls : item.cls,
        _uid: localStorage.getItem('userId'),
        event_id: item.sid,
        comment_id : item.id
      }
      this.$ajax.zan(param).then(res => {
        if (res.data.result.status==='0') {
          if (item.is_zan === 0) {
            item.is_zan = 1
            item.zan_quantity += 1
          } else {
            item.is_zan = 0
            item.zan_quantity -= 1
          }
          this.loadZanList()
        }
      }, err => {
        console.log(err)
      })
    },
    clickShowMore () {
      this.moreFlag = true
    },
    clickCloseMore () {
      this.moreFlag = false
    },
    clickShield () {
      this.moreFlag = false
      this.Toast.warning({
        title: '暂未开放，敬请期待。'
      })
    },
    clickReport () {
      let params = {
        sid: this.comment.sid,
        _uid: localStorage.getItem('userId')
      }
      this.$ajax.report(params).then(res => {
        if (res.data.msg==='success') {
          this.moreFlag = false
          this.Toast.success({
            title: '举报成功'
          })
        }
      }, err => {
        console.log(err)
      })
    },
    clickFollow () {
      let params = {
        _uid: localStorage.getItem('userId'),
        business_id: this.$route.query.businessid
      }
      this.$ajax.focusBusiness(params).then(res => {
        if (res.data.msg==='success') {
          this.moreFlag = false
          this.Toast.success({
            title: '关注成功'
          })
        }
      }, err => {
        console.log(err)
      })
    },
    clickDelete (item) {
      let params = {
        id: item.id,
        cls: item.cls,
        toid: 0
      }
      this.$ajax.commentDel(params).then(res => {
        if (res.data.result.status==='0') {
          this.commentList = []
          this.loadCommentList()
        }
      }, err => {
        console.log(err)
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'commentDetail.styl'
</style>
