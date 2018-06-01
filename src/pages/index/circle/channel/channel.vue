<template>
	<div class="circle-channel">
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: wrapperHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<v-list :listData="listData"></v-list>
			</section>
		</div>
	</div>
</template>

<script>
	import list from './list/list'
	import BScroll from 'better-scroll'
	export default {
		name: 'circle-channel',
		data () {
			return {
				// 屏幕高度
				wrapperHeight: window.innerHeight - 144 + 'px',
				scroller: '',
				pageNo: 1,
				listData: [],
				scrollTop: 0,
				// 可加载更多
				canLoadMore: false
			}
		},
		computed: {
		},
		components: {
			'v-list': list
		},
		watch: {
			scrollTop (newVal, oldVal) {
				// 通知顶部条上移
				this.$root.Bus.$emit('circleScroll', newVal)
				if (newVal + parseInt(this.wrapperHeight, 10) > this.$refs.content.offsetHeight && this.canLoadMore) {
					this.canLoadMore = false
					this.loadMore()
				}
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 加载数据
			loadData () {
				let params = {
					page_number: this.pageNo,
					is_business: 1 // 0 为社区, 1 为频道
				}
				this.$ajax.circleChannelList(params).then(res => {
					console.log(res)
					let list = res.data.data.list
					// 通知父组件可加载更多
					if (list.length >= 20) {
						this.canLoadMore = true
					}
					this.listData = this.listData.concat(list)
					// 更新
					this.$nextTick(() => {
						this.initBetterScroll()
					})
				}, err => {
					console.log(err)
				})
			},
			// 加载更多
			loadMore () {
				this.pageNo += 1
				this.loadData()
			},
			// 初始化 scroller
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 监听
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
			// 滚到顶部
			scrollToTop () {
				this.scroller.scrollTo(0, 0, 500)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './channel.styl'
</style>