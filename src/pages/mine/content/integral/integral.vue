<template>
	<div class="mine-integral-page">
		<v-top></v-top>
		<section class="top-content" :style="{ height: topHeight }">
			<div class="center">
				<img src="./center_bg.png">
			</div>
			<div class="integral-icon">
				<img src="./integral_icon.png">
			</div>
		</section>
	</div>
</template>

<script>
	import top from './top/top'
	export default {
		name: 'mine-integral',
		data () {
			return {
				topHeight: window.innerWidth / 750 * 894 + 'px'
			}
		},
		computed: {
		},
		components: {
			'v-top': top
		},
		created () {
		},
		mounted () {
		},
		methods: {
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './integral.styl'
</style>