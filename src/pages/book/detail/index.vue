<template>
	<div class="book-detail-page">
		<v-top :topTabIndex="topTabIndex" :showItems="showItems" @changeTopTabIndex="changeTopTabIndex"></v-top>
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
			<component :is="showContent" :levelShow="true" :item="item" :commentList="item.commentList" ref="content" @changeTopTabIndex="changeTopTabIndex"></component>
		</transition>
		<!-- 底部 -->
		<footer class="detail-footer">
			<div class="icons">
				<div class="collect" @click="doCollect()">
					<div class="collectImg" :class="{active:isActive}"></div>
					<p class="text">收藏</p>
				</div>
				<div class="shopcat" @click="goShopcat()">
					<span class="dot" v-if="shopNum>0">{{ shopNum }}</span>
					<img src="./shopcat_icon.png">
					<p class="text">购物车</p>
				</div>
			</div>
			<div class="add-shopcat" @click="addToShopcat()">加入购物车</div>
			<!-- <div class="go-buy" @click="goOrder()">立即购买</div> -->
			<div class="go-buy" @click="NumShow()" v-if="flag">
				<span>立即购买</span>
			</div>
			<div class="go-buy" v-else>
				<span @click="goOrder()">去结算</span>
			</div>
		</footer>
		<!-- 分享模块 -->
		<div class="share-box" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown"  v-show="!fold1" @shareChange="change">
			<h3>分享到</h3>
			<div class="share-type">
				<ul>
					<li @click="shareWeixin('onMenuShareAppMessage')">
						<img src="./shareImg/weixin.png">
						<p>微信好友</p>
					</li>
					<li @click="shareWeixin('onMenuShareTimeline')">
						<img src="./shareImg/friend.png">
						<p>微信朋友圈</p>
					</li>
					<li @click="shareWeixin('onMenuShareQQ')">
						<img src="./shareImg/qq.png">
						<p>手机QQ</p>
					</li>
					<li @click="shareWeixin('onMenuShareQZone')">
						<img src="./shareImg/kongjian.png">
						<p>QQ空间</p>
					</li>
					<li>
					</li>
					<li @click="shareWeixin()">
						<img src="./shareImg/weibo.png">
						<p>新浪微博</p>
					</li>
					<li @click="shareWeixin()">
						<img src="./shareImg/wxlogo.png">
						<p>微校网圈子</p>
					</li>
					<li>
					</li>
				</ul>
			</div>
			<div class="cle" @click="change()">
				<p>取消</p>
			</div>
		</div>
		<!-- 选择商品数量 -->
		<div class="orderNum-box" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" v-show="!flag">
			<div class="orderNum-top">
				<!-- 商品logo -->
				<div class="shopLogo">
					<img :src="item.logo">
				</div>
				<!-- 价格 -->
				<p class="price">
    			<span class="num">￥<span class="big">{{ item.last_fee | getInteger }}</span><span>{{ item.last_fee | getDecimal }}</span></span>
	    	</p>
				<!-- 关闭 -->
				<div class="close">
					<img src="">
				</div>
			</div>
			<div class="orderNum-bot">
				<p>请选择数量</p>
				<!-- 控制器 -->
				<div class="cart-control">
					<div class="left-icon" @click.prevent.stop="changeNum(-1)">
						<img :src="reduceIconSrc">
					</div>
					<p class="num">{{ number }}</p>
					<div class="right-icon" @click.prevent.stop="changeNum(1)">
						<img :src="addIconSrc">
					</div>
				</div>
			</div>
		</div>
		<!-- 遮罩层 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="!fold1" @click="hideSelector()" class="mask">
			</section>
		</transition>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="!flag" @click="hideSelectorNum()" class="mask-num">
			</section>
		</transition>
	</div>
</template>

