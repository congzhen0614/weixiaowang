<template>
	<ul class="result-list">
		<!-- 图书 -->
		<v-bookList v-if="cls === '2'" :listData="listData"></v-bookList>
		<!-- 商城 -->
		<v-mallList v-if="cls === '12'"  :listData="listData"></v-mallList>
		<!-- 杂志 -->
		<v-magazineList v-if="cls === '20'"  :listData="listData"></v-magazineList>
		<!-- 活动 -->
		<v-activityList v-if="cls === '14'"  :listData="listData"></v-activityList>
		<!-- 培训 -->
		<v-trainList v-if="cls === '19'"  :listData="listData"></v-trainList>
		<!-- 圈子 -->
		<v-circleList v-if="cls === '31'"  :listData="listData"></v-circleList>
	</ul>
</template>
<script>
	import mallList from '@/components/mall/list/list'
	import circleList from '@/components/circle/list/list'
	import magazineList from '@/components/magazine/list/list'
	import activityList from '@/components/activity/list/list'
	import bookList from '@/components/book/list/list'
	import trainList from '@/components/train/list/list'
	export default {
		name: 'search-result-list',
		props: {
			listData: {
				type: Array
			},
			cls: {
				type: String
			}
		},
		data () {
			return {}
		},
		components: {
			'v-mallList': mallList,
			'v-circleList': circleList,
			'v-magazineList': magazineList,
			'v-activityList': activityList,
			'v-bookList': bookList,
			'v-trainList': trainList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>