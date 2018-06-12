<template>
  <div class="activity-applyed-quantity">
    <header>
      <img src="../../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>请填写报名信息</p>
    </header>
    <section>
      <ul>
        <li class="apply-list" v-for="(item, index) in userList" :key="index">
          <div class="user-img">
            <img :src="item.avatar"/>
          </div>
          <div class="user-name">
            <p>{{ item.name }}</p>
          </div>
          <div class="user-time">
            <p>{{ item.updated_at | joinTime }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        userList: []
      }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  filters: {
    joinTime (val) {
      let joinDate = new Date(val).getTime()
      let todatDate = new Date().getTime()
      let oneDate = 24 * 60 * 60 * 1000
      let dateNumber = joinDate - todatDate
      if (dateNumber <= oneDate * 1) {
        return '今天'
      } else if (dateNumber > oneDate * 1 && dateNumber <= oneDate * 2) {
        return '昨天'
      } else if (dateNumber > oneDate * 3 && dateNumber <= oneDate * 7) {
        return '3天前'
      } else if (dateNumber > oneDate * 7 && dateNumber <= oneDate * 14) {
        return '1周前'
      } else if (dateNumber > oneDate * 14 && dateNumber <= oneDate * 21) {
        return '2周前'
      } else if (dateNumber > oneDate * 28 && dateNumber <= oneDate * 56) {
        return '1个月前'
      } else if (dateNumber > oneDate * 56) {
        return joinDate.getFullYear() + '年' + (joinDate.getMonth() + 1) + '月' + joinDate.getDate() + '日'
      }
    }
  },
  computed: {
    params () {
      return {
        sid: this.$route.query.sid,
        cls: this.$route.query.cls
      }
    }
  },
  methods: {
    loadData () {
      this.$ajax.listApplyUser(this.params).then(res => {
        this.userList = res.data.data.users
      }, err => {
        console.log(err)
      })
    },
    goBack () {
      this.$router.goBack()
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './applyedQuantity.styl'
</style>
