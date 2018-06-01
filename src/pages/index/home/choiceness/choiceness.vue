<template>
	<section class="home-choiceness">
		<p class="choiceness-title">
			<span class="text">微校精选</span>
		</p>
		<!-- 列表 -->
		<v-listView :listData="listData"></v-listView>
	</section>
</template>

<script>
	import listView from '@/components/circle/list/list'
	export default {
		name: 'home-choiceness',
		data () {
			return {
				listData: [],
				pageNo: 1
			}
		},
		computed: {
		},
		methods: {
			// 加载数据
			getData () {
				this.$ajax.getCircleList({
					page_number: this.pageNo
				}).then(res => {
					let list = res.data.data.list
					// 通知父组件可加载更多
					if (list.length >= 20) {
						this.$emit('canLoadMore', true)
					}
					this.listData = this.listData.concat(list)
					// 通知父组件更新
					this.$nextTick(() => {
						this.$emit('scrollRefresh')
					})
				}, err => {
					console.log(err)
				})
			},
			// 加载更多
			loadMore () {
				this.pageNo += 1
				this.getData()
			}
		},
		components: {
			'v-listView': listView
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './choiceness.styl'
</style>