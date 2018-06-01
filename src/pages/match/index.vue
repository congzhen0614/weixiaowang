<template>
	<div class="match-index-page" @click="hideSelector()">
		<section class="top-content" :style="{ height: topHeight, paddingTop: topPadding}">
			<div class="title">
				<img src="./title.png">
			</div>
			<div class="logo">
				<img src="./logo.png">
			</div>
			<div class="sun-content">
				<img src="./sun.png" :style="{ width: sunWidth }">
			</div>
			<div class="left-cloud-content" :style="{ top: leftCloudTop, left: leftCloudLeft }">
				<img src="./left_cloud.png" :style="{ width: leftCloudWidth }">
			</div>
			<div class="right-cloud-content" :style="{ top: rightCloudTop, right: rightCloudRight }">
				<img src="./right_cloud.png" :style="{ width: rightCloudWidth }">
			</div>
		</section>
		<section class="bottom-content" :style="{ height: bottomHeight, paddingTop: bottomPadding }">
			<div class="main-content">
				<img src="./content.png" :style="{ width: contentWidth }">
			</div>
			<div class="time-content" :style="{ top: timeTop }">
				<img src="./time.png" :style="{ width: timeWidth }">
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'match-index-page',
		data () {
			return {
				topHeight: window.innerWidth / 750 * 440 + 'px',
				bottomHeight: window.innerWidth / 750 * 894 + 'px',
				baseTop: window.innerWidth / 375 * 355 / 2 + 'px',
				timeTop: window.innerWidth / 375 * 355 / 2 + 'px',
				contentWidth: window.innerWidth / 750 * 430 + 'px',
				timeWidth: window.innerWidth / 750 * 450 + 'px',
				sunWidth: window.innerWidth / 750 * 162 + 'px',
				bottomPadding: window.innerWidth / 750 * 88 + 'px',
				topPadding: window.innerWidth / 750 * 230 + 'px',
				leftCloudTop: window.innerWidth / 750 * 95 + 'px',
				leftCloudWidth: window.innerWidth / 750 * 260 + 'px',
				leftCloudLeft: window.innerWidth / 750 * 45 + 'px',
				rightCloudTop: window.innerWidth / 750 * 50 + 'px',
				rightCloudWidth: window.innerWidth / 750 * 140 + 'px',
				rightCloudRight: window.innerWidth / 750 * 55 + 'px'
			}
		},
		computed: {
		},
		created () {
		},
		mounted () {},
		methods: {
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>