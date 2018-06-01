<template>
	<div class="cart-buttons">
		<transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
			<img class="cart-reduce" v-if="num" @click.stop.prevent="decreaseCart(index)" src="./reduce_icon.png">
		</transition>
		<transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
			<span class="cart-num" v-if="num">{{ num }}</span>
		</transition>
		<img class="cart-add" @click.stop.prevent="increaseCart(index, $event)" src="./add_icon.png">
	</div>
</template>

<script>
	export default {
		props: {
			index: {
				type: Number
			},
			num: {
				type: Number
			}
		},
		mounted () {},
		data () {
			return {}
		},
		methods: {
			// 减少
			decreaseCart (index) {
				// this.$emit('decrement', index)
				this.$root.Bus.$emit('decrement', index)
			},
			// 增加
			increaseCart (index, event) {
				// this.$emit('increaseCart', index, event)
				this.$root.Bus.$emit('increment', index, event)
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "cartControl.styl";
</style>
