<template>
	<div class="book-search-page">
		<v-top :scrollTop="scrollTop" :params="params" :id="id" @refreshData="refreshData" @reset="reset"></v-top>
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<v-list v-if="bookList.length" ref="list" :bookList="bookList"></v-list>
				<empty v-if="!bookList.length"></empty>
			</section>
		</div>
	</div>
</template>

<script>
	import top from './top/top'
	import list from './list/list'
	import BScroll from 'better-scroll'
	import empty from '@/components/common/empty/empty'
	import { getDistinctArray } from '@/common/js/common.js'
	export default {
		name: 'book-search-page',
		data () {
			return {
				// 屏幕高度
				winHeight: window.innerHeight - 50 - 45 + 'px',
				scroller: '',
				scrollTop: 0,
				// 可加载
				loadMore: true,
				// 图书列表
				bookList: [],
				// 页码
				pageNum: 1,
				// 总页数
				pages: 0,
				// 选择的类型
				bookTypeIds: null,
				// 查询参数
				id: this.$route.query.id,
				// itemTypeId 上一活动页传入的查询参数
				itemTypeId: this.$route.query.itemTypeId || '',
				// itemTypeId 上一活动页传入的查询参数
				itemIds: this.$route.query.itemIds || '',
				// 是否为第一次进入
				isFirstEnter: false,
				params: { pageNum : 1}
			}
		},
		computed: {
			// 传参
			// params () {
			// 	let params = {}
			// 	// 类型id，选择了则不再过滤双十二的ids
			// 	if (this.bookTypeIds) {
			// 		params.bookTypeIds = this.bookTypeIds
			// 	} else {
			// 		if (this.itemTypeId) {
			// 			params.itemTypes = [this.itemTypeId]
			// 		}
			// 		if (this.itemIds) {
			// 			params.itemIds = this.itemIds
			// 		}
			// 	}
			// 	params.pageNum = this.pageNum
			// 	console.log(params)
			// 	return params
			// }
		},
		watch: {
			// 监听滚动
			scrollTop (newVal, oldVal) {
				let loadTop = this.$refs.content.offsetHeight - window.innerHeight - 50
				// 关闭 loadMore
				if (newVal > loadTop && this.loadMore) {
					this.loadMore = false
					// 如果没到最大一页，继续加载数据
					if (this.pageNum < this.pages) {
						this.params.pageNum += 1
						 this.loadData()
					}
				}
			}
		},
		created () {
			// 判断浏览器，当入口为活动页时，自动登录
			if (this.isWeixin) {
				// 判断微信登陆返回 status
				if (this.$route.query.hasOwnProperty('status')) {
					if (parseInt(this.$route.query.status) === 0) {
						localStorage.setItem('userId', this.$route.query.uid)
						localStorage.setItem('wxOpenId', this.$route.query.openid)
					}
				}
			}
			// 滑动到顶部
			setTimeout(() => {
				window.scrollTo(0, 0)
			}, 200)
			// 第一次进入
			this.isFirstEnter = true
			this.loadData()
		},
		mounted () {
		},
		beforeRouteEnter (to, from, next) {
			// 如果是从图书详情，则缓存列表页
			if (from.path === '/book/detail') {
				to.meta.isBack = true
				to.meta.keepAlive = true
			}
			next()
		},
		activated () {
			// 如果不是返回的，或者为第一次进入
			if (!this.$route.meta.isBack || this.isFirstEnter) {
				// 加载数据
				this.loadData()
			}
			// 重置
			this.isFirstEnter = false
			this.$route.meta.isBack = false
		},
		methods: {
			// 加载
			loadData () {
				this.Toast.loading({
					title: '加载中...'
				})
        if (this.params.bookTypeIds && typeof this.params.bookTypeIds === 'string') {
          this.params.bookTypeIds = this.params.bookTypeIds.split(',')
        }
				this.$ajax.bookList(this.params).then(res => {
          this.loadMore = true
					// 返回的数据
					let list = res.data.pageInfo.list
					// console.log(list)
					// 总页数
					this.pages = res.data.pageInfo.pages
					// 加载不重复的数据
					this.bookList = getDistinctArray(list, this.bookList, 'id')
					// this.bookList = this.bookList.concat(list)
					// 更新scroll
					this.$nextTick(() => {
						this.initBetterScroll()
					})
				}, err => {
					console.log(err)
				})
			},
			// 更新数据
			refreshData (params) {
				this.params = params
				this.bookList = []
				// this.pageNum = 1
				// this.bookTypeIds = params.bookTypeIds
				if (this.bookTypeIds) {
					// params.bookTypeIds = this.bookTypeIds
					this.bookTypeIds = params.bookTypeIds
					// console.log(this.bookTypeIds)
				} else {
					if (this.itemTypeId) {
						// params.itemTypes = [this.itemTypeId]
						this.itemTypes = [this.itemTypeId]
					}
					if (this.itemIds) {
						this.itemIds = this.itemIds
					}
				}
				this.loadData()
			},
			// 刷新 scroll
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
				// 可以加载更多
				this.loadMore = true
			},
			// 监听滚动条
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
			},
			// 滑动到上次位置
			backToLastTop () {
				if (this.scroller) {
					this.scroller.scrollTo(0, 300, 300)
				}
			},
			// 重置
			reset () {
				this.itemIds = ''
				this.itemTypeId = ''
			}
		},
		components: {
			'v-top': top,
			'v-list': list,
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './search.styl'
</style>
