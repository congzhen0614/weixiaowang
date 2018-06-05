<template>
  <div class="activity-details-message">
    <ul class="message-list">
      <li>
        <img src="./source-icon.png"/>
        <span>亲子活动 | 西湖区 | 3~6岁</span>
        <p>来源</p>
      </li>
      <li>
        <img src="./data-icon.png"/>
        <span>2017年10月1日至2018年2月1日</span>
        <p>活动日期</p>
      </li>
      <li class="have-link">
        <img src="./ticket-price-icon.png"/>
        <span>¥1000</span>
        <p>票价</p>
      </li>
      <li class="have-link">
        <img src="./people-number-icon.png"/>
        <span>已报名15人/限30人报名</span>
        <p>报名人数</p>
      </li>
      <li class="have-link">
        <img src="./location-icon.png"/>
        <p>浙江省杭州市下城区文晖路西湖文化广场地铁站口右拐杭州出版社</p>
      </li>
    </ul>
    <div class="interval"></div>
    <ul class="message-sponsor">
      <li>
        <span class="attention">关注</span>
        <img src="./organizer-icon.png"/>
        <div>
          <span class="organizer">主办方</span>
          <p>杭州微校互联科技有限公</p>
        </div>
      </li>
      <li>
        <span class="attentioned">已关注</span>
        <img src="./co-organizer-icon.png"/>
        <div>
          <span class="co-organizer">协办方</span>
          <p>杭州微校互联科技有限公司华北地区分公司</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './message.styl'
</style>
