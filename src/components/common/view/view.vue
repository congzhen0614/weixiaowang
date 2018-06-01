<template>
	<div class="view">
		<v-header :entrance="type" :title="title">
			<p slot="title">{{ title }}</p>
		</v-header>
		<ul class="img-list">
			<li v-for="(item, index) in listImg" @click="showImages(index)" class="list-item">
				<img :src="item.url">
			</li>
		</ul>
		<div v-show="imagesShow" class="mask" @click="hideMask()">
			<div class="image-view">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="obj in listImg" :style="{ backgroundImage: 'url(' + obj.url + ')' }"></div>
					</div>
					<div class="swiper-pagination swiper-pagination-white"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	import header from '../../header/header'
	export default {
		name: 'view',
		data () {
			return {
				imgs: JSON.parse(this.$route.query.imgs) || [],
				imagesShow: true,
				title: '活动图片',
				type: 'images'
			}
		},
		computed: {
			listImg () {
				let arr = []
				if (this.imgs && this.imgs.length) {
					this.imgs.forEach((item) => {
						arr.push({
							url: item
						})
					})
				}
				console.log(arr)
				return arr
			}
		},
		mounted () {
			// console.log(this.$route.query.imgs)
			this.imagesShow = false
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				// loop: true,
				speed: 600,
				// autoplay: 2000,
				onTouchEnd: function () {
					swiper.startAutoplay()
				}
			})
		},
		methods: {
			// 显示图片
			showImages (index) {
				this.imagesShow = true
			},
			// 隐藏
			hideMask () {
				this.imagesShow = false
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@media (-webkit-min-device-pixel-ratio:2),(device-width:320px)
	.image-view
		width 6rem
		height 6rem
.view
	margin-top 0.8rem
	.img-list
		font-size 0
		padding 0.2rem
		.list-item
			display inline-block
			width 25%
			padding 0.05rem
			> img
				width 100%
	.mask
		position fixed
		top 0
		left 0
		right 0
		width 100%
		height 100%
		background rgba(0, 0, 0, 0.7)
		.image-view
			width 7rem
			height 7rem
			margin 0 auto
			margin-top 50%
			.swiper-container 
				width: 100%
				height: 100%
				.swiper-wrapper 
					width: 100%
					// height: 100%
					.swiper-slide 
						background-position: center
						background-size: cover
						width: 100% !important
						height: 100%
						img 
							width: 100%
							// height: 100%
				.swiper-pagination-bullet 
					width:0.12rem
					height: 0.12rem
					display: inline-block
					background: #7c5e53
</style>