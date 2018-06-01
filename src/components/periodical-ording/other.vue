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
			<router-view :tabIndex="tabIndex" :listData="listData" v-if="$route.meta.keepAlive" @changeTabIndex="changeTabIndex" :title="title" ref="home"></router-view>
		</keep-alive>
		<router-view :listData="listData" v-if="!$route.meta.keepAlive"></router-view>
		<v-shopcat v-if="shopcatShow" :entrance="'ording'" :nowSum="nowSum" :oldSum="oldSum" :total="total" :listData="listData" ref="shopcat" @addNum="addNum" @reduceNum="reduceNum" @clearShopcat="clearShopcat" @orderPay="orderPay"></v-shopcat>
	</div>
</template>

<script>
	import { getPrice, getNeedDataList, getDistinctArray } from '../../common/js/common.js'
	import about from './about/about'
	import shopcat from '../shopcat/shopcat'
	export default {
		name: 'periodical-ording',
		data () {
			return {
				title: '图书',
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
				// 下拉刷新
				this.$root.Bus.$on('refresh', () => {
					this.pageNum = 1
					// this.listData = []
					this.getData('refresh')
				})
				// 上拉加载
				this.$root.Bus.$on('infinite', () => {
					if (this.pageNum >= this.pages) {
						this.$refs.home.finishInfinite()
						this.$refs.home.hasNoData()
						return
					}
					this.pageNum += 1
					this.getData('infinite')
				})
			}
		},
		mounted () {
			this.getData()
			// 重置历史
			this.resetHistory()
			// 清空缓存
			localStorage.clear()
			// localStorage.setItem('userId', '100095')
		},
		components: {
			about,
			'v-shopcat': shopcat
		},
		methods: {
			// 获取数据
			getData (type) {
				// let pageNum = this.pageNum
				this.Toast.loading({
					title: '加载中...'
				})
				// this.$ajax.getAjax(`/book?itemIds=151,308,309,310&pageNum=${pageNum}&pageSize=5`)
				this.$ajax.getAjax('/book/open?itemIds=3245')
					.then(res => {
						// console.log(res)
						let list = res.data.pageInfo.list
						// 总页数
						this.pages = res.data.pageInfo.pages
						list.forEach((item, index) => {
							item.number = 0
							item.detail_img = []
						})
						this.listData = getDistinctArray(list, this.listData, 'id')
						// 如果存在类型
						if (type) {
							type === 'refresh' ? this.$refs.home.finishPullToRefresh() : this.$refs.home.finishInfinite()
						}
					}, err => {
						console.log(err)
					})
			},
			// 刷新
			refresh () {
				this.pageNo = 0
				this.getData()
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
						nowSum: this.nowSum
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
				let _href = encodeURIComponent(`${protocol}//${host}/periodical/order?selectedData=${selectedData}&cls=${cls}&nowSum=${nowSum}`)
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
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'	
</style>