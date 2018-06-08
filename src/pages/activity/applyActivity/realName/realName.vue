<template>
  <div class="activity-realname">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>请填写报名信息</p>
    </header>
    <section>
      <div v-for="(item, i) in ticketList" :key="i">
        <div style="height: 0.2rem; background-color: #F3F4F5" v-if="i>0"></div>
        <div class="ticketList">
          <div class="ticket-title">{{ item.title }}<span class="group-icon" v-if="item.is_group==='1'"></span></div>
          <div class="ticket-price">
            <span style="margin-right: 0.4rem">总金额 ￥{{ item.fee * item.checkedNum }}</span>
            <span>票数 {{ item.checkedNum }}</span>
          </div>
        </div>
        <ul class="ticket-list">
          <li @click.stop="personalInformation(i, j)" v-for="j in item.checkedNum">
            <span>票{{ j }}</span>
            <img src="./link-icon.png"/>
            <p>输入报名人信息</p>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div @click.stop="confirmOrder()">下一步</div>
    </footer>
  </div>
</template>

<script>
import edit from '@/store/edit/edit'
export default {
  name: '',
  components: {},
  data () {
      return {
        ticketList: []
      }
  },
  created () {
  },
  mounted () {
    this.setticketList()
    console.log(edit)
  },
  computed: {},
  methods: {
    setticketList () {
      let checkedNum = []
      this.ticketList = JSON.parse(this.$route.query.tickets)
      this.ticketList.forEach(item => {
        for (var i = 0; i < item.checkedNum; i++) {
          checkedNum.push(i)
        }
        edit.list.push({
          is_group: item.is_group,
          ticketId: item.id,
          ticketName: item.title,
          totalFee: item.fee,
          kids: checkedNum
        })
      })
    },
    goBack () {
      this.$router.goBack()
    },
    personalInformation (i, j) {
      this.$router.push({
        path: '/edituserInfo',
        query: {
          i: i,
          j: j
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './realName.styl'
</style>
