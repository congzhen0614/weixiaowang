<template>
	<div class="catalog">
		目录
	</div>
</template>

<script>
	import header from '../../header/header'
	export default {
		name: 'catalog',
		data () {
			return {}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.catalog
	padding: 0.2rem
</style>