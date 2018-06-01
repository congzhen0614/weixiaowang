<template>
	<section class="shopcat-main" :style="{ minHeight: windowHeight }">
		<empty v-if="!userId" :text="'您暂时还未登录哦！'"></empty>
		<section v-if="goHomePageShow" class="no-data-box">
			<img src="./shopcat_empty.png">
		</section>
		<div v-if="!userId" class="login-box">
			<button @click.prevent.stop="goLogin()">去登录</button>
		</div>
		<div v-if="goHomePageShow" class="login-box">
			<button @click.prevent.stop="goHomePage()">去逛逛</button>
		</div>
		<!-- 悬浮层 -->
		<p class="fixed-title">商品实付金额满99元包邮！</p>
		<section v-if="periodicalList.length || goodsList.length" class="wrapper" ref="wrapper" :style="{ height: winHeight }">
			<div ref="content" class="content">
				<!-- 报刊杂志 -->
				<section v-if="periodicalList.length" class="periodical-part">
					<div class="content-header">
						<div class="check-box" @click.prevent.stop="selectAllperiodicalItems()">
							<img v-if="periodicalAll" :src="checkActiveSrc">
							<img v-if="!periodicalAll" :src="checkSrc">
						</div>
						<p class="title">报刊杂志</p>
					</div>
					<ul class="shopcat-list">
						<transition-group enter-active-class="animated" leave-active-class="animated slideOutRight">
							<li v-for="(item, index) in periodicalList" :key="item.id" ref="periodicalItem" class="list-item" :class="{ deleteShow: index === periodicalDeleteIndex }" @click="resetDeleteIndex()">
								<div class="content">
									<div class="check-box" @click.prevent.stop="selectperiodicalItem(index)">
										<img v-if="item.active" :src="checkActiveSrc">
										<img v-if="!item.active" :src="checkSrc">
									</div>
									<div class="list-body">
										<div class="left-part">
											<img :src="item.logo">
										</div>
										<div class="right-part">
											<div class="periodical-detail">
												<p class="name">{{ item.name }}</p>
												<p class="price">
													<span class="small">¥</span>
													<span class="big">{{ item.last_fee | getInteger }}</span>
													<span class="small">{{ item.last_fee | getDecimal }}</span>
												</p>
												<!-- 控制器 -->
												<div class="cart-control">
													<div class="left-icon" @click.prevent.stop="changeNum('periodicalList', index, -1)">
														<img :src="reduceIconSrc">
													</div>
													<p class="num">{{ item.number }}</p>
													<div class="right-icon" @click.prevent.stop="changeNum('periodicalList', index, 1)">
														<img :src="addIconSrc">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 删除按钮 -->
								<div ref="deleteBox" class="delete-box" @click.prevent.stop="deleteperiodicalItem(item.id)">移除</div>
							</li>
						</transition-group>
					</ul>
				</section>
				<!-- 商品 -->
				<section v-if="goodsList.length" class="goods-part">
					<div class="content-header">
						<div class="check-box" @click.prevent.stop="selectAllGoodsItems()">
							<img v-if="goodsAll" :src="checkActiveSrc">
							<img v-if="!goodsAll" :src="checkSrc">
						</div>
						<p class="title">商品</p>
					</div>
					<ul class="shopcat-list">
						<transition-group enter-active-class="animated" leave-active-class="animated slideOutRight">
							<li v-for="(item, index) in goodsList" :key="item.id" ref="goodsItem" class="list-item" :class="{ deleteShow: index === goodsDeleteIndex }" @click="resetDeleteIndex()">
								<div class="content">
									<div class="check-box" @click.prevent.stop="selectGoodsItem(index)">
										<img v-if="item.active" :src="checkActiveSrc">
										<img v-if="!item.active" :src="checkSrc">
									</div>
									<div class="list-body">
										<div class="left-part">
											<img :src="item.logo">
										</div>
										<div class="right-part">
											<div class="periodical-detail">
												<p class="name">{{ item.name }}</p>
												<p class="price">
													<span class="small">¥</span>
													<span class="big">{{ item.last_fee | getInteger }}</span>
													<span class="small">{{ item.last_fee | getDecimal }}</span>
												</p>
												<!-- 控制器 -->
												<div class="cart-control">
													<div class="left-icon" @click.prevent.stop="changeNum('goodsList', index, -1)">
														<img :src="reduceIconSrc">
													</div>
													<p class="num">{{ item.number }}</p>
													<div class="right-icon" @click.prevent.stop="changeNum('goodsList', index, 1)">
														<img :src="addIconSrc">
													</div>
												</div>
											</div>
											<!-- 商品有积分 -->
											<!-- <div class="integral">
												<img src="./integral_icon.png">
												<span class="text">10积分=0.01元 最多可用200积分</span>
											</div> -->
										</div>
									</div>
								</div>
								<!-- 删除按钮 -->
								<div ref="deleteBox" class="delete-box" @click.prevent.stop="deleteGoodsItem(item.id)">移除</div>
							</li>
						</transition-group>
					</ul>
				</section>
			</div>
		</section>
		<!-- 购物车底部 -->
		<footer v-if="userId && (periodicalList.length || goodsList.length)" class="shopcat-footer" :class="{ homepage: entrance === 'homepage' }">
			<div class="left-foot">
				<div class="check-box" @click.prevent.stop="selectAllItems()">
					<img v-if="selectAll" :src="checkActiveSrc">
					<img v-if="!selectAll" :src="checkSrc">
				</div>
				<p class="select-text">全选</p>
				<div v-if="!canClear" class="price-info">
					<p class="result-price">
						<span class="small">合计:¥</span><span class="big">{{ totalResultPrice | getInteger }}</span><span class="small">{{ totalResultPrice | getDecimal }}</span>
					</p>
					<p class="other-price">
						<span class="origin-price">¥{{ totalOriginPrice | getInteger }}{{ totalOriginPrice | getDecimal }}</span>
						<span class="discount-price">优惠:¥{{ totalDiscountPrice |getInteger }}{{ totalDiscountPrice |getDecimal }}</span>
					</p>
				</div>
			</div>
			<div class="right-foot" @click.prevent.stop="goPay()">
				{{ footBtnText }}
			</div>
		</footer>
	</section>
