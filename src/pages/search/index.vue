<template>
	<div class="search-index-page" @click="hideSelector()">
		<v-reminder v-show="reminderShow" @hideReminder="hideReminder"></v-reminder>
		<section class="bar">
			<div class="top">
				<div class="select-box" @click.prevent.stop="triggerSelector()">
					<span class="text">{{ selectedType.name }}</span>
					<span class="bottom-arrow"></span>
				</div>
				<div class="input-area">
					<input type="text" required="" v-model="keyword" placeholder="在此输入搜索内容">
					<img src="./search_icon_black.png" @click.prevent.stop="doSearch()">
				</div>
				<div class="clear-button" @click="cancleToBack()">
					<span>取消</span>
				</div>
				<v-selector v-show="selectorShow" :typeList="typeList" @changeTypeIndex="changeTypeIndex"></v-selector>
			</div>
		</section>
		<section class="hot-search search-block">
			<div class="title">
				<img src="./hot.png">
				<span class="text">热门搜索</span>
			</div>
			<div v-if="hotSwiperList" class="search-body hot-search-body">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="pages in hotSwiperList">
						<div v-for="lines in pages" class="line-box">
							<p @click.prevent.stop="doSearchItem(item.name, item.cls)" v-for="item in lines" class="text">{{ item.name }}</p>
						</div>
					</div>
				</div>
				<div class="swiper-pagination swiper-pagination-white"></div>
			</div>
			<div class="no-data-box" v-if="!hotSwiperList || !hotSwiperList.length">
				<img src="./no_data_pic.png">
			</div>
		</section>
		<section class="history-search search-block">
			<div class="title">
				<img src="./step.png">
				<span class="text">历史搜索</span>
			</div>
			<div v-if="historySwiperList" class="search-body history-search-body">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="pages in historySwiperList">
						<div v-for="lines in pages" class="line-box">
							<p @click.prevent.stop="doSearchItem(item.name, item.cls)" v-for="item in lines" class="text">{{ item.name }}</p>
						</div>
					</div>
				</div>
				<div ref="historyPagination" class="swiper-pagination swiper-pagination-white"></div>
			</div>
			<div class="no-data-box" v-if="!historySwiperList || !historySwiperList.length">
				<img src="./no_data_pic.png">
			</div>
		</section>
		<div class="clear-history-search" @click="clearHistorySearch()" v-if="historySwiperList.length">
			<span>清空历史记录</span>
		</div>
	</div>
</template>

