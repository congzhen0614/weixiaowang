<template>
	<div class="book-top">
		<header ref="top" class="book-search-header">
			<div class="back-icon" @click="goBack()">
				<img ref="homeIcon" src="./back_icon.png">
			</div>
			<!-- <div ref="searchArea" class="search-area">
				<div class="left-part">
					<input type="text" required="" v-model="keyword" placeholder="请在此输入搜索内容">
				</div>
				<div class="right-part" @click="doSearch()">
					<img ref="searchIcon" src="./search_icon_black.png">
				</div>
			</div> -->
			<div ref="searchArea" class="search-area" @click="openSearch()">
				<div class="left-part">
					在此输入搜索内容
				</div>
				<div class="right-part">
					<img ref="searchIcon" src="./search_icon_black.png">
				</div>
			</div>
			<div class="search_top_shopcat" @click="goShopcat()">
				<span class="dot" v-if="shopNum>0">{{ shopNum }}</span>
				<img ref="messageIcon" src="./shopcat_icon.png">
			</div>
		</header>
		<section class="search-tab">
			<div v-for="(type, index) in typeDatas" class="tab-item" @click="changeType(index)">
				<div class="box">
					<span class="text">{{ type }}</span>
					<span class="arrow" :class="{ up: !fold && typeIndex === index }"></span>
				</div>
			</div>
		</section>
		<section class="select-box">
			<transition-group enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
				<!-- 图书种类 -->
				<section :key="'type0'" v-show="typeIndex === 0 && !fold" class="select-area">
					<ul class="select-row">
						<li v-for="(item, index) in bookTypeList" class="select-col" @click="selectItem(item, index, 'book')">
							<span :class="{ active: item.active }" class="select-item">{{ item.name }}</span>
						</li>
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('book')">重置</div>
						<div class="confirm" @click="doConfirm('book')">确定</div>
					</footer>
				</section>
				<!-- 年龄段 -->
				<section :key="'type1'" v-show="typeIndex === 1 && !fold" class="select-area">
					<ul class="select-row">
						<li v-for="(item, index) in itemAgeList" class="select-col" @click="selectItem(item, index, 'age')">
							<span :class="{ active: item.active }" class="select-item">{{ item.name }}</span>
						</li>
					</ul>
					<footer class="select-footer">
						<div class="reset" @click="doReset('age')">重置</div>
						<div class="confirm" @click="doConfirm('age')">确定</div>
					</footer>
				</section>
				<!-- 价格区间 -->
				<section :key="'type2'" v-show="typeIndex === 2 && !fold" class="select-area">
					<div class="price-box">
						<div class="input-box">
							<input type="number" v-model="minPrice" placeholder="最低价" name="" :class="{ red: priceNotAllowed }">
						</div>
						<div class="center-text">至</div>
						<div class="input-box">
							<input type="number" v-model="maxPrice" placeholder="最高价" name="">
						</div>
					</div>
					<footer class="select-footer price-footer">
						<div class="reset" @click="doReset('price')">重置</div>
						<div class="confirm" @click="doConfirm('price')">确定</div>
					</footer>
				</section>
			</transition-group>
		</section>
		<!-- 遮罩 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="!fold" @click="hideSelector()" class="mask">
			</section>
		</transition>
	</div>
</template>

