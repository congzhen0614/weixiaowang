<template>
	<div class="mine-order-evaluate">
		<!-- 头部 -->
		<section class="mine-order-evaluate-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">评价</p>
		</section>
		<!-- 列表 -->
		<v-list class="evaluate-list" :listData="listData" :entrance="'evaluate'"></v-list>
	</div>
</template>

<script>
	import list from '../detail/list/list'
	export default {
		data () {
			return {
				listData: []
			}
		},
		computed: {
			// 请求传参
			params () {
				let params = {}
				params.id = this.$route.query.id
				params.cls = this.$route.query.cls
				return params
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
				this.$ajax.tradeDetail(this.params).then(res => {
					// console.log(res)
					this.listData = res.data.bookMagazineView.itemList
				}, err => {
					console.log(err)
				})
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		},
		components: {
			'v-list': list
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './evaluate.styl'
</style>