<template>
	<div class="search-home-page" style="min-height: 100%">
		<keep-alive>
			<router-view class="page" v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view class="page" v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'search-home-page',
		data () {
			return {}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.search-home-page
		> .page
			width 100%
			min-height 100%
			position absolute
	// @import './index.styl'
</style>