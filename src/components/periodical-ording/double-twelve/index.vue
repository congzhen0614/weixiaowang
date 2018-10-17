<template>
	<div class="double_twelve_page" :style="{ width: wrapWidth + 'px', transform: topTransLate }">
		<!-- <v-link></v-link> -->
		<!-- 头部 -->
		<section class="twelve_page_top" :style="topStyleObj">
			<!-- 标题 -->
			<div class="top_main_title" :style="{ width: discountTitleWidth, paddingTop: discountTitleTop }">
				<img :src="discountTitleSrc">
			</div>
			<!-- 右下角图片 -->
			<div class="top_right_corner" :style="{ width: rightCornerWidth }">
				<img :src="rightCornerSrc">
			</div>
		</section>
		<!-- 套餐部分 -->
		<section class="twelve_package_part">
			<!-- 幼儿园套餐 -->
			<ul class="kinder_garten_list">
				<li class="kinder_garten_item" v-for="(item, index) in kinderList" @click="openItem(item.id)">
					<img v-lazy="item.logo">
				</li>
			</ul>
			<!-- 小学套餐 -->
			<ul class="primary_package_list">
				<li class="primary_package_item" v-for="(item, index) in primaryList" @click="openItem(item.id)">
					<img v-lazy="item.logo">
				</li>
			</ul>
		</section>
		<!-- 特价部分 -->
		<section class="twelve_special_part">
			<!-- 特价顶部 -->
			<div class="special_top_part">
				<img :src="specialTopSrc">
			</div>
			<div class="special_main_part" :style="{ height: specialMainHeight }">
				<div class="special_main_left" :style="{ width: specialLeftWidth, height: specialLeftHeight, backgroundImage: 'url(' + specialImgSrc + ')' }">
					<!-- <img v-lazy="specialImgSrc"> -->
				</div>
				<div class="special_main_right">
					<div class="special_desc_top">
						<img :src="specialDescSrc">
					</div>
					<div class="special_buy_btn" @click="openBookList('51')">
						<img :src="specialBuyBtn" :style="{ width: specialBtnWidth }">
					</div>
					<div class="special_right_line">
						<img :src="specialLineSrc">
					</div>
					<div class="special_want_more">
						<img :src="wantMoreSrc">
					</div>
					<div class="special_buy_btn" @click="openItem('3102,3103')">
						<img :src="specialBuyBtn" :style="{ width: specialBtnWidth }">
					</div>
				</div>
			</div>
			<!-- 特价底部 -->
			<div class="special_bottom_part">
				<img :src="specialBottomSrc">
			</div>
		</section>
		<!-- 列表导航 -->
		<section class="twelve_nav_list">
			<ul class="nav_left_list">
				<li v-for="(item, index) in navLeftList" class="nav_item" @click="openBookList(item.id)">
					<img v-lazy="item.logo">
				</li>
			</ul>
			<div class="nav_center_line">
				<img :src="navCenterLineSrc">
			</div>
			<ul class="nav_right_list">
				<li v-for="(item, index) in navRightList" class="nav_item" @click="openBookList(item.id)">
					<img v-lazy="item.logo">
				</li>
			</ul>
		</section>
		<!-- 页面底部 -->
		<section class="twelve_page_bottom">
			<img :src="pageBottomSrc">
		</section>
	</div>
</template>

