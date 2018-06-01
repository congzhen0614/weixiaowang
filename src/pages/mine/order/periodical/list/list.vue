<template>
	<section class="order_list_component">
		<section class="wrapper" ref="wrapper" :style="{ height: scrollWrapHeight }">
			<ul ref="list" class="mine-order-list">
				<li ref="listItem" v-for="(item, index) in listData" :class="{ deleteShow: deleteIndex === index}" class="list-item" @click.prevent.stop="openDetail(item.id, item.no)">
					<div class="list_item_content">
						<div class="list-body">
							<!-- 左侧图片 -->
							<div class="left-media" :style="{ backgroundImage: 'url(' + item.logo[0] + ')' }">
								<!-- <img v-lazy="item.logo[0]"> -->
							</div>
							<!-- 右侧文字 -->
							<div class="right-part">
								<div class="title">
									<span class="number">共{{ item.item_quantity }}件</span>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '1'" class="status">
										<span class="text">待付款</span>
									</div>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '2'" class="status">
										<span class="text">已付款</span>
									</div>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '3'" class="status">
										<span class="text">发货中</span>
									</div>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '4'" class="status">
										<img src="./complete_logo.png">
										<span class="text">已收货</span>
									</div>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '7'" class="status">
										<img src="./refund_logo.png">
										<!-- <span class="text">已退款</span> -->
									</div>
									<!-- 待付款 -->
									<div v-if="item.trade_status === '12'" class="status">
										<img v-if="item.complete" src="./complete_logo.png">
										<span class="text fail">订单失效</span>
									</div>
									<!-- 完成 -->
									<div v-if="item.trade_status === '5'" class="status">
										<img src="./complete_logo.png">
									</div>
								</div>
								<p class="id">订单号: {{ item.no }}</p>
								<p class="price">实付: ¥{{ parseFloat(item.total_fee) + parseFloat(item.delivery_fee) | reserveDecimal }}</p>
							</div>
						</div>
						<!-- 底部按钮 -->
						<!-- 待付款 -->
						<div v-if="item.trade_status === '1'" class="list-bottom">
							<button class="button" @click.stop="goPay(item)">去付款</button>
						</div>
            <!-- 已付款 -->
            <div v-if="item.trade_status === '2'" class="list-bottom">
              <button class="button" @click.prevent.stop="refundBtn(item.id, item.no)">申请退款</button>
            </div>
            <!-- 取消退款 -->
            <div v-if="item.trade_status === '8'" class="list-bottom">
              <button class="button" @click.prevent.stop="cancelRefundBtn()">取消退款</button>
            </div>
            <!-- 已发货 -->
            <div v-if="item.trade_status === '3'" class="list-bottom">
              <!-- 查看物流 -->
              <button class="button check-logistics" @click.stop="checkLogistics(item)">查看物流</button>
              <!-- 确认收货 -->
              <button class="button" @click.stop="confirmReceipt(item)">确认收货</button>
            </div>
						<!-- 已发货 -->
						<div v-if="item.trade_status === '4'" class="list-bottom">
							<button class="button">去评价</button>
						</div>
						<div v-if="item.trade_status === '12'" class="list-bottom">
							<!-- <button class="button">去评价</button> -->
						</div>
					</div>
					<div class="delete-button">删除</div>
				</li>
				<div class="empty-box" v-if="!listData.length">
					<img src="./empty_logo.png">
					<p class="text">暂无内容</p>
				</div>
			</ul>
		</section>
	</section>
</template>

<script>
	import { hasClass } from '@/common/js/common.js'
	import BScroll from 'better-scroll'
	export default {
		name: 'mine-order-list',
		props: {
			// 订单状态
			tradeStatus: {
				type: String
			}
		},
		data () {
			return {
				startX: 0,
				// 删除元素序号
				deleteIndex: -1,
				scroller: '',
				// 滚动高度
				scrollTop: 0,
				// 页码
				pageNum: 1,
				// 总页数
				pages: 0,
				// 每页数量
				pageSize: 20,
				listData: [],
				// 种类
				cls: this.$route.query.cls || '2',
				// 是否可加载
				canLoadMore: false,
				// 滚动容器高度
				scrollWrapHeight: window.innerHeight - 44 - 44 + 'px'
			}
		},
		computed: {
			// 传参
			params () {
				let params = {}
				params.pageNum = this.pageNum
				params.pageSize = this.pageSize
				params.cls = this.cls
				params.tradeStatus = this.tradeStatus
				params.isAllowPostPay = '0'
				return params
			}
		},
		watch: {
			// 监听滚动
			scrollTop (newVal, oldVal) {
				// 加载临界dian
				let loadTop = this.$refs.content.offsetHeight - window.innerHeight - 50
				if (newVal > loadTop && this.canLoadMore && this.pageNum < this.pages) {
					// 加载更多
					this.loadMore()
				}
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 加载数据
			loadData () {
				this.Toast.loading({
					title: '加载中...'
				})
				this.$ajax.tradeList(this.params).then(res => {
					let list = res.data.pageView.list
					// console.log(list)
					this.pages = res.data.pageView.pages
					this.listData = this.listData.concat(list)
					// 刷新 scroll
					this.$nextTick(() => {
						if (this.listData.length) {
							setTimeout(() => {
								this.initBetterScroll()
							}, 200)
						}
					})
				}, err => {
					console.log(err)
				})
			},
			// 初始化 scroll
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						protoType: 3,
						click: true,
						scrollX: true,
						pullDownRefresh: {
							threshold: 50,
							stop: 20
						}
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 监听滚动
			listenScroll () {
				this.scroller.on('scroll', pos => {
					this.scrollTop = -pos.y
					if (pos.y > 0) {
						this.initBetterScroll()
					}
				})
				this.scroller.on('pullingDown', () => {
					this.loadData()
				})
			},
			// 监听滑动事件
			listenTouchEvent () {
				this.$refs.listItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.deleteIndex = -1
							}
							return false
						} else {
							this.deleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.deleteIndex = index
						}
					})
				})
			},
			// 打开详情页
			openDetail (id,no) {
				this.$router.push({
					path: '/mine/order/detail',
					query: {
						cls: this.cls,
						id: id,
						no: no
					}
				})
			},
			// 重新加载
			reload () {
				// 清空数据
				this.listData = []
				this.pageNum = 1
				this.loadData()
			},
			// 加载更多
			loadMore () {
				this.canLoadMore = false
				this.pageNum += 1
				this.loadData()
			},
      refundBtn (id, no) {
        this.$router.push({
          path: '/mine/order/refund',
          query: {cls: this.cls, id: id, no: no}
        })
      },
      // 确认收货
      confirmReceipt (item) {
        this.$ajax.confirmRec(item.id).then(res => {
          this.reload()
        }, err => {
          console.log(err)
        })
      },
      // 查看物流
      checkLogistics (item) {
        this.$router.push({
          path: '/logisticsList',
          query: {
            logistic_code: item.logistic_code,
            shipper_code: item.shipper_code
          }
        })
      },
      goPay (item) {
        this.$router.push({
          path: '/pay',
          query: {
            outtradeno: item.no,
            fee: (parseFloat(item.total_fee) + parseFloat(item.delivery_fee)).toFixed(2),
            cls: this.cls
          }
        })
      }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>
