<template>
	<section class="home-popularize" @click="showToast()">
		<ul v-if="themes && themes.hasOwnProperty('book')" class="list">
			<!-- 图书 -->
			<li v-if="themes && themes.hasOwnProperty('book')" class="list-item" @click.prevent.stop="openItem('/book')">
			<!-- 双十二 -->
			<!-- <li v-if="themes && themes.hasOwnProperty('book')" class="list-item" @click.prevent.stop="openItem('/double-twelve')"> -->
				<p class="title">{{ themes.book.title }}</p>
				<p class="sub-title">{{ themes.book.subtitle }}</p>
				<div class="media">
					<div v-for="pic in themes.book.pics" class="img-box">
						<img class="left-img" v-lazy="pic">
					</div>
				</div>
			</li>
			<!-- 团购 -->
			<li v-if="themes && themes.hasOwnProperty('goods')" class="list-item">
				<p class="title">{{ themes.goods.title }}</p>
				<p class="sub-title">{{ themes.goods.subtitle }}</p>
				<div class="media">
					<div v-for="pic in themes.goods.pics" class="img-box">
						<img class="left-img" v-lazy="pic">
					</div>
				</div>
			</li>
		</ul>
		<!-- 活动 -->
		<div v-if="firstActivity" class="center">
			<p class="title">{{ firstActivity.title }}</p>
			<p class="sub-title">{{ firstActivity.subTitle }}</p>
			<div class="media-imgs" :style="{ height: winWidth }">
				<div class="top-box img-box">
					<img v-lazy="firstActivity.pics[2]" :style="getImgStyle(firstActivity.pics[2], '0.6')">
				</div>
				<div class="middle-box img-box">
					<img v-lazy="firstActivity.pics[1]" :style="getImgStyle(firstActivity.pics[1], '0.6')">
				</div>
				<div class="bottom-box img-box">
					<img v-lazy="firstActivity.pics[0]" :style="getImgStyle(firstActivity.pics[0], '0.6')">
				</div>
			</div>
		</div>
		<!-- 其他的活动(单数) -->
		<div v-if="otherActivity && otherActivity % 2 !== 0" class="center">
			<p class="title">{{ otherActivity[0].title }}</p>
			<p class="sub-title">{{ otherActivity[0].subTitle }}</p>
			<div class="media-imgs" :style="{ height: winWidth }">
				<div class="top-box img-box">
					<img v-lazy="otherActivity[0].pics[2]" :style="getImgStyle(otherActivity[0].pics[2], '0.6')">
				</div>
				<div class="middle-box img-box">
					<img v-lazy="otherActivity[0].pics[1]" :style="getImgStyle(otherActivity[0].pics[1], '0.6')">
				</div>
				<div class="bottom-box img-box">
					<img v-lazy="otherActivity[0].pics[0]" :style="getImgStyle(otherActivity[0].pics[0], '0.6')">
				</div>
			</div>
		</div>
		<!-- 其他活动(双数) -->
		<ul v-if="otherActivity && otherActivity % 2 === 0" class="list">
			<li v-for="item in otherActivity" class="list-item">
				<p class="title">{{ item.title }}</p>
				<p class="sub-title">{{ item.subTitle }}</p>
				<div class="media-imgs" :style="{ height: halfWinWidth }">
					<div class="top-box img-box">
						<img v-lazy="item.pics[2]" :style="getImgStyle(item.pics[2], '0.6')">
					</div>
					<div class="middle-box img-box">
						<img v-lazy="item.pics[1]" :style="getImgStyle(item.pics[1], '0.6')">
					</div>
					<div class="bottom-box img-box">
						<img v-lazy="item.pics[0]" :style="getImgStyle(item.pics[0], '0.6')">
					</div>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import split from '@/components/common/split/split'
	export default {
		name: 'home-popularize',
		props: {
			themes: {
				type: Object
			}
		},
		data () {
			return {
				winWidth: (window.innerWidth - (window.innerWidth / 375 * 20)) * 0.6 + 'px',
				halfWinWidth: (window.innerWidth / 2 - (window.innerWidth / 375 * 20)) * 0.6 + 'px'
			}
		},
		computed: {
			// 第一张活动
			firstActivity () {
				if (!this.themes || !this.themes.hasOwnProperty('activities') || !this.themes.activities.length) {
					return false
				}
				return this.themes.activities[0]
			},
			// 其他的活动
			otherActivity () {
				if (!this.themes || !this.themes.hasOwnProperty('activities') || this.themes.activities.length <= 1) {
					return false
				}
				return this.themes.activities.slice(1)
			}
		},
		methods: {
			// 提示
			showToast () {
				this.Toast.warning({
					title: '<p>该功能正在开发中</p><p>敬请期待...</p>'
				})
			},
			// 根据图片比例获得图片需要的宽高
			getImgStyle (url, size) {
				let image = new Image()
				image.src = url
				image.display = 'none'
				let width = image.width
				let height = image.height
				if (width * parseFloat(size) > height) {
					return {
						height: '100%'
					}
				} else {
					return {
						width: '100%'
					}
				}
			},
			// 打开一种首页
			openItem (path) {
				this.$router.push({
					path: path
				})
			}
		},
		components: {
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './popularize.styl'
</style>
