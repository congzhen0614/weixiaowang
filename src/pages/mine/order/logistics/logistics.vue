<template>
  <section class="logistics-particulars">
    <header class="logistics-header">
      <div class="back-icon" @click="goBack()">
        <img src="./back-icon.png"/>
      </div>
      <p class="head-text">物流详情</p>
    </header>
    <section class="logistics-content">
      <div class="logistics-message">
        <p>货运单号:<span class="visi-hidden">隐</span><span>{{ logisticCode }}</span></p>
        <p>承运来源:<span class="visi-hidden">隐</span><span>{{ expressMsg.name }}</span></p>
        <span class="phone-icon" @click="clickCallUp(expressMsg.phoneNumber)"></span>
        <p>物流客服:<span class="visi-hidden">隐</span><span>{{ expressMsg.phoneNumber }}</span></p>
      </div>
      <ul class="logistics-list">
        <li v-for="(item, index) in listData">
          <div class="logistics-list-content" :class="{'content-first': index===0}">
            <p style="margin-top: 1px">{{ item.accept_station }}</p>
            <p class="logistics-list-time">{{ item.accept_time }}</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- 猜您喜欢 -->
    <v-recommend :recommendList="recommendList"></v-recommend>
  </section>
</template>

<script>
  import recommend from '@/pages/book/recommend/recommend'
  import express from '../../../../../static/data/expressPhone.json'
	export default {
		name: 'logistics-particulars',
    components: {
      'v-recommend': recommend
    },
		data () {
			return {
        listData: [],
        recommendList: [],
        logisticCode: this.$route.query.logistic_code,
        shipperCode: this.$route.query.shipper_code
      }
		},
		computed: {
      expressMsg () {
        let ex = {}
        express.data.forEach(item => {
          if (item.shipperCode === this.shipperCode) {
            ex = item
          }
        })
        return ex
      },
      params () {
        let param = {}
        param.logistic_code = this.$route.query.logistic_code
        param.shipper_code = this.$route.query.shipper_code
        return param
      }
    },
		created () {},
		mounted () {
      this.loadData()
    },
		methods: {
      loadData () {
        this.$ajax.logistics(this.params).then(res => {
          this.listData = res.data.expressList
          this.recommendList = res.data.recommendList
        }, err => {
          console.log(err)
        })
      },
      goBack () {
        this.$router.back()
      },
      clickCallUp (phoneNumber) {
        window.location.href = "tel://" + phoneNumber
      }
    },
    watch: {}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './logistics.styl'
</style>
