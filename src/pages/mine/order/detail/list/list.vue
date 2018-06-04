<template>
	<ul ref="list" class="mine-order-detail-list">
		<!-- 图书 -->
		<li v-if="cls !== '13' || !cls" ref="listItem" v-for="(item, index) in compListData" class="list-item" :class="{refunded: item.trade_status==='7'}">
			<!-- 左侧图片 -->
			<div class="left-media">
				<img v-lazy="item.logo">
			</div>
			<!-- 右侧文字 -->
			<div class="right-part">
				<p class="name">{{ item.name }}</p>
				<p class="numbers">
					<span class="label-name">数量:</span>
					<span class="value">X{{ item.quantity }}</span>
				</p>
				<div class="numbers price">
					<span class="label-name">单价:</span>
					<span class="value">¥{{ item.fee }}</span>
          <!-- 拒绝退款 -->
          <span class="refuse-refund" v-if="item.trade_status === '9'">拒绝退款</span>
					<!-- 如果是评价列表页 -->
					<div v-if="entrance === 'evaluate'&&item.trade_status!=='7'" class="btn-box" @click.prevent.stop="goEvaluate(item)">
						<span>去评价</span>
					</div>
					<!-- 入口是退款页 -->
					<div v-if="entrance === 'refund'" class="btn-box" @click.prevent.stop="goRefund()">
						<span>申请退款</span>
					</div>
				</div>
				<!-- 退款 -->
				<p v-if="item.reason" class="numbers">
					<span class="label-name">退款原因:</span>
					<span class="value">{{ item.reason }}</span>
				</p>
				<p v-if="item.explain" class="numbers">
					<span class="label-name">退款说明:</span>
					<span v-show="item.showAll" class="value two-line">{{ item.explain }}</span>
					<span v-show="!item.showAll" class="value two-line">{{ item.slicedExplain }}</span>
					<span v-show="item.slicedExplain" class="show-all" @click.prevent.stop="showItemAll(index)">查看全部<span class="arrow-bottom" :class="{ up: item.showAll }"></span></span>
				</p>
			</div>
		</li>
		<!-- 活动 -->
		<li v-if="cls === '13'" v-for="(item, index) in compListData" class="activity-item">
			<div class="left-text">
				<p class="name">{{ item.name }}</p>
				<p class="code">
					<span class="label-name">验证码:</span>
					<span class="text">2017085678988568</span>
				</p>
				<div class="bottom-btn" @click="applyRefund(item)">
					<span class="refund-btn">申请退款</span>
				</div>
			</div>
			<div class="right-media" @click="showActivityView(index)">
				<img v-lazy="item.logo">
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'mine-order-detail-list',
		props: {
			listData: {
				type: Array
			},
			entrance: {
				type: String
			},
			cls: {
				type: String
			}
		},
		data () {
			return {
				compListData: []
			}
		},
		watch: {
			// 重新计算
			listData (newVal, oldVal) {
				if (!newVal.length) {
					return
				}
				this.getCompData()
			}
		},
		mounted () {
			// this.getCompData()
		},
		methods: {
			// 计算过的数据
			getCompData () {
				if (!this.listData.length) {
					return false
				}
				this.compListData = this.listData.map(item => {
					if (item.explain && item.explain.length > 24) {
						item.showAll = false
						item.slicedExplain = item.explain.substr(0, 24) + '...'
					} else {
						item.showAll = true
					}
					return item
				})
			},
			// 去评价
			goEvaluate (item) {
				this.$router.push({
					path: 'evaluate/single',
					query: {
						item: JSON.stringify(item),
						cls: this.$route.query.cls,
						id: this.$route.query.id
					}
				})
			},
			// 申请退款
			goRefund () {
				this.$router.push({
					path: '/mine/order/refund'
				})
			},
			// 查看全部
			showItemAll (index) {
				this.compListData = this.compListData.map((item, index2) => {
					if (index === index2) {
						item.showAll = !item.showAll
					}
					return item
				})
			},
			// 展示活动二维码
			showActivityView (index) {
				this.$emit('showActivityView', index)
			},
			// 申请活动退款
			applyRefund (item) {
				this.$router.push({
					path: '/mine/order/refund/activity',
					query: {
						item: JSON.stringify(item)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>
