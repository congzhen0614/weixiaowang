<template>
		<section class="no-data-box">
			<img src="./no_data_pic.png">
			<p class="text">{{ text || '暂无内容'}}</p>
		</section>
</template>

<script>
	export default {
		name: 'empty',
		props: {
			text: {
				type: String
			}
		},
		data () {
			return {
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './empty.styl'
</style>