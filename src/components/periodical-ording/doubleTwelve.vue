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
				<router-view class="child-page" :doubleEleven="doubleEleven" :tabIndex="tabIndex" :listData="listData" v-if="$route.meta.keepAlive" @changeTabIndex="changeTabIndex" :title="title" ref="home" @decrement="decrement" @increaseCart="increaseCart"></router-view>
			</transition>
		</keep-alive>
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
			<router-view class="child-page" :doubleEleven="doubleEleven" :title="title" :listData="listData" v-if="!$route.meta.keepAlive" @decrement="decrement" @increaseCart="increaseCart"></router-view>
		</transition>
		<v-shopcat v-if="shopcatShow" :entrance="'ording'" :nowSum="nowSum" :oldSum="oldSum" :total="total" ref="shopcat" @shopcatIncreaseCart="shopcatIncreaseCart" @shopcatDecrement="shopcatDecrement" @orderPay="orderPay"></v-shopcat>
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
				dropBalls: [],
				// 可加载更多
				loadMore: false,
				// 购物车列表
				shopcat: []
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
			},
			// 传参
			params () {
				let params = {}
				if (this.$route.query.itemTypeId) {
					params.itemTypes = [this.$route.query.itemTypeId]
				}
				if (this.$route.query.itemIds) {
					params.itemIds = this.$route.query.itemIds
				}
				params.pageNum = this.pageNum
				return params
			},
			// id 数组
			listDataIds () {
				return this.listData.map(item => {
					return item.id
				})
			}
		},
		beforeRouteUpdate (to, from, next) {
			this.pageNum = 1
			// 如果是去列表页，则通知刷新
			next(vm => {
				console.log(this.$refs.home)
				if (to.path === '/periodical/double-twelve') {
					// 滚动到原来的位置
					this.$refs.home.backToLastTop()
				}
			})
		},
		watch: {
			listData (newVal, oldVal) {
				console.log(this.shopcat)
				// 填充购物车数据
				newVal.forEach(item => {
					console.log(this.fillShopcatNum(item.id, this.shopcat))
					item.number = this.fillShopcatNum(item.id, this.shopcat)
				})
			}
		},
		created () {
			// 获取购物车
			this.getLocalShopcat()
			// 加载数据
			this.loadData()
			// 监听加载更多
			this.$root.Bus.$on('loadMoreData', (val, event) => {
				if (this.pageNum < this.pages) {
					this.pageNum += 1
					// 加载数据
					this.$nextTick(() => {
						this.loadData()
					})
				}
			})
		},
		mounted () {
			// 重置历史
			this.resetHistory()
			// 清空缓存
			// localStorage.clear()
		},
		components: {
			'v-shopcat': shopcat
		},
		methods: {
			// 获取数据
			loadData (type) {
				this.Toast.loading({
					title: '加载中...'
				})
				this.$ajax.bookList(this.params).then(res => {
					let list = res.data.pageInfo.list
					// 总页数
					this.pages = res.data.pageInfo.pages
					if (list && list.length) {
						list.forEach((item, index) => {
							item.number = 0
							item.detail_img = []
						})
						this.listData = getDistinctArray(list, this.listData, 'id')
						this.$nextTick(() => {
							if (this.$route.path === '/periodical/double-twelve') {
								setTimeout(() => {
									// console.log('loadData')
									this.$refs.home.initBetterScroll()
								}, 20)
							}
						})
					}
				}, err => {
					console.log(err)
				})
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
			increaseCart (index, event) {
				console.log('addNum')
				this.listData[index].number += 1
				// 更改本地购物车
				this.$refs.shopcat.addShopcat(this.listData[index], 1)
				console.log(this.$refs.shopcat.shopcat1)
				// this.$root.Bus.$emit('changeShopcat', this.listData[index], 1)
				// 动画
				if (event) {
					this.incrementTotal(event.target)
				}
			},
			// 减少
			decrement (index) {
				console.log('number: ' + this.listData[index].number)
				if (this.listData[index].number <= 0) {
					return
				}
				this.listData[index].number -= 1
				// 更改本地购物车
				this.$refs.shopcat.reduceShopcat(this.listData[index], -1)
				// this.$root.Bus.$emit('changeShopcat', this.listData[index], -1)
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
				// 跳转到下单页面
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
			// 购物车动画过程
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
			// 购物车动画结束
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
			},
			// 购物车增加
			shopcatIncreaseCart (id) {
				if (this.listDataIds.indexOf(id) > -1) {
					this.listData[this.listDataIds.indexOf(id)].number += 1
				}
			},
			// 购物车减少
			shopcatDecrement (id) {
				if (this.listDataIds.indexOf(id) > -1) {
					this.listData[this.listDataIds.indexOf(id)].number -= 1
				}
			},
			// 获取购物车数据
			getLocalShopcat () {
				if (localStorage.getItem('shopcatList') && localStorage.getItem('shopcatList').length) {
					this.shopcat = JSON.parse(localStorage.getItem('shopcatList'))
				}
				console.log(this.shopcat)
			},
			// 为列表填充购车数据
			fillShopcatNum (id, shopcat) {
				let number = 0
				shopcat.forEach(item => {
					if (item.id === id) {
						number = item.number
					}
				})
				return number
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'	
</style>