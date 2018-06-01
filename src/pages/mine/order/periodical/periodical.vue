<template>
	<div class="mine_order_page">
		<v-top :title="title"></v-top>
		<v-nav :navIndex="navIndex" @changeNavIndex="changeNavIndex" :cls="cls"></v-nav>
		<!--<transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">-->
			<component :key="navIndex" :is="nowContent" :tradeStatus="tradeStatus"></component>
		<!--</transition-group>-->
	</div>
</template>

<script>
	import top from '../top/top'
	import nav from '../nav/nav'
	import list from './list/list'
	export default {
		data () {
			return {
				title: '刊物',
				// 当前序号
				navIndex: 0,
				// 视图数组
				contentList: ['v-list', 'v-list', 'v-list', 'v-list', 'v-list'],
				// 种类 路由传参
				cls: this.$route.query.cls || '2',
				// 订单状态
				tradeStatus: ''
			}
		},
		computed: {
			// 当前视图
			nowContent () {
				return this.contentList[this.navIndex]
			}
		},
		mounted () {},
		methods: {
			// 切换导航
			changeNavIndex (index, tradeStatus) {
				this.navIndex = index
				this.tradeStatus = tradeStatus
			},
			// 添加
			addTabIndex (num) {
				let index = this.navIndex + num
				if (index >= 4 || index <= 0) {
					return false
				}
				this.navIndex = index
			}
		},
		components: {
			'v-top': top,
			'v-nav': nav,
			'v-list': list
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './periodical.styl'
</style>
