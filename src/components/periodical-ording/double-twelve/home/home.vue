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
		<component :is="tabView" :doubleEleven="doubleEleven" :listData="listData" :title="title" :area="area" :oldSum="oldSum" :nowSum="nowSum"  ref="list" @decrement="decrement" @increaseCart="increaseCart"></component>
	</section>
</template>
<script>
	import list from '../list/list'
	import about from '../../about/about'
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
		beforeRouteEnter (to, from, next) {
			console.log('beforeRouteEnter')
			next(vm => {
				vm.$refs.list.backToLastTop()
			})
		},
		mounted () {
			document.title = '选购商品'
		},
		components: {
			list,
			about
		},
		methods: {
			// 刷新
			initBetterScroll () {
				this.$refs.list.initBetterScroll()
			},
			// 滚动回原位置
			backToLastTop () {
				this.$refs.list.backToLastTop()
			},
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
			},
			// 减少
			decrement (index) {
				this.$emit('decrement', index)
			},
			// 增加
			increaseCart (index, event) {
				this.$emit('increaseCart', index, event)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'	
</style>