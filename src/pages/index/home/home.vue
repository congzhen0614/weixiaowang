<template>
	<div class="home-page">
		<v-top :scrollTop="scrollTop"></v-top>
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<section ref="content" class="content">
				<div class="home">
					<v-banner :style="{ height: bannerHeight }" :listImg="listImg" class="banner" @chooseItem="chooseItem"></v-banner>
				</div>
				<!-- 菜单 -->
				<v-menu class="menu-list"></v-menu>
				<!-- 推荐 -->
				<v-recommond ref="recommond" v-if="data.recommends && data.recommends.length" :recommends="data.recommends"></v-recommond>
				<v-popularize v-if="data.themes" :themes="data.themes"></v-popularize>
				<v-choiceness ref="circle" @scrollRefresh="scrollRefresh" @canLoadMore="canLoadMore"></v-choiceness>
			</section>
			<img v-show="showToTopBtn" @click="scrollToTop()" class="to-top-icon" src="./to_top_icon.png">
		</div>
	</div>
</template>

<script>
	import banner from '@/components/common/banner/banner'
	import menu from './menu/menu'
	import recommond from './recommond/recommond'
	import split from '@/components/common/split/split'
	import popularize from './popularize/popularize'
	import choiceness from './choiceness/choiceness'
	import BScroll from 'better-scroll'
	import top from './top/top'
	export default {
		name: 'home',
		data () {
			return {
				// 广告高度
				bannerHeight: window.innerWidth * 0.6 + 'px',
				// 屏幕高度
				winHeight: window.innerHeight - 52 + 'px',
				scroller: '',
				// 滚动条高度
				scrollTop: 0,
				// 数据对象
				data: {},
				// 可加载更多
				loadMore: false
			}
		},
		computed: {
			// 切换滚动到顶部按钮显示隐藏
			showToTopBtn () {
				return this.scrollTop > window.innerHeight
			},
			// 图片数组
			listImg () {
				let list = []
				if (this.data.hasOwnProperty('adverts') && this.data.adverts.length) {
					this.data.adverts.forEach(item => {
						list.push({
							url: item.logo
						})
					})
				}
				return list
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		watch: {
			// 监听滚动条高度
			scrollTop (newVal, oldVal) {
				// 加载临界值
				let loadTop = this.$refs.content.offsetHeight - window.innerHeight - 50
				if (newVal > loadTop && this.loadMore) {
					// 获取圈子数据
					this.$refs.circle.loadMore()
					this.loadMore = false
				}
			}
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.getHomePage().then(res => {
					// 获取圈子数据
					this.$refs.circle.getData()
					this.data = res.data
					this.$nextTick(() => {
						// 初始化 better-scroll
						this.freshScroll()
						// 监听滚动条
						this.listenScroll()
						// 通知 recommond 更新
						this.$refs.recommond.freshSwiper()
					})
				}, err => {
					console.log(err)
				})
			},
			// 刷新 freshScroll
			freshScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 滚动到顶部
			scrollToTop () {
				this.scroller.scrollTo(0, 0, 500)
			},
			// 刷新 scroll
			scrollRefresh () {
				this.scroller.refresh()
			},
			// 监听滚动条
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						this.loadData()
					}
				})
			},
			// 可加载更多
			canLoadMore (flag) {
				this.loadMore = flag
			},
			// banner选中
			chooseItem (index) {
				let cls = this.data.adverts[index].cls
				let id = this.data.adverts[index].srcid
				// 根据 cls 跳转到不同详情
				switch (cls) {
				case '14':
					this.$router.push({
						path: '/activity/detail',
						query: {
							id: id
						}
					})
					break
				case '2':
					this.$router.push({
						path: '/book/detail',
						query: {
							id: id
						}
					})
					break
				case '19':
					this.$router.push({
						path: '/train/detail',
						query: {
							id: id
						}
					})
					break
				default:
					this.$router.push({
						path: '/double-twelve'
					})
					break
				}
			}
		},
		components: {
			'v-banner': banner,
			'v-menu': menu,
			'v-recommond': recommond,
			'v-popularize': popularize,
			'v-choiceness': choiceness,
			'v-top': top,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'
</style>
