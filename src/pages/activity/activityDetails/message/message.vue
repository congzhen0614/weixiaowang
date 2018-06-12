<template>
  <div class="activity-details-message">
    <ul class="message-list">
      <li>
        <img src="./source-icon.png"/>
        <span>{{ listData.type }} | {{ listData.region_id }} | {{ listData.age }}</span>
        <p>来源</p>
      </li>
      <li>
        <img src="./data-icon.png"/>
        <span>{{ listData.begin_time | getDate }}至{{ listData.end_time | getDate }}</span>
        <p>活动日期</p>
      </li>
      <li class="have-link">
        <img src="./ticket-price-icon.png"/>
        <span>￥{{ listData.min_fee }}至￥{{ listData.max_fee }}</span>
        <p>票价</p>
      </li>
      <li class="have-link">
        <img src="./people-number-icon.png"/>
        <span><span class="applyed" @click.stop="checkApplued()">已报名{{ listData.applyed_quantity }}人</span>/限{{ listData.apply_limit_quantity }}人报名</span>
        <p>报名人数</p>
      </li>
      <li class="have-link">
        <img src="./location-icon.png"/>
        <p>{{ listData.province_id }}{{ listData.city_id }}{{ listData.region_id }}{{ listData.address }}</p>
      </li>
    </ul>
    <div class="interval"></div>
    <ul class="message-sponsor" v-if="businessList.length>0">
      <li v-for="(item, index) in businessList" :key="index">
        <span class="attention">关注</span>
        <!--<span class="attentioned">已关注</span>-->
        <img :src="item.logo"/>
        <div>
          <span class="organizer" v-if="item.role===1">主办方</span>
          <span class="organizer" v-if="item.role!==1">协办方</span>
          <p>{{ item.name }}</p>
        </div>
      </li>
      <!--<li>-->
        <!--<span class="attention">关注</span>-->
        <!--<span class="attentioned">已关注</span>-->
        <!--<img src="./co-organizer-icon.png"/>-->
        <!--<div>-->
          <!--<span class="co-organizer">协办方</span>-->
          <!--<p>杭州微校互联科技有限公司华北地区分公司</p>-->
        <!--</div>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        businessList: []
      }
  },
  props: {
    listData: {
      type: Object
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    checkApplued () {
      this.$router.push({
        path: '/applyedQuantity',
        query: {
          sid: this.listData.sid,
          cls: 14
        }
      })
    }
  },
  watch: {
    'listData.business_list' (val) {
      this.businessList = JSON.parse(val)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './message.styl'
</style>
