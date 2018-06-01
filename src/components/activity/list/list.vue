<template>
	<ul class="activity-list">
		<li v-for="(item, index) in listData" class="list-item underline activity-item" @click.prevent.stop="openDetail(item.id)">
			<div class="activity-media">
				<img v-lazy="item.logo">
			</div>
			<p class="activity-name">{{ item.title }}</p>
			<div class="activity-bottom">
				<span>活动时间：{{ item.begin_time | getUpdateDay }}至{{ item.end_time | getUpdateDay }}</span>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'activity-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		methods: {
			// 查看详情
			openDetail (id) {
				this.$router.push({
					path: '/activity/detail',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>