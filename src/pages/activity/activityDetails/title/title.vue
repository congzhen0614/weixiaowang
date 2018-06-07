<template>
  <div class="activity-details-title">
    <div class="title">
      <h2><span class="hot-icon" v-if="listData.ishot===1"></span>{{ listData.title }}</h2>
    </div>
    <div class="describe">
      <div class="describe-top">
        <div class="star-icon">
          <img :src="item" v-for="(item, index) in yellowSatr" :key="index"/>
          <img :src="item" v-for="(item, index) in graySatr" :key="index"/>
        </div>
        <div class="location">
          <p><span class="location-icon"></span>{{ listData.distance }}公里</p>
        </div>
      </div>
      <div class="describe-con">
        <p>{{ listData.content }}</p>
      </div>
    </div>
    <div class="describe-price">
      <div class="describe-price-right">
        <span class="ticket" v-if="listData.ticket===1">票</span>
        <span class="tour" v-if="listData.isgroup===1">跟团</span>
        <span class="reduce" v-if="listData.ticket===3">立减5元</span>
      </div>
      <p v-if="listData.cashdown">￥<span class="bigger">{{ listData.cashdown | getInteger }}</span>{{ listData.cashdown | getFixed1 }}</p>
      <p v-if="!listData.cashdown"><span class="bigger">免费</span></p>
    </div>
    <div class="apply-cut-off">
      <p class="cut-time">
        <span>{{ deadlineMonth }}</span>月
        <span>{{ deadlineDate }}</span>日
        <span>{{ deadlineHour }}</span>时
        <span>{{ deadlineMinute }}</span>分
        <span>{{ deadlineSecond }}</span>秒
      </p>
      <p><span class="cut-icon"></span>离报名截止还有</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        starCount: 0,
        yellowSatr: [],
        graySatr: [],
        deadlineMonth: '00',
        deadlineDate: '00',
        deadlineHour: '00',
        deadlineMinute: '00',
        deadlineSecond: '00'
      }
  },
  props: {
    listData: {
      type: Object
    }
  },
  created () {
  },
  mounted () {},
  computed: {},
  methods: {},
  watch: {
    'listData.star_count' (val) {
      for (var i = 0; i < val; i++) {
        this.yellowSatr.push(require('./checked-icon.png'))
      }
      for (var i = 0; i < 5 - val; i++) {
        this.graySatr.push(require('./notchecked-icon.png'))
      }
    },
    'listData.join_end_time' (val) {
      setInterval(() => {
        this.deadline = new Date(val).getTime() - new Date().getTime()
        this.deadlineMonth = new Date(this.deadline).getMonth()
        this.deadlineDate = new Date(this.deadline).getDate()
        this.deadlineHour = new Date(this.deadline).getHours()
        this.deadlineMinute = new Date(this.deadline).getMinutes()
        this.deadlineSecond = new Date(this.deadline).getSeconds()
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './title.styl'
</style>