<script>
	import { getWithCommaString } from '@/common/js/common.js'
	export default {
		name: 'book-search-top',
		props: {
			scrollTop: {
				type: Number
			},
			params: {
				type: Object
			},
			id: {
				type: String
			}
		},
		data () {
			return {
				arrowUp: false,
				keyword: '',
				typeIndex: -1,
				// 类别数据
				bookTypeList: [],
				// 年龄数据
				itemAgeList: [],
				minPrice: '',
				maxPrice: '',
				// 收起
				fold: true,
				// 购物车
				shopcatList: [],
				shopNum: 0
			}
		},
		computed: {
			// 输入价格不符合标准
			priceNotAllowed () {
				if (this.maxPrice && this.minPrice && parseInt(this.maxPrice) < parseInt(this.minPrice)) {
					return true
				}
				return false
			},
			// tab栏数据
			typeDatas () {
				let list = []
				list.push(this.getSelectedStr(this.selectedBookType) || '类别')
				list.push(this.getSelectedStr(this.selectedAge) || '年龄')
				let priceSre = '价格'
				if (this.maxPrice && this.minPrice && parseInt(this.maxPrice) && parseInt(this.minPrice) >= parseInt(this.minPrice)) {
					priceSre = `${this.minPrice}~${this.maxPrice}元`
					// console.log(priceSre)
				}
				list.push(priceSre)
				return list
			},
			// 选中的图书种类
			selectedBookType () {
				if (!this.bookTypeList) {
					return []
				}
				let arr = []
				this.bookTypeList.forEach(item => {
					if (item.active) {
						arr.push(item)
					}
				})
				return arr
			},
			// 选中的年龄段
			selectedAge () {
				if (!this.itemAgeList) {
					return []
				}
				let arr = []
				this.itemAgeList.forEach(item => {
					if (item.active) {
						arr.push(item)
					}
				})
				return arr
			},
			selectedClassData () {
				if (!this.classData.length) {
					return false
				}
			}
		},
		watch: {
		},
		created () {
			// 加载数据
			this.loadData()
			// 获取购物车
			this.getShopcat()
		},
		mounted () {
			// 获取被选中的种类
			this.getSelectedType()
		},
		methods: {
			loadData () {
				// 图书种类列表
				this.$ajax.bookConstant().then(res => {
					// console.log('typelist loadData')
					let bookTypeList = res.data.bookTypeList
					bookTypeList.forEach(item => {
						item.active = false
					})
					let itemAgeList = res.data.itemAgeList
					// console.log(itemAgeList)
					itemAgeList.forEach(item => {
						item.active = false
					})
					this.bookTypeList = bookTypeList
					this.itemAgeList = itemAgeList
					// 获取选中的图书类型
					this.getSelectedType()
				}, err => {
					console.log(err)
				})
			},
			changeType (index) {
				if (this.typeIndex === index && this.fold === false) {
					this.fold = true
					return
				}
				this.fold = false
				this.typeIndex = index
			},
			// 隐藏选择器
			hideSelector () {
				this.fold = true
			},
			// 获取已被选中的数组字符
			getSelectedStr (arr) {
				let str = ''
				if (!arr.length) {
					return ''
				}
				arr.forEach(item => {
					if (item.active) {
						str += item.name + ','
					}
				})
				return str ? str.substr(0, str.length - 1) : ''
			},
			// 选中当前选项
			selectItem (item, index, type) {
				if (type === 'book') {
					this.bookTypeList[index].active = !this.bookTypeList[index].active
				} else {
					this.itemAgeList[index].active = !this.itemAgeList[index].active
				}
			},
			// 重置
			doReset (type) {
				if (type === 'book') {
					this.bookTypeList.forEach(item => {
						item.active = false
					})
					// 通知重置
					this.$emit('reset')
				}
				if (type === 'age') {
					this.itemAgeList.forEach(item => {
						item.active = false
					})
				}
				if (type === 'price') {
					this.minPrice = ''
					this.maxPrice = ''
				}
				// 同是执行确定搜索操作
				this.doConfirm(type)
			},
			// 确定
			doConfirm (type) {
				if (type === 'book') {
					this.params.bookTypeIds = getWithCommaString(this.selectedBookType, 'id')
				}
				if (type === 'age') {
					this.params.itemAgeIds = getWithCommaString(this.selectedAge, 'id')
					// console.log(this.params.itemAgeIds)
				}
				if (type === 'price') {
					this.params.minPrice = this.minPrice
					// console.log(this.params)
					this.params.maxPrice = this.maxPrice
					if (this.maxPrice && this.minPrice > this.maxPrice) {
						this.Toast.warning({
							title: '<p>最低价</p>不得高于最高价'
						})
						return
					}
				}
				// 通知父组件刷新
				this.$emit('refreshData', this.params)
				// 隐藏选择器
				this.hideSelector()
				// console.log(this.params)
			},
			// 跳转到搜索页面
			openSearch () {
				this.$router.push({
					path: '/search'
				})
			},
			// 执行搜索
			doSearch () {

			},
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 获取被选中的种类
			getSelectedType () {
				if (!this.bookTypeList.length) {
					return false
				}
				// console.log(this.bookTypeList)
				this.bookTypeList.forEach((item, index) => {
					if (item.id === this.id) {
						this.bookTypeList[index].active = true
						this.doConfirm('book')
					}
				})
			},
			// 获取购物车
			getShopcat () {
				this.$ajax.shopcatList().then(res => {
					this.shopcatList = res.data.list
					let shopNum = 0
					this.shopcatList.forEach(item => {
						this.shopNum  += Number(item.quantity)
					})
					// console.log(this.shopNum)
				}, err => {
					console.log(err)
				})
			},
			// 前往购物车
			goShopcat () {
				this.$router.push({
					path: '/shopcat/index'
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>
