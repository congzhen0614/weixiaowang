<template>
	<div class="shopcat-order-main">
		<!-- 头部 -->
		<section class="shopcat-order-top">
			<div class="back-icon" @click="$router.goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">订单结算</p>
		</section>
		<section class="header">
			<div class="top-border border-bg"></div>
			<div class="main">
				<div class="left-part" v-if="address.name" @click="modifyAddress('order/address')">
					<div class="address-box">
						<div class="contract">
							<span class="name">{{ address.name }}</span>
							<span class="mobile">{{ address.mobile }}</span>
						</div>
						<div class="address-text">{{ address | getFullAddressName }}</div>
					</div>
				</div>
				<div class="left-part" v-if="!address.name" @click="modifyAddress('order/address')">
					<div class="no-address">
						请前往设置您的收货地址
					</div>
				</div>
				<div class="right-arrow" @click="modifyAddress('order/address')">
					<img :src="rightArrowSrc">
				</div>
			</div>
			<div class="bottom-border border-bg"></div>
		</section>
		<!-- 商品内容 -->
		<section class="product">
			<p class="title">商品</p>
			<ul class="list">
				<li v-for="(item, index) in listData" class="list-item underline">
					<div class="left-media">
						<img v-lazy="item.logo">
					</div>
					<div class="right-desc">
						<div class="box">
							<p class="name">{{ item.name }}</p>
							<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getFixed1 }}</p>
							<!-- 商品有积分 -->
							<!-- <div class="integral">
								<img :src="integralIconSrc">
								<span class="text">10积分=0.01元 最多可用200积分</span>
							</div> -->
							<span class="dot">{{ item.number || 1 }}</span>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<!-- 优惠券 -->
		<section class="coupon">
			<div class="left-part">
				<img :src="couponIconSrc">
			</div>
			<div class="right-part">
				<p class="title">优惠券</p>
				<div class="info" @click="openItem('order/coupon')">
					<span v-if="couponList.length&&!couponPrice" class="desc red">{{ couponList.length }}张优惠券可使用</span>
					<span v-if="couponPrice" class="desc">已使用优惠券</span>
					<span v-if="!couponList.length" class="desc">暂无可使用优惠券</span>
					<span v-if="!couponPrice" class="select-text">未选中</span>
          <span v-if="couponPrice&&couponType!=3" class="select-text select-true">-￥<span class="big">{{ couponPrice | getInteger }}</span>{{ couponPrice | getFixed1 }}</span>
          <span v-if="couponPrice&&couponType==3" class="select-text select-true"><span class="big">{{ couponPrice | getInteger }}</span>{{ couponPrice | getFixed1 }}折</span>
					<div class="img">
						<img :src="rightArrowSrc">
					</div>
				</div>
			</div>
		</section>
		<!-- 积分 -->
		<section v-if="hasIntegral" class="integral">
			<div class="left-part">
				<img :src="integralIconSrc">
			</div>
			<div class="right-part">
				<p class="title">
					<span class="main">共1200积分</span>
					<span class="desc">(本单可使用550积分抵10元)</span>
				</p>
				<div class="info" @click="openItem('/mine/integral')">
					<span class="integral-text">选择使用积分</span>
					<div class="integral-img">
						<img :src="checkActiveSrc">
					</div>
				</div>
			</div>
		</section>
		<!-- 留言 -->
		<section class="message">
			<p class="title">订单留言</p>
			<p class="placeholder" @click="openLeave('order/leave')">{{ leaveText || '请点击输入留言内容'}}</p>
			<div class="right-arrow"  @click="openLeave('order/leave')">
				<img :src="rightArrowSrc">
			</div>
		</section>
		<!-- 数额 -->
		<section class="amount">
			<p class="price">
				<span class="title">商品金额</span>
				<span class="num">￥<span class="big">{{ nowSum | getInteger }}</span>{{ nowSum | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">运费</span>
				<span class="num">+<span class="big">{{ carriage | getInteger }}</span>{{ carriage | getFixed1 }}</span>
			</p>
			<!-- <p class="price" v->
				<span class="title">积分</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p> -->
			<p class="price" v-if="couponType == 2">
				<span class="title">满减券</span>
				<span class="num">-￥<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
			<p class="price" v-if="couponType == 3">
				<span class="title">折扣券</span>
				<span class="num">-￥<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
			<p class="price" v-if="couponType == 1">
				<span class="title">代金券</span>
				<span class="num">-￥<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
		</section>
		<footer class="bottom">
			<div class="left-part">
				<p>
					<span class="title">实付款 </span>
					<span class="price">￥<span class="big">{{ totalSum | getInteger }}</span>{{ totalSum | getFixed1 }}</span>
				</p>
			</div>
			<div class="right-button" @click="doSubmit()">提交订单</div>
		</footer>
	</div>
</template>

<script>
	import { getWithCommaString } from '@/common/js/common.js'
	export default {
		name: 'order',
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				integralIconSrc: require('@/common/icons/integral_icon.png'),
				couponIconSrc: require('@/common/icons/coupon_icon.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				// 数组
				listData: [],
				// 总价
				nowSum: 0,
				// 留言
				leaveText: '',
				// 优惠价格
				couponPrice: 0,
				// 优惠 id
				couponId: '',
        // 优惠 type
        couponType: '',
        // 优惠商品id
        goodsIds: '',
				// 地址对象
				address: {},
				// 积分暂时没有
				hasIntegral: false,
				// 优惠券暂时不用
				hasDiscount: false,
				// 优惠券
				couponList: [],
        // 优惠金额
        discount: 0
			}
		},
		computed: {
			// 运费
			carriage () {
				return parseFloat(this.nowSum) >= 99 ? 0 : 10
			},
			totalSum () {
        let totalSum = 0
        if (this.couponType === '3') {
          this.listData.forEach(item => {
            this.goodsIds.forEach(goods => {
              if (goods === item.sid || goods === item.id) {
                totalSum += item.last_fee * (item.quantity ? item.quantity : 1) * parseFloat('0.' + this.couponPrice) + parseFloat(this.carriage)
                this.discount = item.last_fee * (item.quantity ? item.quantity : 1) * (1 - parseFloat('0.' + this.couponPrice))
              } else {
                totalSum += item.last_fee * (item.quantity ? item.quantity : 1)
              }
            })
          })
        } else {
          totalSum = (parseFloat(this.nowSum) + parseFloat(this.carriage) - parseFloat(this.couponPrice)).toFixed(1)
          this.discount = this.couponPrice
        }
				return totalSum
			},
			// 最后需要的商品数组
			items () {
				return this.listData.map(item => {
					if (item.sid) {
						// 来源：购物车
						return {
							item_id: item.sid, // sid为商品id
							quantity: item.number.toString()
						}
					} else {
						// 来源：立即下单
						return {
							item_id: item.id, // sid为商品id
							quantity: item.number.toString()
						}
					}
				})
			},
			// 优惠券传参
			couponParams () {
				let params = {}
				params.cls = this.$route.query.cls
				params.items = this.items
				params.uid = localStorage.getItem('userId')
				return params
			}
		},
		created () {
//			document.title = '订单结算'
			// 优惠券
			this.$root.Bus.$on('getCoupon', (obj) => {
				this.couponPrice = obj.couponPrice ? obj.couponPrice : 0
        this.goodsIds = obj.goodsIds
        this.couponId = obj.couponId
        this.couponType = obj.couponType
			})
			// 地址
			this.$root.Bus.$on('chooseAddress', (value, event) => {
				this.address = value
			})
			// 留言
			this.$root.Bus.$on('leaveTextChange', val => {
				this.leaveTextChange(val)
			})
			// 获取数据
			this.listData = JSON.parse(this.$route.query.selectedData) || []
			this.nowSum = this.$route.query.nowSum || 0
			// 判断是否为双十一
			if (this.$route.query.entrance && this.$route.query.entrance === 'doubleEleven') {
				this.isDoubleEleven = true
			}
			// 加载数据
			this.loadData()
		},
		mounted () {},
		methods: {
			// 加载数据
			loadData () {
				// 地址
				this.$ajax.addressList({
					_uid: localStorage.getItem('userId')
				}).then(res => {
					if (res.data.data && res.data.data.length) {
					}
				}, err => {
					console.log(err)
				})
				// 优惠券
				this.$ajax.mineCouponOrder(this.couponParams).then(res => {
					let list = res.data.list
          list.forEach(item => {
            if (item.available) {
              this.couponList.push(item)
            }
          })
					if (this.couponList.length) {
						this.hasDiscount =  true
					}
				}, err => {
					console.log(err)
				})
			},
			// 打开页面
			openItem (path) {
				this.$router.push({
					path: path,
					query: {
						couponPrice: this.couponPrice,
						couponId: this.couponId,
						cls: this.$route.query.cls,
						items: JSON.stringify(this.items)
					}
				})
			},
			// 打开留言
			openLeave (path) {
				this.$router.push({
					path: path,
					query: {
						leaveText: this.leaveText
					}
				})
			},
			// 修改地址
			modifyAddress (path) {
				this.$router.push({
					path: path
				})
			},
			// 修改留言内容
			leaveTextChange (leaveText) {
				this.leaveText = leaveText
			},
			// 提交订单
			doSubmit () {
				if (!this.address.id) {
					this.Toast.warning({
						title: '请先设置收货地址'
					})
					return
				}
				this.Toast.loading({
					title: '提交中...'
				})
				this.submitTrade()
			},
			// 根据数量添加进购物车
			addItemsToShopcat (item, url) {
				let arr = []
				for (var i = 0; i < item.number; i++) {
					arr.push(this.$ajax.postAjax(`${url}`, {
						_uid: localStorage.getItem('userId'),
						id: item.id,
						cls: '2',
						code: i
					}))
				}
				return arr
			},
			// 清空购物车
			clearShopcat () {
				this.$ajax.shopcatList().then(res => {
					if (res.data.data.item_list && res.data.data.item_list.length) {
						// 设置 history
						localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) - 1)
						this.$ajax.shopcatDel(getWithCommaString(res.data.data.item_list, 'id'))
					}
				}, err => {
					console.log(err)
				})
			},
			// 获取返回数据
			getListResult (arr) {
				let result = arr[arr.length - 1].data.data.item_list
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i].data.data.item_list.length > result.length) {
						result = arr[i].data.data.item_list
					}
				}
				return result
			},
			// 获取数量 promise 数组
			getQuantityPromiseArr (result, arr) {
				let promiseArr = []
				let host = this.Host
				let _urlUpdate = `${host}/api/shop_cart/update`
				let that = this
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < result.length; j++) {
						if (arr[i].id === result[j].sid) {
							arr[i].item_ids = result[j].id
							promiseArr.push(that.$ajax.postAjax(`${_urlUpdate}`, arr[i]))
						}
					}
				}
				return promiseArr
			},
			// 提交订单
			submitTrade () {
				// 双十二
				// this.submitTwelve()

				// 订单提交
				this.submitOrderBook()
			},
			// 双十二提交
			submitTwelve () {
				let params = {}
				params.uid = localStorage.getItem('userId')
				params.items = this.items
				params.addressId = this.address.id
				params.remark = this.leaveText
				// console.log(params)
				setTimeout(() => {
					// 调用提交订单接口
					this.$ajax.doubleEleven(params).then(res => {
						console.log(res)
						let data = res.data
						// 下一个页面需要的数据
						let fee = parseFloat(data.total_fee).toFixed(2)
						let outtradeno = data.no
						// 图书
						let cls = '2'
						let protocol = window.location.protocol
						let host = window.location.host
						let href = `${protocol}//${host}/double-twelve`
						window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`
						// console.log(window.location.href)
					}, err => {
						console.log(err)
					})
				}, 300)
			},
			// 否则通过购物车提交
			// 订单提交
			submitOrderBook () {
				let params = {}

				params.addressId = this.address.id
				params.couponUserId = this.couponId
				params.items = this.items
				params.remark = this.leaveText
				params.uid = localStorage.getItem('userId')

				setTimeout(() => {
					this.$ajax.tradeConfirmBook(params).then(res => {
						let data = res.data

						// 下一页面
						// let fee = parseFloat(data.total_fee).toFixed(2)
						// let outtradeno = data.no
						// 选择分类
						// let cls = this.$route.query.cls
						// let protocol = window.location.protocol
						// let host = window.location.host
						// let href = `${protocol}//${host}/`
						// window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`

					this.$router.push({
						path: '/pay',
						query: {
							// outtradeno: this.info.no,
							fee: this.totalSum,
							cls: this.$route.query.cls
						}
					})
					}, err => {
						console.log(err)
					})
				},300)
			},
			//
			submitOrderMagazine () {
				let params = {}
				params.addressId = this.address.id
				params.couponUserId = this.couponId
				params.items = this.items
				params.remark = this.leaveText
				params.uid = localStorage.getItem('userId')
				setTimeout(() => {
					this.$ajax.tradeConfirmMagazine(params).then(res => {
						this.$router.push({
							path: '/pay',
							query: {
								// outtradeno: this.info.no,
								fee: this.totalSum,
								cls: this.$route.query.cls
							}
						})
					}, err => {
						console.log(err)
					})
				},300)
			},

			submitByShopcat () {
				// tradeConfirmBook
				let firstPromiseArr = []
				let numbers = 20
				for (let i = 0; i < numbers; i++) {
					firstPromiseArr.push(this.$ajax.saveShopcat({
						uid: '52089',
						item_id: '1942',
						region_id: '',
						force: '1'
					}))
				}
				Promise.all(firstPromiseArr).then(values => {
					console.log(values)
				})
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './order.styl'
</style>
