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
            <span style="margin-right: 0.4rem">总金额1 ￥{{ item.fee * item.checkedNum }}</span>
            <span>票数 {{ item.checkedNum }}</span>
          </div>
        </div>
        <ul class="ticket-list">
          <li @click.stop="personalInformation(i, j)" v-for="j in item.checkedNum">
            <span>票{{ j }}</span>
            <img src="./link-icon.png"/>
            <p>{{ kidList[i].kids[j-1].kidName ? kidList[i].kids[j-1].kidName : '输入报名人信息' }}</p>
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
        ticketList: [],
        kidList: []
      }
  },
  created () {
  },
  mounted () {
    this.setticketList()
    this.getKidList()
    this.loadData()
  },
  computed: {
    params () {
      return {
        uid: localStorage.getItem('userId'),
        cls: 14,
        id: this.$route.query.id
      }
    }
  },
  methods: {
    loadData () {
      this.$ajax.tradeDetail(this.params).then(res => {
        if (res.data.result.status==='-1') {
          this.Toast.warning({
            title: res.data.result.msg
          })
          return false
        }
        edit.tradeId = parseInt(res.data.activeTrainView.trade.id)
        res.data.activeTrainView.tradeDetails.forEach(item => {
          edit.list.forEach(editItem => {
            if (editItem.ticketName === item.applyUserName) {
              editItem.kids.forEach(obj => {
                obj.tradeDetailId = parseInt(item.tradeDetailId)
              })
            }
          })
        })
      }, err => {
        console.log(err)
      })
    },
    setticketList () {
      this.ticketList = JSON.parse(this.$route.query.tickets)
      if (edit.list.length > 0) return false
      this.ticketList.forEach(item => {
        let checkedNum = []
        for (var i = 0; i < item.checkedNum; i++) {
          checkedNum.push({
            kidName: '',
            kidSex: 1,
            kidImageUrl: '',
            parentsName: '',
            parentsPhone: '',
            relation: '',
            tradeDetailId: ''
          })
        }
        edit.list.push({
          is_group: parseInt(item.is_group),
          ticketId: parseInt(item.id),
          ticketName: item.title,
          totalFee: item.fee,
          kids: checkedNum
        })
      })
    },
    getKidList () {
      this.kidList = edit.list
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
    },
    confirmOrder () {
      this.$ajax.realName(edit).then(res => {
        if (res.data.result.status==='0') {
          this.Toast.success({
            title: '添加成功'
          })
          this.$router.push({
            path: './pay',
            query: {
              outtradeno: this.$route.query.outtradeno,
              fee: this.$route.query.fee,
              cls: 14
            }
          })
        } else {
          this.Toast.warning({
            title: res.data.result.msg
          })
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
    @import './realName.styl'
</style>
