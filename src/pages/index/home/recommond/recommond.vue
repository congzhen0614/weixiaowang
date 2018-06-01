<template>
	<section class="home-recommond">
		<div class="left-part">
			<img src="./recommond_icon.png">
		</div>
		<div class="right-part">
			<div class="recommond-swiper-container">
				<div class="swiper-wrapper">
					<ul v-for="(items, index) in compRecommends" class="swiper-slide recommond-list swiper-no-swiping">
						<li v-for="item in items" class="list-item" @click="openLink(item.link, item.id)">
							<span class="title">{{ item.category }}</span>
							<span class="text">{{ item.title }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="right-box"></div>
	</section>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'home-recommond',
		props: {
			recommends: {
				type: Array
			}
		},
		data () {
			return {
				recommondSwiper: ''
			}
		},
		watch: {
			recommends (newVal, oldVal) {
				this.$nextTick(() => {
					this.freshSwiper()
				})
			}
		},
		computed: {
			// 计算过后两个为一组
			compRecommends () {
				let arr = []
				if (!this.recommends || !this.recommends.length) {
					return arr
				}
				for (let i = 0; i < this.recommends.length; i += 2) {
					let single = []
					single.push(this.recommends[i])
					if (i <= this.recommends.length - 2) {
						single.push(this.recommends[i + 1])
					}
					arr.push(single)
				}
				return arr
			}
		},
		mounted () {
		},
		methods: {
			// 打开链接
			openLink (link, id) {
				// 判断有没有外部链接
				if (!link) {
					this.$router.push({
						path: '/book/detail',
						query: {
							id: id
						}
					})
				} else {
					window.location.href = link
				}
			},
			// 更新 swiper
			freshSwiper () {
				if (!this.recommondSwiper) {
					this.recommondSwiper = new Swiper('.recommond-swiper-container', {
						direction: 'vertical',
						paginationClickable: false,
						loop: true,
						speed: 600,
						autoplay: 2000,
						simulateTouch: false,
						autoplayDisableOnInteraction: false,
						onInit: function (swiper) {
							swiper.startAutoplay()
						},
						onTouchEnd: function (swiper) {
							swiper.startAutoplay()
						}
					})
				} else {
					this.recommondSwiper.update()
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './recommond.styl'
</style>
