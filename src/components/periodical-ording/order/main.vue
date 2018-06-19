<template>
	<div class="periodical-order">
		<split></split>
		<section class="header">
			<div class="top-border border-bg"></div>
			<div class="main">
				<div class="left-part" v-if="hasDefaultAddress">
					<div class="address-box">
						<div class="contract">
							<span class="name">{{ address.name }}</span>
							<span class="mobile">{{ address.mobile }}</span>
						</div>
						<div class="address-text">{{ address.provinceName }}{{ address.cityName }}{{ address.regionName }}{{ address.address }}</div>
					</div>
				</div>
				<div class="left-part" v-if="!hasDefaultAddress" @click="modifyAddress('order/addresslist')">
					<div class="no-address">
						请前往设置您的收货地址
					</div>
				</div>
				<div class="right-arrow" @click="modifyAddress('order/addresslist')">
					<img src="./arrow_right.png">
				</div>
			</div>
			<div class="bottom-border border-bg"></div>
		</section>
		<split></split>
		<section class="product">
			<p class="title">商品</p>
			<ul class="list">
				<li v-for="(item, index) in listData" class="list-item" :class="{ underline: true }">
					<div class="left-media">
						<img v-lazy="item.logo">
					</div>
					<div class="right-desc">
						<div class="box">
							<p class="name">{{ item.name }}</p>
							<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getFixed1 }}</p>
							<span class="dot">{{ item.number }}</span>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<split></split>
		<section class="message">
			<p class="title">订单留言</p>
			<p class="placeholder" @click="modifyAddress('order/leave')">{{ leaveText || '请点击输入留言内容'}}</p>
			<div class="right-arrow"  @click="modifyAddress('order/leave')">
				<img src="./arrow_right.png">
			</div>
		</section>
		<split></split>
		<section class="amount">
			<p class="price">
				<span class="title">商品金额</span>
				<span class="num">￥<span class="big">{{ nowSum | getInteger }}</span>{{ nowSum | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">运费</span>
				<span class="num">+<span class="big">{{ carriage | getInteger }}</span>{{ carriage | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">优惠金额</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
		</section>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
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
	import split from '../../common/split/split'
	// import { getArraySet, getWithCommaString } from '../../../common/js/common.js'
	import { getWithCommaString } from '../../../common/js/common.js'
	export default {
		name: 'order',
		data () {
			return {
				hasDefaultAddress: false,
				listData: [],
				nowSum: 0,
				leaveText: '',
				defaultAddressChange: false,
				isDoubleEleven: false,
        address: {}
			}
		},
		computed: {
			// 优惠金额
			discount () {
				// 测试用
				let start = new Date('2017-11-08 00:00:00.000').getTime()
				// 正式用
				// let start = new Date('2017-12-08 00:00:00.000').getTime()
				let end = new Date('2017-12-13 00:00:00.000').getTime()
				let nowTime = new Date().getTime()
				if (nowTime >= end || nowTime < start) {
					return 0
				}
				if (!this.isDoubleEleven) {
					return 0
				}
				console.log(this.nowSum)
				return parseFloat(this.nowSum) > 200 ? 50 : 0
			},
			// 运费
			carriage () {
				return parseFloat(this.nowSum) >= 99 ? 0 : 10
			},
			totalSum () {
				return (parseFloat(this.nowSum) + parseFloat(this.carriage) - parseFloat(this.discount)).toFixed(1)
			}
		},
		created () {
//			document.title = '订单结算'
			this.hasDefaultAddress = (localStorage.getItem('addressList') && JSON.parse(localStorage.getItem('addressList')).length)
			// 获取数据
			this.listData = JSON.parse(this.$route.query.selectedData) || []
			this.nowSum = this.$route.query.nowSum || 0
			console.log(this.$route.query.entrance)
			// 判断是否为双十一
			if (this.$route.query.entrance && this.$route.query.entrance === 'doubleEleven') {
				this.isDoubleEleven = true
			}
      // 地址
      this.$root.Bus.$on('chooseAddress', value => {
        this.address = value
        this.hasDefaultAddress = true
      })
		},
		mounted () {
			// 首先清空购物车，双十一不用清空
			if (!this.isDoubleEleven) {
				this.clearShopcat()
			}
			// 监听更新
			this.$root.Bus.$on('updateAddress', obj => {
				this.defaultAddressChange = true
				this.hasDefaultAddress = (localStorage.getItem('addressList') && JSON.parse(localStorage.getItem('addressList')).length)
			})
			this.$root.Bus.$on('leaveTextChange', val => {
				this.leaveTextChange(val)
			})
		},
		methods: {
			// 修改信息
			modifyAddress (path) {
				this.$router.push({
					path: path
				})
			},
			// 修改留言内容
			leaveTextChange (val) {
				this.leaveText = val
			},
			// 提交订单
			doSubmit () {
				if (!this.hasDefaultAddress) {
					this.Toast.warning({
						title: '请先设置收货地址'
					})
					return
				}
				this.Toast.loading({
					title: '提交中...'
				})
				if (this.isDoubleEleven) {
					this.submitDoubleElevenTrage()
				} else {
					this.submitByShopcat()
				}
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
			// 提交双十一订单
			submitDoubleElevenTrage () {
				let params = {}
				params.uid = localStorage.getItem('userId')
				params.items = this.listData.map(item => {
					return {
						item_id: item.id,
						quantity: item.number.toString()
					}
				})
				params.addressId = this.address.id
				params.remark = this.leaveText
				console.log(params)
				setTimeout(() => {
					// 调用提交订单接口
					this.$ajax.doubleEleven(params).then(res => {
						let data = res.data
						// 下一个页面需要的数据
						let fee = parseFloat(data.total_fee).toFixed(1)
						let outtradeno = data.no
						let cls = '2'
						let protocol = window.location.protocol
						let host = window.location.host
						let href = ''
						if (this.isDoubleEleven) {
							href = `${protocol}//${host}/periodical/double-eleven`
						} else {
							href = `${protocol}//${host}/periodical/ording`
						}
						window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`
					}, err => {
						console.log(err)
					})
				}, 300)
			},
			// 不是双十一活动的话，通过购物车提交
			submitByShopcat () {
			  let params = {}
        params.couponUserId = null
        params.addressId = this.address.id
        params.remark = this.leaveText
        params.uid = localStorage.getItem('userId')
        params.items = []
			  JSON.parse(this.$route.query.selectedData).forEach(item => {
          params.items.push({
            item_id: item.id,
            quantity: item.number
          })
        })
        this.$ajax.tradeConfirmBook(params).then(res => {
          if (res.data.result.status==='0') {
            let data = res.data
            // 下一个页面需要的数据
            console.log(res.data)
            let fee = parseFloat(res.data.total_fee)
            console.log(parseFloat(res.data.total_fee))
            let outtradeno = data.no
            let cls = '2'
            let protocol = window.location.protocol
            let host = window.location.host
            let href = ''
            if (this.isDoubleEleven) {
              href = `${protocol}//${host}/periodical/double-eleven`
            } else {
              href = `${protocol}//${host}/periodical/ording`
            }
            window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`
          } else {
            this.Toast.warning({
              title: res.data.result.msg
            })
          }
        }, err => {
          console.log(err)
        })
			}
		},
		components: {
			split
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './order.styl'
</style>
