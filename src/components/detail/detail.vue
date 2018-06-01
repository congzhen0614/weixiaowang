<template>
	<div class="detail">
		<v-header :book="true" v-if="!isMobile"></v-header>
		<v-content :sales="sales" :title="title">
			<div slot="desc" class="desc">
				<div class="hard-cover">
					<img src="./hard_cover.png">
				</div>
				<div class="age">
					适读年龄:3至6岁儿童
				</div>
				<div class="now-price">
					<label class="label">现价:</label>
					<span class="price">￥248.00</span>
				</div>
				<div class="old-price">
					<label class="label">原价:</label>
					<span class="price">￥253.00</span>
					<span class="discount">7.5折</span>
				</div>
				<div class="activity">
					<div class="img">
						<img src="./subtract_icon.png">
					</div>
					<div class="desc">五一特惠活动满100元减10元</div>
				</div>
			</div>
		</v-content>
		<div class="tab">
			<div class="product" :class="{ active: tabIndex === 0 }" @click="changeTabIndex(0)">
				商品详情
			</div>
			<div class="sales" :class="{ active: tabIndex === 1 }" @click="changeTabIndex(1)">
				销量和评价
			</div>
		</div>
		<component :is="tabView"></component>
		<v-recommond></v-recommond>
		<v-shopcat></v-shopcat>
	</div>
</template>

<script>
	import header from '../header/header'
	import contents from './content/content'
	import recommond from '../common/recommond/recommond'
	import shopcat from '../shopcat/shopcat'
	import product from './product/product'
	import sales from './sales/sales'
	let u = navigator.userAgent
	let isMobile = !u.match(/AppleWebKit.*Mobile.*/)

	export default {
		name: 'detail',
		data () {
			return {
				subtractIcon: 'subtract_icon.png',
				hardCoverSrc: 'hard_cover.png',
				tabIndex: 0,
				sales: 5000, // 销量
				title: '商品内容',
				tabList: ['product', 'sales'],
				isMobile: isMobile
			}
		},
		computed: {
			tabView () {
				return this.tabList[this.tabIndex]
			}
		},
		mounted () {
			// let getCookie = document.cookie.replace(/[ ]/g, '')
			console.log(document.cookie)
		},
		components: {
			'v-header': header,
			'v-content': contents,
			'v-recommond': recommond,
			sales,
			product,
			'v-shopcat': shopcat
		},
		methods: {
			changeTabIndex (index) {
				this.tabIndex = index
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.detail
		width 100%
		.tab
			display: flex
			width: 100%
			text-align: center
			> div
				flex: 1
				line-height: 0.8rem
				font-size: 0.28rem
				color: #323232
				border-bottom: 1px solid #d6d6d6
			.active
				border-bottom: 1px solid #eb6900	
				color: #eb6900	
</style>