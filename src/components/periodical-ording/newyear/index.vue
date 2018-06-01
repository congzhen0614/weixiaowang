<template>
	<div class="new_year_page" :style="{ width: wrapWidth + 'px', transform: topTransLate }">
		<!-- 头部 -->
		<section class="new_year_top" :style="topStyleObj">
			<div class="top_image" :style="{ width: topImageWidth }">
				<img :src="topImageSrc">
			</div>
			<div class="top_title" :style="topTitleStyle" @click="openBookList('49')">
				<img :src="topGoSrc" :style="topGoStyle">
			</div>
			<div class="top_time" :style="topTimeStyle"></div>
			<div class="top_left_img" :style="{ width: topLeftWidth }">
				<img :src="topLeftImgSrc">
			</div>
			<div class="top_right_img" :style="{ width: topRightWidth }">
				<img :src="topRightImgSrc">
			</div>
		</section>
		<!-- 赠品 -->
		<section class="new_year_gift" :style="giftStyle">
			<div class="gift_title" :style="giftTitleStyle"></div>
			<div class="gift_desc" :style="giftDescStyle"></div>
			<div class="gift_image" :style="giftImageStyle"></div>
		</section>
		<!-- 福袋 -->
		<section class="new_year_lucky" :style="luckyStyle">
			<div class="lucky_image" :style="luckyImageStyle">
				<div class="lucky_text" :style="luckyTextStyle"></div>
			</div>
		</section>
		<!-- 回馈 -->
		<section class="new_year_feedback" :style="feedbackStyle">
			<div class="feedback_title" :style="feedbackTitleStyle"></div>
			<div class="feedback_desc" :style="feedbackDescStyle"></div>
			<div class="feedback_header" :style="feedbackHeaderStyle"></div>
			<div class="feedback_body" :style="feedbackBodyStyle"></div>
			<div class="feedback_footer" :style="feedbackFooterStyle"></div>
		</section>
		<!-- 列表导航 -->
		<section class="newyear_nav_box" :style="navBoxStyle">
			<section class="twelve_nav_list" :style="{ backgroundImage: 'url(' + navBgSrc + ')', width: navWidth, height: navHeight, paddingTop: navPaddingTop }">
				<ul class="nav_left_list">
					<li v-for="(item, index) in navLeftList" :style="{ width: navItemWidth, marginTop: navItemMarginTop }" class="nav_item" @click="openBookList(item.id)">
						<img v-lazy="item.logo">
					</li>
				</ul>
				<div class="nav_center_line" :style="{ width: navLineWidth }">
					<img :src="navCenterLineSrc">
				</div>
				<ul class="nav_right_list">
					<li v-for="(item, index) in navRightList" :style="{ width: navItemWidth, marginTop: navItemMarginTop }" class="nav_item" @click="openBookList(item.id)">
						<img :style="{ marginTop: index === navRightList.length - 1 ? lastItemMarginTop : '' }" v-lazy="item.logo">
					</li>
				</ul>
			</section>
			<div class="nav_footer" :style="navFooterStyle"></div>
		</section>
		<!-- 底部元素 -->
		<section class="download_btn" :style="downloadStyle" @click="openApp()"></section>
		<section class="reminder_text" :style="reminderTextStyle"></section>
		<!-- 打开app -->
		<v-link style="display: none" ref="link"></v-link>
	</div>
</template>