<script>
	import { weiXinConfig } from '@/common/js/common'
	import link from '@/components/common/link/link'
	// 幼儿园数组
	let kinderList = [{
		logo: require('../../../../static/imgs/double-twelve/kindergarten_1.jpg'),
		id: '3492'
	}, {
		logo: require('../../../../static/imgs/double-twelve/kindergarten_2.jpg'),
		id: '3493'
	}]
	// 小学套餐
	let primaryList = [{
		logo: require('../../../../static/imgs/double-twelve/primary_1.jpg'),
		id: '3497'
	}, {
		logo: require('../../../../static/imgs/double-twelve/primary_2.jpg'),
		id: '3499'
	}]
	// 所有导航
	let navList = ['49', '51', '46', '29', '28', '34', '35', '14', '24', '21']
	// 导航左侧列表
	let navLeftList = []
	// 导航右侧列表
	let navRightList = []
	for (let i = 0; i < navList.length - 1; i += 2) {
		navLeftList.push({
			logo: require('../../../../static/imgs/double-twelve/type_' + i + '.png'),
			id: navList[i]
		})
		navRightList.push({
			logo: require('../../../../static/imgs/double-twelve/type_' + parseInt(i + 1) + '.png'),
			id: navList[i + 1]
		})
	}
	// 缩放比率
	let resize = window.innerWidth / 750
	export default {
		data () {
			return {
				// 外壳宽度
				wrapWidth: window.innerWidth,
				winWidth: window.innerWidth,
				// 折扣标题图片
				discountTitleSrc: require('../../../../static/imgs/double-twelve/discount_title.png'),
				// 宽度
				discountTitleWidth: resize * 557 + 'px',
				// 高
				discountTitleTop: resize * 725 + 'px',
				// 右侧图片
				rightCornerSrc: require('../../../../static/imgs/double-twelve/right_corner.png'),
				// 宽度
				rightCornerWidth: resize * 200 + 'px',
				// 幼儿园套餐
				kinderList: kinderList,
				// 小学套餐
				primaryList: primaryList,
				// 特价头部
				specialTopSrc: require('../../../../static/imgs/double-twelve/special_top_bg.png'),
				// 特价底部
				specialBottomSrc: require('../../../../static/imgs/double-twelve/special_bottom_bg.png'),
				// 特价内容部分
				specialMainHeight: resize * 691 + 'px',
				// 特价左侧宽度
				specialLeftWidth: resize * 330 + 'px',
				// 特价左侧高度
				specialLeftHeight: resize * 470 + 'px',
				// 特价图片
				specialImgSrc: 'http://www.res.51weixiao.com/upload/item_detail/1793/imgs/02c07f94ac3341f2bfb01e7a564df39e.jpg',
				// 特价描述
				specialDescSrc: require('../../../../static/imgs/double-twelve/special_desc.png'),
				// 特价购买按钮
				specialBuyBtn: require('../../../../static/imgs/double-twelve/special_buy_btn.png'),
				// 想要更多
				wantMoreSrc: require('../../../../static/imgs/double-twelve/want_more.png'),
				// 按钮宽度
				specialBtnWidth: resize * 140 + 'px',
				// 特价线
				specialLineSrc: require('../../../../static/imgs/double-twelve/special_right_line.png'),
				// 页面底部
				pageBottomSrc: require('../../../../static/imgs/double-twelve/page_bottom.png'),
				// 左侧列表
				navLeftList: navLeftList,
				// 右侧列表
				navRightList: navRightList,
				// 导航中间线
				navCenterLineSrc: require('../../../../static/imgs/double-twelve/nav_center_line.png'),
				// 打开app链接定位
				linkPosition: {
					bottom: 0
				}
			}
		},
		computed: {
			topStyleObj () {
				return {
					backgroundImage: 'url(' + '../../../../static/imgs/double-twelve/top_bg.jpg' + ')',
					height: this.wrapWidth / 750 * 1150 + 'px'
				}
			},
			topTransLate () {
				return 'translate(' + (window.innerWidth - this.wrapWidth) / 2 + 'px, 0)'
			}
		},
		created () {
			// 初始化宽度
			this.initWrapWidth()
			// addScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js')
			// 屏幕变化
			window.addEventListener('resize', () => {
				this.initWrapWidth()
			})
			// 保存活动页 path
			localStorage.setItem('activityPage', this.$route.path)
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
			// 打开图书列表
			openBookList (itemTypeId) {
				if (!this.configLogin('itemTypeId', itemTypeId)) {
					return false
				}
				this.$router.push({
					path: '/book/search',
					query: {
						itemTypeId: itemTypeId
					}
				})
			},
			// 打开单本图书
			openItem (itemIds) {
				if (!this.configLogin('itemIds', itemIds)) {
					return false
				}
				this.$router.push({
					path: '/book/search',
					query: {
						itemIds: itemIds
					}
				})
			},
			weiXinShare () {
				weiXinConfig({
					title: '双十一活动',
					desc: '这是微校网双十一活动',
					imgUrl: 'https://m.51weixiao.com/static/imgs/share_logo.png'
				})
			},
			// 判断登陆
			configLogin (type, val) {
				if (!localStorage.getItem('userId')) {
					if (this.isWeixin) {
						this.weixinLogin(type, val)
						return false
					}
				}
				return true
			},
			// 微信登陆
			weixinLogin (type, val) {
				let protocol = location.protocol
				let host = location.host
				let _href = encodeURIComponent(`${protocol}//${host}/book/search?${type}=${val}`)
				let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
				let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
				let appId = 'wx701b0e6e6faac47c'
				let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
				window.location.href = _url
			}
		},
		components: {
			'v-link': link
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>
