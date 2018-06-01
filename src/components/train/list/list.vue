<template>
	<ul class="train-list">
		<li v-for="(item, index) in listData" class="list-item underline train-item" @click.prevent.stop="openDetail(item.id)">
			<div class="train-media">
				<img v-lazy="item.logo">
			</div>
			<p class="train-name">{{ item.title }}</p>
			<div class="train-bottom">
				<span>活动时间：{{ item.begin_time | getUpdateDay }}至{{ item.end_time | getUpdateDay }}</span>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'train-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		},
		methods: {
			openDetail (id) {
				this.$router.push({
					path: '/train/detail',
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