<template>
	<div class="book_search_list">
  	<ul class="new-list">
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
		name: 'book_search_list',
		props: {
			bookList: {
				type: Array
			}
		},
		data () {
			return {
				itemWidth: (window.innerWidth - 10 * 2 - 5) / 2 + 'px',
				sides: 2,
				itemList: []
			}
		},
		watch: {
			bookList (newVal, oldVal) {
			}
		},
		computed: {},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 显示详情
			showDetail (id) {
				this.$router.push({
					path: 'detail',
					query: {
						id: id
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