<template>
	<div class="mine-order-refund">
		<!-- 头部 -->
		<section class="mine-order-refund-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">申请退款</p>
		</section>
    <section>
      <ul class="refund-list">
        <li v-for="(item, index) in listData" :key="index" :class="{refunded: item.trade_status === '7'}">
          <div :class="{refunded: item.trade_status === 4}">
            <div class="refund-logo">
              <img :src="item.logo"/>
            </div>
            <div class="refund-content">
              <p class="refund-title">{{ item.name }}</p>
              <span class="refunding" v-if="item.trade_status === '8'">退款申请审核中...</span>
              <p class="refund-count">数量:<span class="visi-hidden">隐</span><span>×{{ item.quantity }}</span></p>
              <span class="apply-refund refuse" v-if="item.trade_status === '9'">拒绝退款</span>
              <span class="apply-refund apply" v-if="tradeStatus === '2'&&item.trade_status !== '8'&&item.trade_status !== '9'&&item.trade_status !== '7'" @click="applyRefund(item)">申请退款</span>
              <span class="apply-refund cancel" v-if="item.trade_status === '8'" @click="cancelRefund(item)">取消退款</span>
              <p class="refund-price">单价:<span class="visi-hidden">隐</span><span>￥{{ item.fee }}</span></p>
              <p class="refund-reason" v-if="item.trade_status === '8' || item.trade_status === '7'">退款原因:<span class="visi-hidden">隐</span>{{ item.refund_type }}</p>
              <p class="refund-refund_type" v-if="item.trade_status === '8' || item.trade_status === '7'">
                退款说明:<span class="visi-hidden">隐</span>{{ item.refund_reson }}
                <span class="look-up show-icon" v-if="!item.lookAllFlag&&item.refund_reson.length>25" @click="clickLookAll(index)">查看全部</span>
                <span class="look-down show-icon" v-if="item.lookAllFlag&&item.refund_reson.length>25" @click="clickLookAll(index)">收起</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
        cls: this.$route.query.cls || '2',
        id: this.$route.query.id,
				listData: [],
        tradeStatus: ''
			}
		},
    computed: {
      params () {
        let params = {}
        params.cls = this.cls
        params.id = this.id
        return params
      }
    },
		mounted () {
      this.loadData()
		},
		methods: {
      loadData () {
        this.$ajax.tradeDetail(this.params).then(res => {
          this.listData = res.data.bookMagazineView.itemList
          console.log(this.listData)
          this.tradeStatus = res.data.bookMagazineView.trade_status
          this.listData.forEach(item => {
            if (item.refund_reson.length > 25) {
              item.refund_resonStr = item.refund_reson
              item.refund_reson = this.cutOutOmit(item.refund_reson)
            }
          })
        }, err => {
          console.log(err)
        })
      },
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
      clickLookAll (index) {
        this.listData[index].lookAllFlag = !this.listData[index].lookAllFlag
        if (this.listData[index].lookAllFlag) {
          this.listData[index].refund_reson = this.listData[index].refund_resonStr
        } else {
          this.listData[index].refund_reson = this.cutOutOmit(this.listData[index].refund_reson)
        }
      },
      cutOutOmit (str) {
        return str.substring(0, 24) + '...'
      },
      applyRefund (item) {
        this.$router.push({
          path: '/mine/order/refund/single',
          query: {
            id: item.id,
            detailId: item.item_id
          }
        })
      },
      cancelRefund (item) {
        this.Dialog.alert({
          title: '温馨提示',
          msg: '小主，确定要取消付款吗',
          buttons: ['我确定', '再想想']
        }, res => {
          if (res.buttonIndex === 1) {
            this.$ajax.cancleApplyRefund(item.id).then(res => {
              if (res.data.result.status === '0') {
                this.loadData()
                this.Toast.success({
                  title: res.data.result.msg
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
        })
      }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './refund.styl'
</style>