<script>
	import reminder from './reminder/reminder'
	import Swiper from 'swiper'
	import selector from './selector/selector'
	import { checkInput, uniqueArr } from '@/common/js/common'
	// import 'swiper/dist/css/swiper.min.css'
	export default {
		name: 'search-index-page',
		data () {
			return {
				// 显示提示
				reminderShow: true,
				// 热搜
				hotSearchList: [],
				// 搜索历史
				historySearchList: [],
				// 热搜轮播
				hotSwiper: '',
				// 历史搜索轮播
				historySwiper: false,
				// 显示选择器
				selectorShow: false,
				// 类型数组
				typeList: [],
				// 类型序号
				typeIndex: 0,
				// 关键词
				keyword: ''
			}
		},
		computed: {
			// 热门搜索列表
			hotSwiperList () {
				return this.getComputedList(this.hotSearchList)
			},
			// 历史搜索列表
			historySwiperList () {
				return this.getComputedList(this.historySearchList)
			},
			// 选中的类型
			selectedType () {
				if (!this.typeList.length) {
					return {
						cls: '2',
						name: '图书'
					}
				}
				return this.typeList[this.typeIndex]
			}
		},
		created () {
			// 是否不再提示
			if (localStorage.getItem('noReminder')) {
				this.reminderShow = false
			}
			// 加载数据
			this.loadData()
		},
		mounted () {
			// 获取搜索历史
			this.getSearchHistory()
			this.$nextTick(() => {
			})
		},
		methods: {
			// 加载数据
			loadData () {
				// 搜索类型字典表
				this.$ajax.searchType().then(res => {
					// console.log(res)
					this.typeList = res.data.list
				}, err => {
					console.log(err)
				})
				// 热门搜索
				this.$ajax.hotSearch().then(res => {
					// console.log(res)
					this.hotSearchList = res.data.list
					this.$nextTick(() => {
						this.initHotSwiper()
					})
				}, err => {
					console.log(err)
				})
			},
			// 初始化热门搜索
			initHotSwiper () {
				if (!this.hotSwiper) {
					if (this.hotSwiperList.length > 1) {
						this.hotSwiper = new Swiper('.hot-search-body', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							speed: 600,
							onInit: function (swiper) {
								swiper.startAutoplay()
							},
							onTouchEnd: function (swiper) {
								swiper.startAutoplay()
							}
						})
					}
				} else {
					this.hotSwiper.update()
				}
			},
			// 初始化历史搜索
			initHistorySwiper () {
				if (!this.historySwiper) {
					if (this.historySwiperList.length > 1) {
						this.historySwiper = new Swiper('.history-search-body', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							speed: 600,
							onInit: function (swiper) {
								swiper.startAutoplay()
							},
							onTouchEnd: function (swiper) {
								swiper.startAutoplay()
							}
						})
					}
				} else {
					this.historySwiper.update()
				}
			},
			// 隐藏提示
			hideReminder () {
				this.reminderShow = false
			},
			// 取消。返回
			cancleToBack () {
				this.$router.goBack()
			},
			// 切换选择器显示
			triggerSelector () {
				this.selectorShow = !this.selectorShow
			},
			hideSelector () {
				this.selectorShow = false
			},
			// 切换选择类型
			changeTypeIndex (index) {
				this.typeIndex = index
				this.selectorShow = false
				// this.triggerSelector()
			},
			// 清空历史记录
			clearHistorySearch () {
				this.historySearchList = []
				if (this.historySwiper) {
					this.historySwiper.destroy()
				}
				this.$refs.historyPagination.style.display = 'none'
				localStorage.removeItem('searchList')
			},
			// 获取计算后的数组
			getComputedList (arr) {
				if (!arr.length) {
					return []
				}
				let swiperList = []
				let pageArr = []
				let lineArr = []
				// 当前起点位置
				let startPos = 0
				// 最大允许宽度
				let maxWidth = window.innerWidth - 32 - 5
				arr.forEach((item, index) => {
					// 单条长度
					let singleWidth = item.name.length * 14 + 20
					if (startPos + singleWidth <= maxWidth) {
						// 当前起点位置
						startPos += singleWidth + 5
						// 添加进当前行
						lineArr.push(item)
						// 如果为最后一条，则直接结束
						if (index === arr.length - 1) {
							// 此行结束
							pageArr.push(lineArr)
							swiperList.push(pageArr)
							return swiperList
						}
					} else {
						// 如果已经超出
						// 此行结束
						pageArr.push(lineArr)
						// 如果首行就超出整行，则去掉之前的空行
						if (singleWidth + 5 > maxWidth && index === 0) {
							pageArr.pop()
						}
						// 另起一行
						lineArr = []
						// 添加进当前行
						lineArr.push(item)
						// 起点位置改变
						startPos = singleWidth + 5
						// 此页结束
						if (pageArr.length >= 5) {
							swiperList.push(pageArr)
							// 另起一页
							pageArr = []
						}
						// 如果为最后一条，则直接结束
						if (index === arr.length - 1 && pageArr.length) {
							swiperList.push(pageArr)
							return swiperList
						}
					}
				})
				return swiperList
			},
			// 搜索
			doSearch () {
				if (!checkInput()) {
					return
				}
				let params = {}
				params.keyword = this.keyword
				params.cls = this.selectedType.cls
				this.goToResult(params)
			},
			// 搜索当前选项
			doSearchItem (keyword, cls) {
				let params = {}
				params.keyword = keyword
				params.cls = cls
				this.goToResult(params)
			},
			// 跳转
			goToResult (params) {
				params.pageNum = 1
				params.pageSize = 20
				let paramStr = JSON.stringify(params)
				// 保存搜索历史
				this.saveSearchHistory(params)
				this.$router.push({
					path: `/search/result${paramStr}`,
					query: params
				})
			},
			// 保存搜索历史
			saveSearchHistory (params) {
				let item = {}
				item.name = params.keyword
				item.cls = params.cls
				let searchList = localStorage.getItem('searchList') ? JSON.parse(localStorage.getItem('searchList')) : []
				searchList.unshift(item)
				searchList = uniqueArr(searchList)
				// 保存进历史记录
				localStorage.setItem('searchList', JSON.stringify(searchList))
				this.getSearchHistory()
			},
			// 获取搜索历史
			getSearchHistory () {
				if (localStorage.getItem('searchList')) {
					this.historySearchList = JSON.parse(localStorage.getItem('searchList'))
					// this.historySearchList = this.hotSearchList
					this.$nextTick(() => {
						this.initHistorySwiper()
					})
				}
			}
		},
		components: {
			'v-reminder': reminder,
			'v-selector': selector
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>