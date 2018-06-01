<template>
	<div class="mine-circle">
		<v-top :title="title"></v-top>
		<v-nav :navIndex="navIndex" @changeNavIndex="changeNavIndex"></v-nav>
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
					<component :key="navIndex" :is="nowContent" :listData="nowListData"></component>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script>
	import top from './top/top'
	import nav from './nav/nav'
	import list from '@/components/circle/list/list'
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				title: '刊物',
				navIndex: 0,
				listData: [],
				pageNo: 1,
				canLoadMore: false,
				contentList: ['v-list', 'v-list'],
				scroller: '',
				scrollTop: 0
			}
		},
		computed: {
			nowListData () {
				return this.listData.slice(this.navIndex, this.navIndex + 1)
			},
			nowContent () {
				return this.contentList[this.navIndex]
			}
		},
		created () {
			this.loadData()
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.getCircleList({
					page_number: this.pageNo
				}).then(res => {
					console.log(res)
					let list = res.data.data.list
					// 通知父组件可加载更多
					if (list.length >= 20) {
						this.canLoadMore = true
					}
					// 测试
					// list = list.splice(3, 4)
					this.listData = this.listData.concat(list)
					// 更新
					this.$nextTick(() => {
						this.initBetterScroll()
					})
				})
			},
			// 初始化scroll
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 监听滚动事件
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						// this.loadData()
					}
				})
			},
			// 切换导航
			changeNavIndex (index) {
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
	@import './circle.styl'
</style>