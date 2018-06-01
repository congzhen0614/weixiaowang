<template>
	<section class="peridocial-ording-home" :style="{ paddingTop: doubleEleven ? 0 : '' }">
		<div v-if="!doubleEleven" class="tab">
			<div class="" :class="{ active: tabIndex === 0 }" @click="changeTabIndex(0)">
				{{ title }}
			</div>
			<div class="" :class="{ active: tabIndex === 1 }" @click="changeTabIndex(1)">
				关于我们
			</div>
		</div>
		<component :is="tabView" :doubleEleven="doubleEleven" :listData="listData" :title="title" :area="area" :oldSum="oldSum" :nowSum="nowSum"  ref="list"></component>
	</section>
</template>
<script>
	import list from '../list/list'
	import about from '../about/about'
	export default {
		name: 'periodical-ording',
		props: ['listData', 'tabIndex', 'title', 'doubleEleven', 'area'],
		data () {
			return {
				tabList: ['list', 'about']
			}
		},
		computed: {
			// 总价
			nowSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * item.price
				})
				return sum
			},
			// 原价
			oldSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * item.oldPrice
				})
				return sum
			},
			tabView () {
				return this.tabList[this.tabIndex]
			}
		},
		mounted () {
			document.title = '选购商品'
		},
		components: {
			list,
			about
		},
		methods: {
			changeTabIndex (index) {
				this.$emit('changeTabIndex', index)
			},
			// 添加
			addNum (index) {
				this.$refs.list.addNum(index)
			},
			// 减少
			reduceNum (index) {
				this.$refs.list.reduceNum(index)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'	
</style>