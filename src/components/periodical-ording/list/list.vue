<template>
	<div class="ording-list">
		<!-- <div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight }">
			<div class="content"> -->
				<ul class="list">
					<li v-for="(item, index) in listData" ref="listItem" class="list-item underline" @click.prevent.stop="showDetail(index)" :data-id="item.id">
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
									<v-cartControl :index="index" :num="item.number"></v-cartControl>
								</div>
							</div>
						</div>
					</li>
				</ul>
			<!-- </div>
		</div> -->
	</div>
</template>

<script>
	import cartControl from '../cartControl/cartControl'
	import BScroll from 'better-scroll'
	export default {
		name: 'publish',
		props: ['listData', 'title', 'doubleEleven', 'area'],
		data () {
			return {
				noData: '',
				wrapperHeight: window.innerHeight - 50 + 'px',
				scrollTop: 0,
				scroller: '',
				canInit: false
			}
		},
		created () {
			this.$root.Bus.$on('initListScroll', (index, event) => {
				// this.initBetterScroll()
				this.$nextTick(() => {
					let scrollTop = 0
					this.$refs.listItem.forEach(item => {
						if (item.getAttribute('data-id') === this.$route.query.id) {
							scrollTop = item.offsetTop
						}
					})
					setTimeout(() => {
						window.scrollTo(0, scrollTop)
					}, 200)
				})
			})
		},
		mounted () {
		},
		methods: {
			// 显示详情
			showDetail (index) {
				console.log(this.area)
				if (this.title && this.title === '双十一') {
					this.$router.push({
						path: 'double-eleven/detail',
						query: {
							info: JSON.stringify(this.listData[index]),
							index: index
						}
					})
					return
				}
				if (this.title && this.title === '图书') {
					// 深圳区域
					if (this.area) {
						this.$router.push({
							path: 'other1/detail',
							query: {
								info: JSON.stringify(this.listData[index]),
								index: index
							}
						})
						return
					}
					this.$router.push({
						path: 'other/detail',
						query: {
							info: JSON.stringify(this.listData[index]),
							index: index
						}
					})
				} else {
					this.$router.push({
						path: 'ording/detail',
						query: {
							info: JSON.stringify(this.listData[index]),
							index: index
						}
					})
				}
			},
			// 获取 style 对象
			getObject (url) {
				return {
					backgroundImage: `bg-image(${url})`
				}
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
			},
			// 监听滚动条
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
					if (this.scrollTop < 0) {
						this.initBetterScroll()
					}
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
