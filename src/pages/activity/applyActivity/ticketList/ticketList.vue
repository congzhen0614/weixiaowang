<template>
  <div class="activity-ticket-list">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
      <p>票价</p>
    </header>
    <section>
      <div class="ticket-list" v-for="(item, index) in ticketList" :key="index">
        <div class="ticket-top">
          <p class="ticket-title">{{ item.title }}</p>
          <p class="ticket-content">{{ item.readme }}</p>
          <div class="ticket-total">
            <p class="ticket-price"><span>{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }} 元</p>
            <p class="ticket-number">剩余{{ item.ticket_quantity - item.ticket_sells }}</p>
          </div>
        </div>
        <div class="ticket-bottom">使用期限: {{ item.begin_time | getDate }}~{{ item.end_time | getDate }}</div>
      </div>
    </section>
  </div>
</template>

<script>
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
    this.loadDate()
  },
  computed: {},
  filters: {
    getDate (val) {
      let year = new Date(val).getFullYear()
      let month = new Date(val).getMonth() + 1
      let date = new Date(val).getDate()
      return year + '.' + month + '.' + date
    }
  },
  methods: {
    loadDate () {
      this.ticketList = JSON.parse(this.$route.query.ticketList)
    },
    goBack () {
      this.$router.goBack()
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './ticketList.styl'
</style>
