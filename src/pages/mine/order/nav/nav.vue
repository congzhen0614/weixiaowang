 <template>
	<ul class="mine-order-nav">
		<li :class="{ active: index === navIndex }" v-for="(item, index) in navList" class="nav-item" @click="changeNavIndex(index, item.tradeStatus)">
			{{ item.text }}
			<div v-if="index === 0" :style="{ left: navIndex * 100 + '%' }" class="bottom-bar"></div>
		</li>
	</ul>
</template>

<script>
	// 杂志订单状态数组
	// let periodicalOrderList = [{
	// 	text: '全部',
	// 	tradeStatus: ''
	// },{
	// 	text: '待付款',
	// 	tradeStatus: '1'
	// },{
	// 	text: '待收货',
	// 	tradeStatus: '2'
	// },{
	// 	text: '已收货',
	// 	tradeStatus: '4'
	// },{
	// 	text: '退款',
	// 	tradeStatus: '7'
	// }]

	// 图书订单状态数组
	let bookOrderList = [{
		text: '全部',
		tradeStatus: ''
	}, {
		text: '待付款',
		tradeStatus: '1'
	}, {
		text: '待收货',
		tradeStatus: '2'
	}, {
		text: '已收货',
		tradeStatus: '4'
	}, {
		text: '退款',
		tradeStatus: '7'
	}]
	// 活动订单状态数组
	let activityOrderList = [{
		text: '全部',
		tradeStatus: ''
	}, {
		text: '待付款',
		tradeStatus: '1'
	}, {
		text: '已付款',
		tradeStatus: '2'
	}, {
		text: '现场缴费',
		tradeStatus: '4'
	}, {
		text: '退款',
		tradeStatus: '7'
	}]
	export default {
		props: {
			title: {
				type: String
			},
			navIndex: {
				type: Number
			},
			cls: {
				type: String
			}
		},
		data () {
			return {}
		},
		computed: {
			// 导航数据
			navList () {
				let cls = this.cls
				if (cls === '1' || cls === '2') {
					return bookOrderList
				} else {
					return activityOrderList
				}
			}
		},
		methods: {
			// 切换导航
			changeNavIndex (index, tradeStatus) {
				this.$emit('changeNavIndex', index, tradeStatus)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './nav.styl'
</style>
