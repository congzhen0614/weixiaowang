<template>
	<div class="detail-info">
		<v-header></v-header>
		<div class="tab">
			<div class="" :class="{ active: tabIndex === 0 }" @click="changeTabIndex(0)">
				目录
			</div>
			<div class="" :class="{ active: tabIndex === 1 }" @click="changeTabIndex(1)">
				出版信息
			</div>
		</div>
		<component :is="tabView"></component>
		<v-shopcat></v-shopcat>
	</div>
</template>

<script>
	import header from '../../header/header'
	import shopcat from '../../shopcat/shopcat'
	import catalog from '../catalog/catalog'
	import publish from '../catalog/publish'
	export default {
		name: 'info',
		data () {
			return {
				tabIndex: 0,
				tabList: ['catalog', 'publish']
			}
		},
		mounted () {
			this.tabIndex = this.$route.query.index
		},
		computed: {
			tabView () {
				return this.tabList[this.tabIndex]
			}
		},
		components: {
			'v-header': header,
			'v-shopcat': shopcat,
			catalog,
			publish
		},
		methods: {
			changeTabIndex (index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './info.styl'	
</style>