</template>

<script>
	import empty from '@/components/common/empty/empty'
	import { hasClass } from '@/common/js/common'
	import BScroll from 'better-scroll'
	export default {
		name: 'shopcat',
		props: {
			entrance: {
				type: String
			},
			canClear: {
				type: Boolean
			}
		},
		data () {
			return {
				windowHeight: window.innerHeight + 'px',
				winHeight: window.innerHeight - 52 - 44 - 49 - 30 - 8 + 'px',
				// winHeight: window.innerHeight - 52 + 'px',
				userId: localStorage.getItem('userId'),
				periodicalList: [],
				goodsList: [],
				checkSrc: require('@/common/icons/check.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				reduceIconSrc: require('@/common/icons/reduce_icon.png'),
				addIconSrc: require('@/common/icons/add_icon.png'),
				periodicalDeleteIndex: -1,
				goodsDeleteIndex: -1,
				scrollTop: 0,
				scroller: ''
			}
		},
		computed: {
			// 显示去逛逛
			goHomePageShow () {
				if (this.periodicalList.length || this.goodsList.length || !this.userId) {
					return false
				} else {
					return true
				}
			},
			// 图书全选
			periodicalAll () {
				let flag = true
				this.periodicalList.forEach(item => {
					if (!item.active) {
						flag = false
					}
				})
				return flag
			},
			// 商品全选
			goodsAll () {
				let flag = true
				this.goodsList.forEach(item => {
					if (!item.active) {
						flag = false
					}
				})
				return flag
			},
			// 全选
			selectAll () {
				if (this.periodicalAll && this.goodsAll) {
					return true
				} else {
					return false
				}
			},
			// 原价总价
			totalOriginPrice () {
				let sum = 0
				this.periodicalList.forEach(item => {
					if (item.active) {
						sum += parseFloat(item.original_fee) * item.number
					}
				})
				this.goodsList.forEach(item => {
					if (item.active) {
						sum += parseFloat(item.original_fee) * item.number
					}
				})
				return sum
			},
			// 优惠总价
			totalDiscountPrice () {
				let sum = 0
				this.periodicalList.forEach(item => {
					if (item.active) {
						sum += (parseFloat(item.original_fee).toFixed(2) - parseFloat(item.last_fee)) * item.number.toFixed(2)
					}
				})
				this.goodsList.forEach(item => {
					if (item.active) {
						sum += (parseFloat(item.original_fee).toFixed(2) - parseFloat(item.last_fee)) * item.number.toFixed(2)
					}
				})
				return sum
			},
			// 总价
			totalResultPrice () {
				return parseFloat(this.totalOriginPrice).toFixed(2) - parseFloat(this.totalDiscountPrice).toFixed(2)
			},
			// 底部文字
			footBtnText () {
				let count = 0
				this.periodicalList.forEach(item => {
					if (item.active) {
						count += 1
					}
				})
				this.goodsList.forEach(item => {
					if (item.active) {
						count += 1
					}
				})
				if (!this.canClear) {
					return `去结算(${count})`
				} else {
					return `移除(${count})`
				}
			},
			// 有选中图书
			hasperiodicalSelected () {
				let flag = false
				this.periodicalList.forEach(item => {
					if (item.active) {
						flag = true
					}
				})
				return flag
			},
			// 有选中商品
			hasGoodsSelected () {
				let flag = false
				this.goodsList.forEach(item => {
					if (item.active) {
						flag = true
					}
				})
				return flag
			},
			// 图书已选
			periodicalSelectedData () {
				if (!this.periodicalList.length) {
					return []
				}
				return this.periodicalList.filter(item => {
					return item.active
				})
			},
			// 商品已选
			goodsSelectedData () {
				if (!this.goodsList.length) {
					return []
				}
				return this.goodsList.filter(item => {
					return item.active
				})
			}
		},
		created () {
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 去逛逛
			goHomePage () {
				if (this.entrance === 'homepage') {
					this.$root.Bus.$emit('goHangout')
				} else {
					// 判断是否为活动页
					this.$router.push({
						path: localStorage.getItem('activityPage') || '/'
					})
				}
			},
			// 初始化 scroller
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 监听滚动
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
					if (this.scrollTop < 0) {
						this.$nextTick(() => {
							this.initBetterScroll()
						})
					}
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						this.loadData()
					}
				})
			},
			// 监听滑动事件
			// 期刊
			listenperiodicalTouchEvent () {
				this.$refs.periodicalItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.periodicalDeleteIndex = -1
							}
							return false
						} else {
							this.periodicalDeleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.periodicalDeleteIndex = index
						}
					})
				})
			},
			// 监听滑动事件
			listenGoodsTouchEvent () {
				this.$refs.goodsItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.goodsDeleteIndex = -1
							}
							return false
						} else {
							this.goodsDeleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.goodsDeleteIndex = index
						}
					})
				})
			},
			// 获得行高
			getDeleteLineHeight () {
				if (this.$refs.deleteBox && this.$refs.deleteBox.length) {
					this.$refs.deleteBox.forEach(item => {
						item.style.lineHeight = item.offsetHeight + 'px'
					})
				}
			},
			// 去登录
			goLogin () {
				if (!this.$ajax.configLogin(this)) {
					return false
				}
			},
			// 加载数据
			loadData () {
				// 杂志
				this.periodicalList = this.periodicalList.map(item => {
					item.active = false
					return item
				})
				// 图书商品
				this.goodsList = this.goodsList.map(item => {
					item.active = false
					return item
				})
				// 购物车
        if (!localStorage.getItem('userId')) {
          console.log('您还没有登录，当前无法获取购物车数据!')
          return false
        }
				this.$ajax.shopcatList().then(res => {
					let list = res.data.list
					// 刊物
					this.periodicalList = list.filter((item) => {
						item.number = parseInt(item.quantity, 10)
						return item.cls === '1'
					})
					// 商品
					this.goodsList = list.filter((item) => {
						item.number = parseInt(item.quantity, 10)
						return item.cls === '2'
					})
          if (!res.data.list.length) return
					this.$nextTick(() => {
						this.getDeleteLineHeight()
						if (this.periodicalList.length) {
							// this.listenperiodicalTouchEvent()
						}
						if (this.goodsList.length) {
							// this.listenGoodsTouchEvent()
						}
						setTimeout(() => {
							this.initBetterScroll()
						}, 20)
					})
				}, err => {
					console.log(err)
				})
			},
			// 改变数量
			changeNum (type, index, num) {
				// console.log(index)
				// 如果数量为 0
				if (this['' + type + ''][index].number <= 1 && num < 0) {
					if (type === 'periodicalList') {
						this.periodicalDeleteIndex = index
					}
					if (type === 'goodsList') {
						this.goodsDeleteIndex = index
					}
					return
				}
				this.periodicalDeleteIndex = -1
				this.goodsDeleteIndex = -1
				this['' + type + ''][index].number += num
				// 修改购物车
				let params = {
					// _uid: localStorage.getItem('userId'),
					id: this['' + type + ''][index].id,
					// cls: '2',
					quantity: this['' + type + ''][index].number
				}
				// 请求服务器
				this.$ajax.updateShopcat(params).then(res => {
				}, err => {
					console.log(err)
				})
			},
			// 全选
			selectAllItems () {
				if (!this.selectAll) {
					this.periodicalList = this.periodicalList.map(item => {
						item.active = true
						return item
					})
					this.goodsList = this.goodsList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.periodicalList = this.periodicalList.map(item => {
						item.active = false
						return item
					})
					this.goodsList = this.goodsList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 图书全选
			selectAllperiodicalItems () {
				if (!this.periodicalAll) {
					this.periodicalList = this.periodicalList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.periodicalList = this.periodicalList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 商品全选
			selectAllGoodsItems () {
				if (!this.goodsAll) {
					this.goodsList = this.goodsList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.goodsList = this.goodsList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 选择单项 periodical
			selectperiodicalItem (index) {
				event.stopPropagation()
				this.periodicalList = this.periodicalList.map((item, index2) => {
					if (index === index2) {
						item.active = !item.active
					}
					return item
				})
			},
			// 选择单项 goods
			selectGoodsItem (index) {
				this.goodsList = this.goodsList.map((item, index2) => {
					if (index === index2) {
						item.active = !item.active
					}
					return item
				})
			},
			// 去结算
			goPay () {
				// 清除状态
				if (this.canClear) {
					this.clearItems()
					return
				}
				// 两种不同商品不能同时结算
				if (this.hasGoodsSelected && this.hasperiodicalSelected) {
					this.Dialog.alert({
						title: '提示',
						msg: '刊物杂志不能与其它商品同时结算，请分别选中再去结算~'
					})
					return
				}
				// 未选择内容
				if (!this.hasGoodsSelected && !this.hasperiodicalSelected) {
					this.Toast.warning({
						title: '请先选择需要结算的内容'
					})
					return
				}
				let selectedData = this.periodicalSelectedData.length ? this.periodicalSelectedData : this.goodsSelectedData
				let cls = this.periodicalSelectedData.length ? '1' : '2'
				this.$router.push({
					path: '/shopcat/order',
					query: {
						selectedData: JSON.stringify(selectedData),
						nowSum: this.totalResultPrice,
						cls: cls
					}
				})
			},
			// 移除
			clearItems () {
				this.Toast.loading({
					title: '正在删除...'
				})
				// 杂志
				this.periodicalList.forEach((item, index) => {
					let params = {
						ids: [item.id]
					}
					if (item.active) {
						// 请求服务器
						this.$ajax.shopcatDel(params).then(res => {
							this.Toast.success({
								title: '移除成功！'
							})
							this.deleteOnePeriodical(item.id)
							this.loadData()
						}, err => {
							console.log(err)
						})
					}
				})
				// 图书
				this.goodsList.forEach((item, index) => {
					let params = {
						ids: [item.id]
					}
					if (item.active) {
						// 请求服务器
						this.$ajax.shopcatDel(params).then(res => {
							this.Toast.success({
								title: '移除成功！'
							})
							// this.deleteOnePeriodical(item.id)
							this.deleteOneGood(item.id)
							this.loadData()
						}, err => {
							console.log(err)
						})
					}
				})
			},
			// 删除一条杂志商品
			deleteOnePeriodical (id) {
				this.periodicalList.forEach((item, index) => {
					if (item.id === id) {
						this.periodicalList.splice(index, 1)
					}
				})
			},
			// 删除一条图书商品
			deleteOneGood (id) {
				this.goodsList.forEach((item, index) => {
					if (item.id === id) {
						this.goodsList.splice(index, 1)
					}
				})
			},
			// 移除单条杂志 数量小1时使用
			deleteperiodicalItem (id) {
				let params = {
					ids: [id]
				}
				// 筛选出需要删除的项目
				this.periodicalList.forEach((item, index) => {
					if (id === item.id) {
						this.periodicalDeleteIndex = -1
						this.periodicalList.splice(index, 1)
						this.$nextTick(() => {
							// 动画结束后刷新scroll
							setTimeout(() => {
								this.initBetterScroll()
							}, 320)
						})
					}
				})
				// 请求服务器
				this.$ajax.shopcatDel(params).then(res => {
				}, err => {
					console.log(err)
				})
			},
			// 移除单条商品  数量小1时使用
			deleteGoodsItem (id) {
				let params = {
					ids: [id]
				}
				// 筛选出需要删除的项目
				this.goodsList.forEach((item, index) => {
					if (id === item.id) {
						this.goodsDeleteIndex = -1
						this.goodsList.splice(index, 1)
						this.$nextTick(() => {
							// 动画结束后刷新scroll
							setTimeout(() => {
								this.initBetterScroll()
							}, 320)
						})
					}
				})
				// 请求服务器
				this.$ajax.shopcatDel(params).then(res => {
				}, err => {
					console.log(err)
				})
			},
			// 重置
			resetDeleteIndex () {
				this.periodicalDeleteIndex = -1
				this.goodsDeleteIndex = -1
			}
		},
		components: {
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>
