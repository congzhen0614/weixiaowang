<template>
	<div class="double-eleven-index-page" :style="{ width: wrapWidth + 'px', transform: topTransLate }">
		<!-- 头部 -->
		<section class="top" :style="topStyleObj">
		</section>
		<!-- 标题 -->
		<section class="top-title">
			<img :src="indexTitleSrc">
		</section>
		<ul class="gift-list">
			<li v-for="gift in giftList" class="gift-item">
				<img :src="gift.src">
			</li>
		</ul>
		<!-- 满送 -->
		<section class="gift-img">
			<img :src="giftImgSrc">
		</section>
		<!-- 满减商品 -->
		<section class="main-content">
			<div class="title">
				<img :src="firstTitleSrc">
			</div>
			<div class="second-title">
				<img :src="secondTitleSrc">
			</div>
			<ul class="book-list">
				<li v-for="(book, index) in bookList" class="book-item" :style="getLastBookStyle(index)" @click.prevent.stop="openBookList(book.id)">
					<img v-lazy="book.src">
				</li>
			</ul>
		</section>
		<!-- 底部 -->
		<section class="bottom-bg">
			<img :src="bottomBgSrc">
		</section>
	</div>
</template>

<script>
	// 阿里云图片压缩后缀
	let imgBaseCompressPostfix = '?x-oss-process=image/resize,w_100'
	let giftList = [{
		src: require('../../../../static/imgs/double-eleven/gift_1.jpg') + imgBaseCompressPostfix
	}, {
		src: require('../../../../static/imgs/double-eleven/gift_2.jpg') + imgBaseCompressPostfix
	}, {
		src: require('../../../../static/imgs/double-eleven/gift_3.jpg') + imgBaseCompressPostfix
	}, {
		src: require('../../../../static/imgs/double-eleven/gift_4.jpg') + imgBaseCompressPostfix
	}]
	let bookLength = 25
	let idList = [
		'2555', '3001', '3134', '2396', '3041', '2397', '3043', '3033', '3053', '3009', '1794', '1792', '1797', '1804', '1787', '1791', '1789', '1805', '1801', '1799', '1807', '1808', '1798', '1788', '1800'
	]
	let bookList = []
	for (let i = 1; i < bookLength + 1; i++) {
		bookList.push({
			src: require('../../../../static/imgs/double-eleven/book_' + i + '.jpg') + imgBaseCompressPostfix,
			id: idList[i - 1]
		})
	}
	import { weiXinConfig } from '@/common/js/common'
	export default {
		data () {
			return {
				wrapWidth: window.innerWidth,
				winWidth: window.innerWidth,
				topHeight: window.innerWidth / 750 * 826 + 'px',
				topImg: require('../../../../static/imgs/double-eleven/top_bg.jpg') + imgBaseCompressPostfix,
				giftImgSrc: require('../../../../static/imgs/double-eleven/gift_img.jpg') + imgBaseCompressPostfix,
				indexTitleSrc: require('../../../../static/imgs/double-eleven/index_title.png') + imgBaseCompressPostfix,
				firstTitleSrc: require('../../../../static/imgs/double-eleven/first_title.png') + imgBaseCompressPostfix,
				secondTitleSrc: require('../../../../static/imgs/double-eleven/second_title.png') + imgBaseCompressPostfix,
				bottomBgSrc: require('../../../../static/imgs/double-eleven/bottom_bg.jpg') + imgBaseCompressPostfix,
				giftList: giftList,
				bookList: bookList
			}
		},
		computed: {
			topStyleObj () {
				return {
					backgroundImage: 'url(' + '../../../../static/imgs/double-eleven/top_bg.jpg' + ')',
					height: this.wrapWidth / 750 * 826 + 'px'
				}
			},
			topTransLate () {
				return 'translate(' + (window.innerWidth - this.wrapWidth) / 2 + 'px, 0)'
			}
		},
		created () {
			this.initWrapWidth()
			// addScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js')
			window.addEventListener('resize', () => {
				this.initWrapWidth()
			})
		},
		mounted () {
			this.weiXinShare()
		},
		methods: {
			// 初始化窗口
			initWrapWidth () {
				this.wrapWidth = window.innerWidth
				if (this.wrapWidth > 425) {
					this.wrapWidth = 425
				}
			},
			getLastBookStyle (index) {
				if (index + 1 !== this.bookList.length) {
					return
				}
				if (index % 2 === 0) {
					return {
						marginLeft: '25%'
					}
				}
			},
			openBookList (id) {
				// this.Dialog.alert({
				// 	title: '温馨提示',
				// 	msg: '双十一活动已结束<br>敬请期待双十二...'
				// })
				this.$router.push({
					path: '/periodical/double-eleven',
					query: {
						id: id
					}
				})
			},
			weiXinShare () {
				weiXinConfig({
					title: '双十一活动',
					desc: '这是微校网双十一活动',
					imgUrl: 'https://m.51weixiao.com/static/imgs/share_logo.png'
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>