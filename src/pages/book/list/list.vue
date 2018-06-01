<template>
	<div class="book-page-list">
		<!-- 今日优惠 -->
    <section class="book-list" v-if="type === '1' && id === '1'">
    	<!-- 用于计算高度的虚拟 DOM -->
    	<ul class="side-list" v-if="needCompute">
    		<li v-for="(item, index) in bookList" :style="{ width: itemWidth }" class="item" ref="listItem">
	    		<div class="img" @click="showDetail(item.id)">
	    			<img v-lazy="item.logo">
	    			<span>{{ item.discount }}折</span>
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<p v-if="item.author" class="author other">
	    			<span class="text-name">作者</span>
	    			<span class="text">{{ item.author }}</span>
	    		</p>
	    		<p class="hardcover other">
	    			<span class="text-name">包装</span>
	    			<span class="text" v-if="item.hardcover === '1'">精装</span>
	    			<span class="text" v-if="item.hardcover === '0'">平装</span>
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
    	<!-- 实际瀑布流 -->
    	<ul v-for="(list, i) in itemList" :class="i" class="side-list">
    		<li v-for="(item, index) in list" class="item" :style="{ width: itemWidth }">
	    		<div class="img" @click="showDetail(item.id)">
	    			<img v-lazy="item.logo">
	    			<span>{{ item.discount }}折</span>
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<p v-if="item.author" class="author other">
	    			<span class="text-name">作者</span>
	    			<span class="text aut">{{ item.author }}</span>
	    		</p>
	    		<p class="hardcover other">
	    			<span class="text-name">包装</span>
	    			<span class="text" v-if="item.hardcover === '1'">精装</span>
	    			<span class="text" v-if="item.hardcover === '0'">平装</span>
	    		</p>
	    		<div class="price">
	    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
	    		</div>
					<div class="cart">
						<span @click="doCollect(item)">收藏</span>
						<span @click="showDetail(item.id)">加入购物车</span>
					</div>
	    	</li>
    	</ul>
    </section>
    <!-- 最新上架 -->
  	<ul class="new-list" v-if="type === '1' && id === '2'">
			<li v-for="(item, index) in bookList" class="list-item underline">
				<div class="left-media" @click="showDetail(item.id)">
					<img v-lazy="item.logo">
				</div>
				<div class="right-part">
					<div class="box">
		  			<p class="name">
		    			{{ item.name }}
		    		</p>
		    		<p v-if="item.author" class="author other">
		    			<span class="text-name">作者</span>
		    			<span class="text">{{ item.author }}</span>
		    		</p>
		    		<p class="hardcover other">
		    			<span class="text-name">包装</span>
		    			<span class="text" v-if="item.hardcover === '1'">精装</span>
		    			<span class="text" v-if="item.hardcover === '0'">平装</span>
		    		</p>
		    		<p class="time">
		    			上架时间：{{ item.created_at | getUpdateDay }}
		    		</p>
		    		<div class="price">
		    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
		    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
		    		</div>
					</div>
				</div>
			</li>
  	</ul>
  	<!-- 动态标题 -->
  	<ul class="new-list" v-if="type === '2'">
			<li v-for="(item, index) in bookList" class="list-item underline" @click="showDetail(item.id)">
				<div class="left-media">
					<img v-lazy="item.logo">
				</div>
				<div class="right-part">
					<div class="box">
		  			<p class="name">
		    			{{ item.name }}
		    		</p>
		    		<p v-if="item.author" class="author other">
		    			<span class="text-name">作者</span>
		    			<span class="text">{{ item.author }}</span>
		    		</p>
		    		<p class="hardcover other">
		    			<span class="text-name">包装</span>
		    			<span class="text" v-if="item.hardcover === '1'">精装</span>
		    			<span class="text" v-if="item.hardcover === '0'">平装</span>
		    		</p>
		    		<p class="type other">
		    			<span class="text-name">类别</span>
		    			<span class="text">{{ item.bookTypes | getTypeText }}</span>
		    		</p>
		    		<div class="price">
		    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
		    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
		    		</div>
					</div>
				</div>
			</li>
  	</ul>
	</div>
</template>

<script>
	export default {
		name: 'book-page-list',
		props: {
			bookList: {
				type: Array
			},
			type: {
				type: String
			},
			id: {
				type: String
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
			// 图片数组
			bookList (newVal, oldVal) {
				if (this.type !== '2') {
					// 计算瀑布流高度
					this.needCompute = true
					this.$nextTick(() => {
						this.getWaterfallList()
					})
				}
			}
		},
		computed: {},
		mounted () {
			this.$nextTick(() => {
				if (this.type !== '2') {
					// 获取瀑布流
					this.getWaterfallList()
				}
			})
		},
		// beforeRouteEnter (to, from, next) {
		// 	// 判断上一页是否为搜索列表页
		// 	if (from.path === '/book/single') {
		// 		to.meta.isBack = true
		// 		from.meta.keepAlive = false
		// 	}
		// 	next()
		// },
		// created () {
		// 	// 加载数据
		// 	// this.getWaterfallList()
		// },
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
					this.itemList[needIndex].push(this.bookList[index])
					heights[needIndex] += item.offsetHeight
				})
				// 重置
				this.needCompute = false
				// 通知父组件 DOM 元素更新完毕
				this.$nextTick(() => {
					// 初始化 better-scroll
					setTimeout(() => {
						this.$emit('freshBScroll')
					}, 20)
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
			// 显示详情
			showDetail (id) {
				this.$router.push({
					path: 'detail',
					query: {
						id: id
					}
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
					console.log(isFav)
					let params = {
						uid: localStorage.getItem('userId'),
						sid: item.id,
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
		},
		filters: {
			// 类型文字
			getTypeText (arr) {
				if (!arr.length) {
					return ''
				}
				let str = ''
				arr.forEach(item => {
					str += item + '|'
				})
				return str.substr(0, str.length - 1)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'list.styl'
</style>
