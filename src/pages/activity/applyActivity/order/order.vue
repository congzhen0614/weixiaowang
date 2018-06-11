<template>
  <div class="activity-order">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>订单结算</p>
    </header>
    <section>
      <div class="activity-info">
        <div class="activity-msg">
          <p class="activity-title">{{ title }}</p>
          <p class="activity-time">{{ beginTime | activityDate }}开始</p>
          <p class="activity-fee" v-if="cashdown">￥<span>{{ cashdown | getInteger }}</span>{{ cashdown | getFixed1 }}</p>
          <p class="activity-fee" v-if="!cashdown"><span>免费</span></p>
          <p class="sale-type">
            <span class="ticket" v-if="ticket==1">票</span>
            <span class="group" v-if="isgroup==1">跟团</span>
          </p>
        </div>
        <div class="activity-img">
          <img :src="logo"/>
        </div>
      </div>
      <div class="ticket-info">
        <div class="info-left">
          <img class="info-icon" src="./ticket-icon.png"/>
        </div>
        <div class="info-right">
          <ul>
            <li class="ticket-title">报名票名称</li>
            <li v-for="(item, index) in ticketList"><p>{{ item.title }}</p><span>X{{ item.checkedNum }}</span></li>
          </ul>
        </div>
      </div>
      <div class="ticket-info">
        <div class="info-left">
          <img class="info-icon" src="./reduce-icon.png"/>
        </div>
        <div class="info-right">
          <ul>
            <li class="ticket-title">立减5元<span class="price">-￥<span>100</span>.00</span></li>
          </ul>
        </div>
      </div>
      <div class="ticket-info">
        <div class="info-left">
          <img class="info-icon" src="./coupon-icon.png"/>
        </div>
        <div class="info-right">
          <ul>
            <li class="ticket-title">优惠券</li>
            <li class="ticket-coupon">
              <!--<p>2张优惠券可使用</p>-->
              <p>没有可用优惠券</p>
              <img src="./right_arrow.png"/>
              <span>未使用</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail-fee">
        <ul>
          <li>商品金额<p>￥<span>{{ cashdown | getInteger }}</span>{{ cashdown | getFixed1 }}</p></li>
          <!--<li>立减<p>-￥<span>500</span>.00</p></li>-->
          <!--<li>满减券<p>-￥<span>500</span>.00</p></li>-->
          <!--<li>折扣券<p>-￥<span>500</span>.00</p></li>-->
          <!--<li>代金券<p>-￥<span>500</span>.00</p></li>-->
        </ul>
      </div>
    </section>
    <footer>
      <div class="footer">
        <div class="submit-order" @click.stop="submitOrder()">提交订单</div>
        <div class="total-fee">
          <p>实付款
            <span>￥<span class="big">{{ cashdown | getInteger }}</span>{{ cashdown | getFixed1 }}</span>
          </p>
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
        logo: '',
        title: '',
        beginTime: '',
        cashdown: '',
        ticket: '',
        isgroup: '',
        ticketList: []

      }
  },
  created () {
  },
  mounted () {
    this.getActivity()
  },
  computed: {
    params () {
      return {
        uid: localStorage.getItem('userId'),
        activityId: this.$route.query.activityId,
        name: this.$route.query.name,
        mobile: this.$route.query.mobile,
        payChannel: 0,
        couponUserId: '', // 优惠券Id
        tickets: []
      }
    }
  },
  methods: {
    getActivity () {
      this.logo = this.$route.query.logo
      this.title = this.cutString(this.$route.query.title)
      this.beginTime = this.$route.query.beginTime
      this.cashdown = parseFloat(this.$route.query.cashdown)
      this.ticket = this.$route.query.ticket
      this.isgroup = this.$route.query.isgroup
      this.ticketList = JSON.parse(this.$route.query.tickets)
      this.ticketList.forEach(item => {
        this.params.tickets.push({
          item_id: item.id,
          quantity: item.checkedNum
        })
      })
    },
    cutString (str) {
      if (str.length > 20) {
        return str.substring(0, 20) + '...'
      } else {
        return str
      }
    },
    goBack () {
      this.$router.goBack()
    },
    submitOrder () {
      this.$ajax.confirmOrder(this.params).then(res => {
        if (res.data.result.status==='0') {
          this.Toast.success({
            title: '下单成功'
          })
          setTimeout(()=>{}, 1000)
          if (parseFloat(this.$route.query.isRealName)) {
            this.$router.push({
              path: '/realName',
              query: {
                activityId: this.$route.query.sid,
                name: this.orderUserName,
                mobile: this.orderuserPhone,
                tickets: this.$route.query.tickets,
                id: res.data.id
              }
            })
          }
        } else {
          this.Toast.warning({
            title: res.data.result.msg
          })
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
    @import './order.styl'
</style>
