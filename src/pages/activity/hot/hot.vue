<template>
  <div class="active-hot-page">
    <div v-if="titleFlag" class="interval"></div>
    <div v-if="titleFlag" class="title">
      <span>热门活动</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in list" @click="clickLink(item)">
        <div class="content-right">
          <p class="content-title">{{item.title}}</p>
          <p class="content-date">{{item.begin_time}}</p>
          <p class="content-price" v-if="item.cashdown!=0">￥<span class="priceInt">{{item.cashdown | getInteger}}</span>{{item.cashdown | getFixed1}}</p>
          <p class="content-price" v-if="item.cashdown==0"><span class="priceInt">免费</span></p>
          <div class="content-bottom">
            <span class="ticket">票</span>
            <span class="tour">跟团</span>
            <span class="reduce">立减5元</span>
          </div>
        </div>
        <div class="content-left">
          <img v-lazy="item.logo">
          <span class="distance">{{item.distance | conversion}}公里</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'active-hot-page',
    data () {
      return {
        noImages: require('./bannerIsNone.png')
      }
    },
    props: {
      list: {
        type: Array
      },
      titleFlag: {
        type: Boolean
      }
    },
    mounted () {
    },
    methods: {
      clickLink (item) {
        if (item.link) {
          window.location.href = item.link
        } else {
          this.$router.push({
            path: '/activityDetails',
            query: {
              id: item.id,
              cls: item.cls,
              lat: item.lat,
              lng: item.lng,
              _uid: localStorage.getItem('userId')
            }
          })
        }
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './hot.styl'
</style>
