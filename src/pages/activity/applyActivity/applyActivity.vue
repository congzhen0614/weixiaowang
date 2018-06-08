<template>
  <div class="apply-activity">
    <header>
      <img src="../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>请选择票</p>
    </header>
    <section>
      <ul>
        <li v-for="(item, index) in ticketList" :key="index">
          <div class="ticket-left">
            <span class="radius-top"></span>
            <span class="radius-bottom"></span>
            <div class="ticket-top">
              <p class="ticket-title">
                {{ item.title }}
                <span class="ticket-title-icon" v-if="item.is_group==='1'"></span>
              </p>
            </div>
            <div class="ticket-bottom">
              <p>{{ item.readme }}</p>
              <div class="ticket-price-number">
                <p class="ticket-number">剩余<span>{{ item.ticket_quantity - item.ticket_sells }}</span>张</p>
                <p class="ticket-price">￥<span>{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-increase" @click.stop="clickIncrease(index)">
              <img src="./increase-icon.png"/>
            </div>
            <div class="ticket-quantity">{{ item.checkedNum }}</div>
            <div class="ticket-reduce" @click.stop="clickReduce(index)">
              <img src="./reduce-icon.png"/>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <div class="agreement">
        <img v-if="!checked" @click.stop="checked=!checked" src="./check.png"/>
        <img v-if="checked" @click.stop="checked=!checked" src="./check_active.png"/>
        <p>我同意<span @click.stop="clickCheck()">《微校网订购协议》</span></p>
      </div>
      <div class="footer">
        <div class="Total">合计￥<span>{{ Total | getInteger }}</span>{{ Total | getFixed1 }}</div>
        <div class="next" @click.stop="clickNextStep()">下一步</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
      return {
        number: 0,
        checked: false,
        ticketList: [],
        Total: 0
      }
  },
  created () {
  },
  mounted () {
    this.loadActivityTicket()
  },
  computed: {
    params () {
      return {
        sid: this.$route.query.sid
      }
    },
    checkedTicket () {
      let checkedTicket = []
      this.ticketList.forEach(item => {
        if (item.checkedNum > 0) {
          checkedTicket.push(item)
        }
      })
      return checkedTicket
    }
  },
  methods: {
    loadActivityTicket () {
      this.$ajax.listActivityTicket(this.params).then(res => {
        let that = this
        res.data.data.list.forEach(item => {
          item.checkedNum = 0
          that.ticketList.push(item)
        })
      }, err => {
        console.log(err)
      })
    },
    goBack () {
      this.$router.goBack()
    },
    clickIncrease (index) {
      this.ticketList[index].checkedNum += 1
      this.Total += parseFloat(this.ticketList[index].fee)
    },
    clickReduce (index) {
      if (this.ticketList[index].checkedNum===0) {
        return false
      } else {
        this.ticketList[index].checkedNum -= 1
        this.Total -= parseFloat(this.ticketList[index].fee)
      }
    },
    clickCheck () {
      console.log('查看协议')
    },
    Judge () {
      let checkedNum = 0
      this.ticketList.forEach(item => {
        checkedNum += item.checkedNum
      })
      if (!this.checked) {
        this.Dialog.alert({
          msg: '您当前未确认已阅读并同意《微校网订购协议》',
          buttons: ['知道了']
        })
        return false
      } else if (checkedNum===0) {
        this.Dialog.alert({
          msg: '亲，最少选择一张票哦',
          buttons: ['知道了']
        })
        return false
      }
      return true
    },
    clickNextStep () {
      if (!this.Judge()) return false
      this.$router.push({
        path: '/userinfo',
        query: {
          sid: this.$route.query.sid,
          tickets: JSON.stringify(this.checkedTicket),
          isRealName: this.$route.query.isRealName
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './applyActivity.styl'
</style>
