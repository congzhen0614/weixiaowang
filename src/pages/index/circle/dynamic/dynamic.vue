<template>
	<div class="circle-dynamic">
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<!-- 轮播图暂时不用 -->
				<!-- <v-banner :style="{ height: bannerHeight }" :listImg="listImg" class="banner"></v-banner> -->
				<v-list :listData="listData" :indexPage="true" @closeItem="closeItem"></v-list>
			</section>
		</div>
	</div>
</template>

<script>
	import banner from '@/components/common/banner/banner'
	import list from '@/components/circle/list/list'
	// import { getPastTimeText } from '@/common/js/common.js'
	import BScroll from 'better-scroll'
	export default {
		name: 'circle-dynamic',
		data () {
			return {
				bannerHeight: window.innerWidth / 3 + 'px',
				// 屏幕高度
				winHeight: window.innerHeight - 144 + 'px',
				scroller: '',
				pageNo: 1,
				listData: [],
				scrollTop: 0,
				// 可加载更多
				canLoadMore: false
			}
		},
		computed: {
			listImg () {
				// if (!this.item.detail_img) {
				// 	return []
				// }
				let arr = []
				// this.item.detail_img.forEach(item => {
				// 	arr.push({
				// 		url: item
				// 	})
				// })
				return arr
			}
		},
		components: {
			'v-banner': banner,
			'v-list': list
		},
		watch: {
			scrollTop (newVal, oldVal) {
				// 通知顶部条上移
				this.$root.Bus.$emit('circleScroll', newVal)
				if (newVal + parseInt(this.winHeight, 10) > this.$refs.content.offsetHeight && this.canLoadMore) {
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
				this.$ajax.getCircleList({
					page_number: this.pageNo
				}).then(res => {
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
			// 关闭单条
			closeItem (id) {
				this.listData.forEach((item, index) => {
					if (id === item.id) {
						this.listData.splice(index, 1)
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
	@import './dynamic.styl'
</style>