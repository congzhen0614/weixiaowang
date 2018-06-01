<template>
	<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<section class="type-selector">
			<ul class="selector-list">
				<li v-for="(item, index) in typeList" :class="{ active: index === typeIndex }" class="item" @click.prevent.stop="changeTypeIndex(index)">{{ item.name }}</li>
			</ul>
		</section>
	</transition>
</template>

<script>
	export default {
		name: 'type-selector',
		props: {
			typeList: {
				type: Array
			}
		},
		data () {
			return {
				typeIndex: 0
			}
		},
		methods: {
			// 切换类型
			changeTypeIndex (index) {
				this.typeIndex = index
				this.$emit('changeTypeIndex', index)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	// @import './index.styl'
</style>