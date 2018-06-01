<template>
	<section class="mine-order-top">
		<div class="back-icon" @click="goBack()">
			<img src="./back_icon.png">
		</div>
		<p class="title">{{ title }}订单</p>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				title: ''
			}
		},
		created () {
			// 标题
			this.title = this.$route.query.title || '刊物'
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