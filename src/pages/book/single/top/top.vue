<template>
	<header ref="top" class="book-header single">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./back_icon.png">
		</div>
		<div ref="searchArea" class="title">
			{{ title }}
		</div>
		<div class="message" @click="openShopcat()">
			<img ref="messageIcon" src="./shopcat_icon.png">
			<span class="dot" v-if="shopNum>0">{{ shopNum }}</span>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'book-top',
		props: {
			scrollTop: {
				type: Number
			},
			title: {
				type: String
			}
		},
		data () {
			return {
				shopcatList: [],
				shopNum: 0
			}
		},
		computed: {
		},
		created () {
			this.getShopcat()
		},
		methods: {
			// 获取购物车
			getShopcat () {
				this.$ajax.shopcatList().then(res => {
					this.shopcatList = res.data.list
					this.shopcatList.forEach(item => {
						this.shopNum += Number(item.quantity)
					})
				}, err => {
					console.log(err)
				})
			},
			// 打开搜索页
			goBack () {
				this.$router.goBack()
			},
			openShopcat () {
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
