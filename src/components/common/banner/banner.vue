<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(str, index) in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }" @click.prevent.stop="chooseItem(index)">
			</div>
		</div>
		<div class="swiper-pagination swiper-pagination-white"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	export default {
		name: 'banner',
		props: ['listImg'],
		data () {
			return {
				bannerSwiper: false
			}
		},
		watch: {
			listImg (newVal, oldVal) {
				this.$nextTick(() => {
					this.updateSwiper()
				})
			}
		},
		mounted () {
		},
		methods: {
			updateSwiper () {
				if (this.bannerSwiper) {
					this.bannerSwiper.update
				} else {
					this.bannerSwiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						loop: true,
						speed: 600,
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						onInit: function (swiper) {
							swiper.startAutoplay()
						},
						onTouchEnd: function (swiper) {
							swiper.startAutoplay()
						}
					})
				}
			},
			// 选中元素
			chooseItem (index) {
				this.$emit('chooseItem', index)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.swiper-container
		width: 100%
		height: 100%
		.swiper-wrapper
			width: 100%
			height: 100%
			.swiper-slide
				background-position: center
				width: 100%
				height: 100%
				background-size contain
				// background-attachment: fixed
				background-repeat no-repeat
		.swiper-pagination-bullet
			width: 0.12rem
			height: 0.12rem
			display: inline-block
			background: #7c5e53
</style>
