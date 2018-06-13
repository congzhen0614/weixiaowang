<template>
  <div class="activity-comment-list">
    <header>
      <img src="../../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>全部评论</p>
    </header>
    <section>
      <div class="content">
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
  filters: {
    createdTime (val) {
      let createdDate = new Date(val).getTime()
      let todayDate = new Date().getTime()
      let data = (todayDate - createdDate)/(1000 * 60 * 60)
      return parseInt(data)
    }
  },
  data () {
      return {
        uid: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
        commentList: [],
        params: {}
      }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  computed: {},
  methods: {
    goBack () {
      this.$router.goBack()
    },
    loadData () {
      this.params = JSON.parse(this.$route.query.params)
      this.$ajax.commentList(this.params).then(res => {
        this.commentList = res.data.pageInfo.list
      }, err => {
        console.log(err)
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
        if (res.data.result.status==0) {
          this.reload()
        }
      }, err => {
        console.log(err)
      })
    },
    reload () {
      this.commentList = []
      this.loadData()
    },
    clickTocommentDetail (item) {
      console.log(item)
    },
    clickComment (item) {
      this.$router.push({
        path: '/activityComment',
        query: {
          cls: 14,
          sid: this.$route.query.sid,
          areaId: this.$route.query.areaId,
          tocontent: item !== undefined ? item.content : '',
          toid: item !== undefined ? item.id : '',
          touid: item !== undefined ? item.uid : ''
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './commentList.styl'
</style>
