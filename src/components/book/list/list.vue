<template>
	<ul class="book-list">
		<li v-for="(item, index) in listData" class="list-item underline dis-flex" @click="openDetail(item.id)">
			<div class="left-media">
				<img v-lazy="item.logo">
			</div>
			<div class="right-part">
				<div class="box">
					<p class="title">{{ item.name || '' }}</p>
					<p class="suggest">
						<span v-if="item.type_id" :class="{ borderRight: item.age_id }" class="times">{{ item.type_id }}&nbsp;&nbsp;</span>
						<span v-if="item.age_id" class="grade">&nbsp;&nbsp;{{ item.age_id }}</span>
					</p>
					<div class="bottom" @click.prevent.stop="">
						<span class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getDecimal }}</span>
						<span class="price old-price">￥{{ item.original_fee }}</span>
					</div>
					<div class="cart">
						<!-- <span>收藏</span> -->
						<span @click.prevent.stop="addToShopcat(item.id)">加入购物车</span>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'book-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		mounted () {
			// alert(JSON.stringify(this.listData))
		},
		methods: {
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
					_uid: localStorage.getItem('userId'),
					id: id,
					cls: '2'
				}
				// 提示
				this.Toast.loading({
					title: '提交中...'
				})
				// 请求服务器
				this.$ajax.shopcatSave(params).then(res => {
					console.log(res)
					this.Toast.success({
						title: '添加成功！'
					})
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>