<script>
	import link from '@/components/common/link/link.vue'
	// 缩放比率
	let resize = window.innerWidth / 750
	// 所有导航
	let navList = ['49', '51', '46', '29', '28', '34', '35', '14', '24', '21', '50', '']
	// 导航左侧列表
	let navLeftList = []
	// 导航右侧列表
	let navRightList = []
	for (let i = 0; i < navList.length - 1; i += 2) {
		navLeftList.push({
			logo: require('../../../../static/imgs/newyear/type_' + i + '.png'),
			id: navList[i]
		})
		navRightList.push({
			logo: require('../../../../static/imgs/newyear/type_' + parseInt(i + 1) + '.png'),
			id: navList[i + 1]
		})
	}
	export default {
		data () {
			return {
				// 外壳宽度
				wrapWidth: window.innerWidth,
				// 左侧列表
				navLeftList: navLeftList,
				// 右侧列表
				navRightList: navRightList,
				// 导航中间线
				navCenterLineSrc: require('../../../../static/imgs/newyear/nav_center_line.png'),
				// 顶部图片
				topImageSrc: require('../../../../static/imgs/newyear/top_image.png'),
				// 顶部图片宽度
				topImageWidth: resize * 604 + 'px',
				// 顶部标题
				topTitleStyle: {
					margin: resize * 0 + 'px auto',
					width: resize * 580 + 'px',
					height: resize * 100 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/top_title.png)',
					backgroundSize: '100% 100%',
					position: 'relative'
				},
				// 顶部 go
				topGoSrc: require('../../../../static/imgs/newyear/top_go.png'),
				topGoStyle: {
					position: 'absolute',
					width: resize * 108 + 'px',
					height: resize * 108 + 'px',
					right: -resize * 20 + 'px',
					bottom: resize * 26 + 'px'
				},
				// 顶部时间
				topTimeStyle: {
					margin: resize * 20 + 'px auto',
					width: resize * 566 + 'px',
					height: resize * 38 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/top_time.png)',
					backgroundSize: '100% 100%'
				},
				topLeftImgSrc: require('../../../../static/imgs/newyear/top_bg_left.png'),
				topLeftWidth: resize * 300 + 'px',
				topRightImgSrc: require('../../../../static/imgs/newyear/top_bg_right.png'),
				topRightWidth: resize * 300 + 'px',
				// 赠品专区
				giftStyle: {
					margin: resize * 50 + 'px auto 0',
					width: resize * 646 + 'px',
					height: resize * 1036 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/gift_bg.png)',
					backgroundSize: '100% 100%',
					paddingTop: resize * 80 + 'px'
				},
				// 赠品标题
				giftTitleStyle: {
					margin: resize * 0 + 'px auto',
					width: resize * 338 + 'px',
					height: resize * 132 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/gift_title.png)',
					backgroundSize: '100% 100%'
				},
				// 赠品描述
				giftDescStyle: {
					margin: resize * 10 + 'px auto',
					width: resize * 550 + 'px',
					height: resize * 200 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/gift_desc.png)',
					backgroundSize: '100% 100%'
				},
				// 赠品图片
				giftImageStyle: {
					margin: resize * 10 + 'px auto',
					width: resize * 560 + 'px',
					height: resize * 560 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/gift_image.jpg)',
					backgroundSize: '100% 100%'
				},
				// 福袋专区
				luckyStyle: {
					margin: resize * 135 + 'px auto 0',
					width: resize * 750 + 'px',
					height: resize * 1516 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/lucky_bg.jpg)',
					backgroundSize: '100% 100%',
					paddingTop: resize * 10 + 'px'
				},
				// 福袋图片
				luckyImageStyle: {
					margin: resize * 150 + 'px auto',
					width: resize * 670 + 'px',
					height: resize * 1127 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/lucky_image.png)',
					backgroundSize: '100% 100%',
					position: 'relative'
				},
				// 福袋文字
				luckyTextStyle: {
					position: 'absolute',
					zIndex: '3',
					width: resize * 369 + 'px',
					height: resize * 151 + 'px',
					bottom: resize * 189 + 'px',
					left: resize * 153 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/lucky_text.png)',
					backgroundSize: '100% 100%'
				},
				// 反馈专区
				feedbackStyle: {
					margin: resize * -52 + 'px auto 0',
					width: resize * 750 + 'px',
					height: resize * 2610 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_bg.png)',
					backgroundSize: '100% 100%',
					paddingTop: resize * 150 + 'px'
				},
				// 反馈标题
				feedbackTitleStyle: {
					margin: resize * 0 + 'px auto 0',
					width: resize * 648 + 'px',
					height: resize * 157 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_title.png)',
					backgroundSize: '100% 100%'
				},
				// 反馈描述
				feedbackDescStyle: {
					margin: resize * 60 + 'px auto 0',
					width: resize * 648 + 'px',
					height: resize * 262 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_desc.png)',
					backgroundSize: '100% 100%'
				},
				// 反馈头部
				feedbackHeaderStyle: {
					margin: resize * 40 + 'px auto 0',
					width: resize * 423 + 'px',
					height: resize * 423 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_header.png)',
					backgroundSize: '100% 100%'
				},
				// 反馈内容
				feedbackBodyStyle: {
					margin: resize * 0 + 'px auto 0',
					width: resize * 503 + 'px',
					height: resize * 1353 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_body.png)',
					backgroundSize: '100% 100%'
				},
				// 反馈底部
				feedbackFooterStyle: {
					margin: resize * 0 + 'px auto 0',
					width: resize * 223 + 'px',
					height: resize * 223 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/feedback_footer.png)',
					backgroundSize: '100% 100%',
					marginTop: resize * -100 + 'px'
				},
				// 导航底部
				navBoxStyle: {
					width: '100%',
					backgroundColor: '#8ce5da',
					paddingTop: resize * 200 + 'px'
				},
				// 导航底部
				navFooterStyle: {
					margin: resize * 190 + 'px auto 0',
					width: resize * 750 + 'px',
					height: resize * 179 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/footer_bg.png)',
					backgroundSize: '100% 100%'
				},
				// 下载按钮
				downloadStyle: {
					margin: resize * 60 + 'px auto 0',
					width: resize * 327 + 'px',
					height: resize * 107 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/download_btn.png)',
					backgroundSize: '100% 100%'
				},
				// 提示
				reminderTextStyle: {
					margin: resize * 90 + 'px auto 60px',
					width: resize * 627 + 'px',
					height: resize * 268 + 'px',
					backgroundImage: 'url(../../../../static/imgs/newyear/reminder_text.png)',
					backgroundSize: '100% 100%'
				},
				// 列表背景
				navBgSrc: require('../../../../static/imgs/newyear/order_bg.png'),
				// 上padding
				navPaddingTop: resize * 278.5 + 'px',
				// 列表宽度
				navWidth: resize * 674 + 'px',
				navHeight: resize * 1112 + 'px',
				navItemWidth: resize * 180 + 'px',
				navItemMarginTop: resize * 50 + 'px',
				navLineWidth: resize * 52 + 'px',
				lastItemMarginTop: resize * 20 + 'px',
				// 打开app链接定位
				linkPosition: {
					bottom: 0
				}
			}
		},
		computed: {
			topStyleObj () {
				return {
					backgroundImage: 'url(' + '../../../../static/imgs/newyear/top_bg.gif' + ')',
					height: resize * 900 + 'px',
					paddingTop: resize * 248 + 'px'
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
				if (!itemTypeId) {
					return false
				}
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
			},
			// 打开 app
			openApp () {
				this.$refs.link.openApp()
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