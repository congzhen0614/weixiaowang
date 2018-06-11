<template>
  <div class="activity-fill-userinfo">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>请填写报名信息</p>
    </header>
    <section>
      <div class="user-message">
        <p class="order-username">
          <span>联系人</span>
          <input type="text" placeholder="请在此输入联系人名称" v-model="orderUserName"/>
        </p>
        <p class="order-userphone">
          <span>手机</span>
          <input type="number" placeholder="请在此输入联系人电话" pattern="[0-9]*" v-model="orderuserPhone"/>
        </p>
      </div>
    </section>
    <footer>
      <div @click.stop="confirmOrder()">下一步</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        orderUserName: '',
        orderuserPhone: '',
        tickets: []
      }
  },
  created () {
  },
  mounted () {
    console.log(this.$route.query)
  },
  computed: {
    params () {
      return {
      }
    }
  },
  methods: {
    goBack () {
      this.$router.goBack()
    },
    confirmOrder () {
      if (!this.orderUserName) {
        this.Dialog.alert({
          msg: '亲，您还没有填写联系人',
          buttons: ['知道了']
        })
        return false
      } else if (!this.orderuserPhone) {
        this.Dialog.alert({
          msg: '亲，您还没有填写手机号',
          buttons: ['知道了']
        })
        return false
      }
      this.$router.push({
        path: '/activityOrder',
        query: {
          activityId: this.$route.query.sid,
          logo: this.$route.query.logo,
          title: this.$route.query.title,
          beginTime: this.$route.query.beginTime,
          cashdown: this.$route.query.cashdown,
          ticket: this.$route.query.ticket,
          isgroup: this.$route.query.isgroup,
          name: this.orderUserName,
          mobile: this.orderuserPhone,
          tickets: this.$route.query.tickets,
          isRealName: this.$route.query.isRealName
        }
      })
//      if (this.$route.query.isRealName==='0') {
//        console.log('不需要实名验证')
//      } else {
//        this.$router.push({
//          path: '/realName',
//          query: {
//            activityId: this.$route.query.sid,
//            name: this.orderUserName,
//            mobile: this.orderuserPhone,
//            tickets: this.$route.query.tickets
//          }
//        })
//      }
    }
  },
  watch: {
    orderUserName (val) {
      if (val.length >= 4) {
        this.orderUserName = val.slice(0, 4)
      }
    },
    orderuserPhone (val) {
      if (val.length >= 11) {
        this.orderuserPhone = val.slice(0, 11)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './userinfo.styl'
</style>
