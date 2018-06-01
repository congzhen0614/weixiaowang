<template>
	<div class="twelve_ording_list">
		<div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight }">
			<div class="content" ref="content">
				<ul class="list">
					<li v-for="(item, index) in listData" ref="listItem" class="list-item underline" @click.prevent.stop="showDetail(index)" :data-id="item.id">
						<!-- <div class="left-media" :style="{ backgroundImage: 'url(' + item.logo + ')' }"> -->
						<div class="left-media">
							<img v-lazy="item.logo">
						</div>
						<div class="right-part">
							<div class="box">
								<p class="title">{{ item.name || '' }}</p>
								<div v-if="item.gift_name.length" class="desc">
									<img src="./gift_icon.png">
									<p class="text">{{ item.gift_name || '' }}</p>
								</div>
								<p class="time">
									<span class="text">{{ item.fee_unit || '' }}</span>
								</p>
								<div class="bottom" @click.prevent.stop="">
									<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getFixed1 }}元</p>
									<v-cartControl :index="index" :num="item.number" @decrement="decrement" @increaseCart="increaseCart"></v-cartControl>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import cartControl from '../../cartControl/cartControl'
	import BScroll from 'better-scroll'
	export default {
		name: 'publish',
		props: ['listData', 'doubleEleven', 'list', 'area'],
		data () {
			return {
				noData: '',
				wrapperHeight: window.innerHeight - 50 + 'px',
				scrollTop: 0,
				scroller: '',
				// 可加载
				loadMore: false,
				lastScrollTop: 0
			}
		},
		created () {
			this.$nextTick(() => {
				setTimeout(() => {
					window.scrollTo(0, 0)
				}, 200)
			})
		},
		watch: {
			scrollTop (newVal, oldVal) {
				let loadTop = this.$refs.content.offsetHeight - window.innerHeight - 50
				// 关闭 loadMore
				if (newVal > loadTop && this.loadMore) {
					this.loadMore = false
					this.$root.Bus.$emit('loadMoreData')
				}
			}
		},
		mounted () {
		},
		methods: {
			// 显示详情
			showDetail (index) {
				this.lastScrollTop = this.scrollTop
				this.$store.state.lastScrollTop = this.scrollTop
				this.$router.push({
					path: 'double-twelve/detail',
					query: {
						info: JSON.stringify(this.listData[index]),
						index: index
					}
				})
			},
			// 滚动回原位置
			backToLastTop () {
				this.$nextTick(() => {
					// 刷新
					this.initBetterScroll()
					// 滚回原来的位置
					let lastScrollTop = this.$store.state.lastScrollTop
					this.scroller.scrollTo(0, -lastScrollTop, 30)
				})
			},
			// 刷新 scroll
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
				// 可以加载更多
				this.loadMore = true
			},
			// 监听滚动条
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
			// 滑到顶部
			scrollToTop () {
				this.scroller.scrollTo(0, 0, 100)
			},
			// 减少
			decrement (index) {
				this.$emit('decrement', index)
			},
			// 增加
			increaseCart (index, event) {
				this.$emit('increaseCart', index, event)
			}
		},
		components: {
			'v-cartControl': cartControl
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './list.styl'
</style>