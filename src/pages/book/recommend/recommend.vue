<template>
	<div class="recommend">
		<div class="title">
      <div class="line"></div>
      <div class="text">猜您喜欢</div>
      <div class="line"></div>
    </div>
    <section class="book-list">
    	<!-- 模拟高度 -->
    	<ul class="side-list" v-if="needCompute">
    		<li v-for="(item, index) in recommendList" :style="{ width: itemWidth }" class="item" ref="listItem">
	    		<div class="img">
	    			<img v-lazy="item.logo">
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<div class="price">
	    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
	    		</div>
					<div class="cart">
						<span>收藏</span>
						<span>加入购物车</span>
					</div>
	    	</li>
    	</ul>
    	<!-- 瀑布流 -->
    	<ul v-for="(list, i) in itemList" :class="i" class="side-list">
    		<li v-for="(item, index) in list" class="item" :style="{ width: itemWidth }"  :item="item">
	    		<div class="img" @click="openDetail(item.id)">
	    			<img :src="item.logo">
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<div class="price">
	    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
	    		</div>
					<div class="cart">
						<span @click.prevent.stop="doCollect(item)">收藏</span>
						<span @click.prevent.stop="addToShopcat(item.id)">加入购物车</span>
					</div>
	    	</li>
    	</ul>
    </section>
	</div>
</template>

<script>
	export default {
		name: 'recommend',
		props: {
			recommendList: {
				type: Array
			}
		},
		data () {
			return {
				// 单条宽度
				itemWidth: (window.innerWidth - 10 * 2 - 5) / 2 + 'px',
				// 分几列
				sides: 2,
				// 数据
				itemList: [],
				// 需要计算瀑布流高度
				needCompute: true
			}
		},
		watch: {
			// 推荐
			recommendList (newVal, oldVal) {
				// 计算瀑布流
				this.needCompute = true
				this.$nextTick(() => {
					this.getWaterfallList()
				})
			}
		},
		computed: {},
		mounted () {
			this.$nextTick(() => {
				// 计算瀑布流
				this.getWaterfallList()
			})
		},
		methods: {
			// 获取瀑布流列表
			getWaterfallList () {
				if (!this.$refs.listItem || !this.$refs.listItem.length) {
					return
				}
				let heights = []
				for (let i = 0; i < this.sides; i++) {
					heights.push(0)
					this.itemList.push([])
				}
				this.$refs.listItem.forEach((item, index) => {
					let needIndex = this.getMinIndex(heights)
					this.itemList[needIndex].push(this.recommendList[index])
					heights[needIndex] += item.offsetHeight
				})
				// 重置
				this.needCompute = false
				// 通知父组件 DOM 元素更新完毕
				this.$nextTick(() => {
					// 初始化父组件 better-scroll
					setTimeout(() => {
						this.$emit('freshBScroll')
					}, 200)
				})
			},
			// 获取数组中最小值的下标
			getMinIndex (arr) {
				let index = 0
				let minItem = arr[0]
				for (let i = 1; i < arr.length; i++) {
					if (arr[i] < minItem) {
						minItem = arr[i]
						index = i
					}
				}
				return index
			},
			// 打开详情
			openDetail (id) {
				this.$router.push({
					path: '/book/detail',
					query: {
						id: id
					}
				})
			},
			// 加入购物车
			addToShopcat (id) {
				// 判断登录
				this.$ajax.configLogin(this)
				// 修改购物车
				let params = {
					force: '0',
					item_id: id,
					region_id: '3501',
					uid: localStorage.getItem('userId')
				}
				// 提示
				this.Toast.loading({
					title: '提交中...'
				})
				setTimeout(() => {
					this.Toast.hide()
				}, 200)

				// 请求服务器
				this.$ajax.saveShopcat(params).then(res => {
					console.log(res)
					this.Toast.success({
						title: '添加成功！'
					})
					// this.$root.Bus.$emit('getShopcat')
				}, err => {
					console.log(err)
				})
			},
			doCollect (item) {
				// 判断登录
				this.$ajax.configLogin(this)
				let params = {
					_uid: localStorage.getItem('userId'),
					cls: '2'
				}
				this.$ajax.bookDetail(item.id,params).then(res => {
					let isFav = res.data.book.is_fav
					let params = {
						_uid: localStorage.getItem('userId'),
						id: item.id,
						cls: '2'
					}
					if (isFav === "0") {
						this.$ajax.addCollect(params).then(res => {
							// 提示
							this.Toast.success({
								title: '收藏成功'
							})
							setTimeout(() => {
								this.Toast.hide()
							}, 300)
						}, err => {
							console.log(err)
						})
					} else {
						// 提示
						this.Toast.warning({
							title: '您已收藏'
						})
						setTimeout(() => {
							this.Toast.hide()
						}, 500)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'recommend.styl'
</style>
