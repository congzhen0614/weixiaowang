<template>
	<section class="order-activity-code-view">
		<div class="close-icon" @click="hideView()"></div>
		<!-- 内容 -->
		<div :style="{ height: swiperHeight }" class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in listData" :style="{ backgroundImage: 'url(' + item.logo + ')' }"></div>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="bottom-btns">
			<div @click="swiperSlidePrev()" class="left-btn"></div>
			<p class="name">{{ name }}</p>
			<div @click="swiperSlideNext()" class="right-btn"></div>
		</div>
	</section>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'mine-order-detail-list',
		props: {
			listData: {
				type: Array
			},
			viewIndex: {
				type: Number
			}
		},
		data () {
			return {
				viewSwiper: '',
				// 轮播高度
				swiperHeight: window.innerWidth - 50 + 'px'
			}
		},
		computed: {
			// 名字
			name () {
				return this.listData[this.viewIndex].name
			}
		},
		watch: {
			listData (newVal, oldVal) {
				if (!newVal.length) {
					return
				}
				this.$nextTick(() => {
					this.initSwiper()
				})
			}
		},
		mounted () {
			this.$nextTick(() => {
				// 初始化
				this.initSwiper()
			})
		},
		methods: {
			// 初始化
			initSwiper () {
				if (this.viewSwiper) {
					this.viewSwiper.update()
				} else {
					this.viewSwiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						loop: false,
						speed: 600,
						autoplay: false,
						initialSlide: this.viewIndex,
						autoplayDisableOnInteraction: false
					})
				}
			},
			// 上一条
			swiperSlidePrev () {
				this.viewSwiper.slidePrev()
			},
			// 下一条
			swiperSlideNext () {
				this.viewSwiper.slideNext()
			},
			// 隐藏
			hideView () {
				this.$emit('hideView')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './view.styl'
</style>