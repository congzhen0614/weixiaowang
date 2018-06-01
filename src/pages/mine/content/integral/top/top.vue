<template>
	<header ref="top" class="integral-header">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./home_icon.png">
		</div>
		<div ref="searchArea" class="search-area" @click="openSearch()">
			<div class="left-part">
				在此输入搜索内容
			</div>
			<div class="right-part">
				<img ref="searchIcon" src="./search_icon_black.png">
			</div>
		</div>
		<div class="message">
			<img ref="messageIcon" src="./shopcat_icon.png">
		</div>
	</header>
</template>

<script>
	export default {
		name: 'integral-top',
		data () {
			return {}
		},
		computed: {
		},
		created () {
		},
		methods: {
			// 打开搜索页
			openSearch () {
				this.$router.push({
					path: '/integral/search'
				})
			},
			// 返回
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>