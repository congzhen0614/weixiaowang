<template>
	<div class="periodical-ording">
		<!-- 购物球 -->
		<div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
		<keep-alive>
			<transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
				<router-view class="child-page" :doubleEleven="doubleEleven" :tabIndex="tabIndex" :listData="listData" v-if="$route.meta.keepAlive" @changeTabIndex="changeTabIndex" :title="title" ref="home"></router-view>
			</transition>
		</keep-alive>
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
			<router-view class="child-page" :doubleEleven="doubleEleven" :listData="listData" v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<v-shopcat v-if="shopcatShow" :entrance="'ording'" :nowSum="nowSum" :oldSum="oldSum" :total="total" :listData="listData" ref="shopcat" @addNum="addNum" @reduceNum="reduceNum" @clearShopcat="clearShopcat" @orderPay="orderPay"></v-shopcat>
		<!-- 滑到顶部按钮 -->
		<section class="other-buttons">
			<img :src="serviceIconSrc" @click="showService()">
		</section>
		<!-- 遮罩层 -->
		<section v-if="maskShow" class="mask" @click="cancelService()">
			<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
				<div v-if="showServiceBox" class="bottom-box">
					<p>联系客服</p>
					<p>400-847-0068</p>
					<p>工作时间：周一至周五早10点至晚5点</p>
					<div class="call-bar bar" @click.stop="doCall()">拨打电话<a ref="tel" href="tel:4008470068"></a></div>
					<div class="cancel-bar bar" @click="cancelService()">取消</div>
				</div>
			</transition>
		</section>
	</div>
</template>

<script>
	import { getPrice, getNeedDataList, getDistinctArray } from '../../common/js/common.js'
	import shopcat from '../shopcat/shopcat'
	export default {
		name: 'periodical-ording',
		data () {
			return {
				serviceIconSrc: require('@/common/icons/service_icon.png'),
				maskShow: false,
				showServiceBox: false,
				title: '双十一',
				doubleEleven: true,
				tabIndex: 0,
				listData: [],
				// 第几页
				pageNum: 1,
				// 总页数
				pages: 1,
				// 加入购物车动画的球
				balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
				dropBalls: []
			}
		},
		computed: {
			// 是否显示购物车
			shopcatShow () {
				return !this.tabIndex
			},
			// 总价
			nowSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * getPrice(item.last_fee)
				})
				return sum.toFixed(1)
			},
			// 原价
			oldSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * getPrice(item.original_fee)
				})
				return sum
			},
			// 总数
			total () {
				let total = 0
				this.listData.forEach((item, index) => {
					total += item.number
				})
				return total
			},
			// 已选择
			selectedData () {
				let originData = this.listData.filter((item) => {
					return item.number > 0
				})
				return getNeedDataList(originData, ['name', 'last_fee', 'number', 'logo', 'id'])
			}
		},
		created () {
			if (!this.selectedData.length) {
				this.$root.Bus.$on('increment', (index, event) => {
					this.addNum(index, event)
				})
				this.$root.Bus.$on('decrement', (index) => {
					this.reduceNum(index)
				})
			}
		},
		mounted () {
			this.getData()
			// 重置历史
			this.resetHistory()
			// 清空缓存
			localStorage.clear()
		},
		components: {
			'v-shopcat': shopcat
		},
		methods: {
			// 获取数据
			getData (type) {
				this.Toast.loading({
					title: '加载中...'
				})
				// 测试服务器
				// let itemIds = '151,204,227,276,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325'
				// 正式服务器
				let itemIds = '2555,3001,3134,2396,3041,2397,3043,3033,3053,3009,1794,1792,1797,1804,1787,1791,1789,1805,1801,1799,1807,1808,1798,1788,1800'
				this.$ajax.getAjax(`/book/open?itemIds=${itemIds}&pageNum=1&pageSize=25`)
					.then(res => {
						let list = res.data.pageInfo.list
						// 总页数
						this.pages = res.data.pageInfo.pages
						list.forEach((item, index) => {
							item.number = 0
							item.detail_img = []
						})
						this.listData = getDistinctArray(list, this.listData, 'id')
						this.$nextTick(() => {
							setTimeout(() => {
								this.$root.Bus.$emit('initListScroll')
							}, 20)
						})
					}, err => {
						console.log(err)
					})
			},
			// 加载更多
			loadMore () {
				this.pageNo += 1
				this.getData()
			},
			// 切换显示
			changeTabIndex (index) {
				this.tabIndex = index
			},
			// 购物车动画
			incrementTotal (target) {
				// this.$refs.shopcat.drop(target)
				this.drop(target)
			},
			// 添加
			addNum (index, event) {
				this.listData[index].number += 1
				if (event) {
					this.incrementTotal(event.target)
				}
			},
			// 减少
			reduceNum (index) {
				if (this.listData[index].number <= 0) {
					return
				}
				this.listData[index].number -= 1
			},
			// 清空购物城
			clearShopcat () {
				this.listData.forEach((item) => {
					item.number = 0
				})
			},
			// 去结算
			orderPay () {
				if (!this.total) {
					this.Toast.warning({
						title: '请先选择图书'
					})
					return
				}
				if (!this.configLogin()) {
					return false
				}
				this.$router.push({
					path: '/periodical/order',
					query: {
						selectedData: JSON.stringify(this.selectedData),
						nowSum: this.nowSum,
						entrance: 'doubleEleven'
					}
				})
			},
			// 判断登陆
			configLogin () {
				if (!localStorage.getItem('userId')) {
					if (this.isWeixin) {
						this.weixinLogin()
						return false
					}
					// 提示
					this.Toast.warning({
						title: '请先登录！'
					})
					this.$router.push({
						path: '/login',
						query: {
							href: location.href
						}
					})
					return false
				}
				return true
			},
			// 微信登陆
			weixinLogin () {
				let selectedData = JSON.stringify(this.selectedData)
				let cls = '2'
				let protocol = location.protocol
				let host = location.host
				let nowSum = this.nowSum
				let entrance = 'doubleEleven'
				let _href = encodeURIComponent(`${protocol}//${host}/periodical/order?entrance=${entrance}&selectedData=${selectedData}&cls=${cls}&nowSum=${nowSum}`)
				let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
				let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
				let appId = 'wx701b0e6e6faac47c'
				let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
				window.location.href = _url
			},
			// 重置历史记录
			resetHistory () {
				localStorage.setItem('historyLength', 0)
			},
			// 下降
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if (!ball.show) {
						ball.show = true
						ball.el = el
						this.dropBalls.push(ball)
						return
					}
				}
			},
			// 加入购物车动画之前
			beforeEnter (el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 36)
						el.style.display = ''
						el.style.transform = `translate3d(0,${y}px,0)`
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.transform = `translate3d(${x}px,0,0)`
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
					}
				}
			},
			enter (el) {
				this.$nextTick(() => {
					setTimeout(() => {
						el.style.transform = 'translate3d(0,0,0)'
						el.style.webkitTransform = 'translate3d(0,0,0)'
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.transform = `translate3d(0,0,0)`
						inner.style.webkitTransform = `translate3d(0,0,0)`
					}, 5)
				})
			},
			afterEnter (el) {
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			},
			// 联系客服
			showService () {
				this.maskShow = true
				setTimeout(() => {
					this.showServiceBox = true
				}, 10)
			},
			// 取消
			cancelService () {
				this.showServiceBox = false
				setTimeout(() => {
					this.maskShow = false
				}, 150)
			},
			// 拨打电话
			doCall () {
				this.$refs.tel.click()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'	
</style>