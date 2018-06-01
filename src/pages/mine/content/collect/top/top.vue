<template>
	<section class="mine-collect-top">
		<div class="back-icon" @click="goBack()">
			<img src="./back_icon.png">
		</div>
		<p class="title">我的收藏</p>
	</section>
</template>

<script>
	export default {
		data () {
			return {}
		},
		created () {
		},
		methods: {
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './top.styl'
</style>