<script>
	import top from './top/top'
	import product from './product/product'
	import detail from './detail/detail'
	import comment from './comment/comment'
	import { getNeedDataList, weiXinConfig } from '@/common/js/common'
	export default {
		name: 'book-detail-page',
		data () {
			return {
				// 导航
				topTabIndex: 0,
				// 视图
				showContentList: ['v-product', 'v-detail', 'v-comment'],
				// 标题
				showItems: ['商品', '详情', '评价'],
				// 数据
				item: {},
				// 购物车
				shopcatList: [],
				shopNum: 0,
				isActive: false,
				fold: true,
				fold1: true,
				flag: true,
				reduceIconSrc: require('@/common/icons/reduce_icon.png'),
				addIconSrc: require('@/common/icons/add_icon.png'),
				number: 1
			}
		},
		computed: {
			// 当前视图
			showContent () {
				return this.showContentList[this.topTabIndex]
			}
		},
		components: {
			'v-top': top,
			'v-product': product,
			'v-detail': detail,
			'v-comment': comment
		},
		created () {
			// 加载数据
			this.loadData()

			// 获取购物车
			this.getShopcat()
		},
		mounted () {
		},
		methods: {
			// 获取数据
			loadData () {
				let params = {
					_uid: localStorage.getItem('userId'),
					cls: '2'
				}
				// 获取图书详情数据
				this.$ajax.bookDetail(this.$route.query.id,params).then(res => {
					this.item = res.data.book
          weiXinConfig(this.item)
					if(this.item.is_fav === '1') {
						this.isActive = true
					} else {
						this.isActive = false
					}
				}, err => {
					console.error(err)
				})
			},
			// 切换导航条
			changeTopTabIndex (index, secondIndex) {
				this.topTabIndex = index
				this.$nextTick(() => {
					if (index === 1 && secondIndex) {
						this.$refs.content.changeDetailTabIndex(secondIndex)
					}
				})
				if (index === 0) {
					this.loadData()
				}
			},
			// 获取购物车
			getShopcat () {
				this.$ajax.shopcatList().then(res => {
					this.shopcatList = res.data.list
					let shopNum = 0
					this.shopcatList.forEach(item => {
						this.shopNum += Number(item.quantity)
					})
					// console.log(shopNum)
					// if(this.item.is_fav == true) {
					// 		console.log(111)
					// }
				}, err => {
					console.log(err)
				})
			},
			// 去购物车
			goShopcat () {
				this.$router.push({
					path: '/shopcat/index'
				})
			},
			// 加入购物车
			addToShopcat () {
				// 判断登录
				if (!this.$ajax.configLogin(this)) {
					return false
				}
				// 修改购物车
				let params = {
					force: '0',
					item_id: this.$route.query.id,
					region_id: '3501',
					uid: localStorage.getItem('userId')
				}
				// 提示
//				this.Toast.loading({
//					title: '提交中...'
//				})
				// 请求服务器
				this.$ajax.saveShopcat(params).then(res => {
          if (res.data.result.status == 0) {
            this.shopNum++
          } else {
            this.Toast.warning({
              title: '<p>' + res.data.result.msg + '</p>'
            })
          }
				}, err => {
					console.log(err)
				})
			},
			// 立即购买
			goOrder () {
				// 判断登录
				if (!this.$ajax.configLogin(this)) {
					return false
				}
				let data = this.item
				data.number = this.number
				let selectedData = [data]
				selectedData = getNeedDataList(selectedData, ['name', 'last_fee', 'number', 'logo', 'id'])
				// 去下单页
				this.$router.push({
					path: '/shopcat/order',
					query: {
						selectedData: JSON.stringify(selectedData),
						nowSum: data.last_fee * this.number,
            cls: '2'
					}
				})
			},
			// 加入收藏
			doCollect () {
				let isActive = this.isActive
				let params = {
					uid: localStorage.getItem('userId'),
					sid: this.$route.query.id,
					cls: '2'
				}
				// 收藏标志为true，点击取消收藏
				if(isActive == true) {
					this.$ajax.delCollect(params).then(res => {
						this.isActive = !isActive
					}, err => {
						console.log(err)
					})
				} else {
					// 否则 加入收藏
					this.$ajax.addCollect(params).then(res => {
						this.isActive = !isActive
					}, err => {
						console.log(err)
					})
				}
			},
			// 控制参数
			change () {
				// this.fold = !this.fold
				if (this.fold1 === false) {
					this.fold1 = true
					return
				}
				this.fold1 = false
			},
			NumShow () {
				if (this.flag === false) {
					this.flag = true
					return
				}
				this.flag = false
			},
			// 控制遮罩层
			hideSelectorNum () {
				this.flag = true
			},
			hideSelector () {
				this.fold1 = true
			},
			// 选择数量
			changeNum (num) {
				// 如果数量为 0
				if (num == 1) {
					this.number += num
				}
				if (num == -1) {
					if (this.number <= 1) {
						this.Toast.fail({
							title: '不能再少了'
						})
						setTimeout(() => {
							this.Toast.hide()
						}, 1000)
						this.number = 1
						return
					}
					this.number += num
				}
			},
			// 分享
			shareWeixin () {
        console.log('微信的接口不支持自定义按钮？')
      }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>
