<template>
	<div class="sales-comment">
		<div class="sales">
			<ul class="list">
				<li v-for="(item, index) in salesList" v-show="index < salesShowThreshold" class="item">
					<img :src="item.url">
				</li>
			</ul>
			<div class="show-all" v-if="holdOn" @click="showMore('sales')">
				<span class="text down" v-show="!salesUnfold">查看全部销量</span>
				<span class="text up" v-show="salesUnfold">收起</span>
			</div>
		</div>
		<v-comment></v-comment>
	</div>
</template>

<script>
	let salesList = []
	for (var i = 0; i < 60; i++) {
		salesList.push({
			url: `book.jpg`
		})
	}
	import comment from '../comment/comment'
	export default {
		name: 'sales',
		data () {
			return {
				salesList: salesList, // 销量数据
				salesThreshold: 45, // 销量阈值
				salesShowThreshold: 45, // 显示阈值
				salesUnfold: false // 是否展开
			}
		},
		computed: {
			salesText () {
				return this.salesList.length
			},
			holdOn () {
				return this.salesList.length > this.salesThreshold
			}
		},
		methods: {
			showMore (type) {
				this[type + 'Unfold'] = !this[type + 'Unfold']
				if (this[type + 'Unfold']) {
					this[type + 'ShowThreshold'] = this[type + 'List'].length
				} else {
					this[type + 'ShowThreshold'] = this[type + 'Threshold']
				}
			}
		},
		components: {
			'v-comment': comment
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './sales.styl'
</style>