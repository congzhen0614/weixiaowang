<template>
	<div class="twelve_periodical_detail">
		<div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight }">
			<div class="content">
				<section class="header">
					<div v-if="listImg.length" class="banner underline">
						<v-banner :listImg="listImg" :style="{ height: bannerHeight }"></v-banner>
					</div>
					<div class="header-content underline">
						<p class="title">{{ info.name }}</p>
						<p class="suggest">
							<!-- <span v-if="info.fee_unit" :class="{ borderRight: info.age_id }" class="times">{{ info.fee_unit }}</span> -->
							<span v-if="info.fee_unit" class="times">{{ info.fee_unit }}</span>
							<span v-if="info.age_id" class="grade">{{ info.age_id }}岁适读</span>
						</p>
						<p class="carriage">
							<span>运费: </span>
							<span class="carriage-price">{{ info.delivery_fee || defaultTransportText }}</span>
						</p>
						<p class="price">
							<span class="new">￥<span class="big">{{ info.last_fee | getInteger }}</span>{{ info.last_fee | getFixed1 }}</span>
							<!-- <span class="old">￥{{ info.original_fee | getInteger }}</span> -->
						</p>
						<v-cartControl ref="cartcontrol" :index="index" :num="localNumber" class="cart" @decrement="decrement" @increaseCart="increaseCart"></v-cartControl>
					</div>
				</section>
				<section class="main">
					<div v-if="info.gift_name.length" class="gift">
						<div class="img">
							<img src="./gift_icon.png">
						</div>
						<div class="text">{{ info.gift_name }}</div>
					</div>
					<div v-if="info.gift_name.length" class="photo">
						<img :src="info.gift_logo">
					</div>
					<split></split>
					<div class="html-content" ref="content" v-html="info.html"></div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import banner from '@/components/common/banner/banner'
	import cartControl from '@/components/periodical-ording/cartControl/cartControl'
	import split from '@/components/common/split/split'
	import {extendObj} from '@/common/js/common.js'
	import BScroll from 'better-scroll'
	export default {
		name: 'publish',
		props: ['listData', 'doubleEleven', 'area'],
		data () {
			return {
				bannerHeight: window.innerWidth * 0.6 + 'px',
				info: JSON.parse(this.$route.query.info),
				index: parseInt(this.$route.query.index),
				// wrapperHeight: window.innerHeight - 50 + 'px',
				wrapperHeight: '',
				scroller: '',
				canInit: false
			}
		},
		computed: {
			// 默认运费
			defaultTransportText () {
				// 深圳区域满150包邮
				if (this.area) {
					return '满150包邮'
				}
				return '满99包邮'
			},
			localNumber () {
				if (this.listData && this.listData.length) {
					return this.listData[this.index].number
				}
				return 0
			},
			listImg () {
				if (!this.info.detail_img || !this.info.detail_img.length) {
					return [{
						url: this.info.logo
					}]
				}
				let list = []
				this.info.detail_img.forEach(item => {
					list.push({
						url: item
					})
				})
				return list
			}
		},
		mounted () {
			document.title = '详情'
			this.getData()
		},
		methods: {
			// 获取数据
			getData () {
				let id = this.info.id
				this.$ajax.getAjax(`/book/${id}/open`).then(res => {
					this.canInit = true
					this.info = extendObj(this.info, res.data.book)
					this.$nextTick(() => {
						this.$refs.content.innerHTML = this.info.html
						// this.initBetterScroll()
						setTimeout(() => {
							window.scrollTo(0, 0)
						}, 200)
					})
				}, err => {
					console.log(err)
				})
			},
			// 刷新 scroll
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					console.log(this.scroller.scrollTo)
					this.$nextTick(() => {
						setTimeout(() => {
							this.scrollToTop()
						}, 2000)
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scrollToTop()
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
			'v-banner': banner,
			'v-cartControl': cartControl,
			split
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './detail.styl'
</style>