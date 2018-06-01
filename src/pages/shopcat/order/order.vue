<template>
	<section class="shopcat-order">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" class="child-page"></router-view>
		</keep-alive>
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<router-view v-if="!$route.meta.keepAlive" class="child-page"></router-view>
		</transition>
	</section>
</template>

<script>
	export default {
		name: 'order',
		data () {
			return {}
		},
		created () {
		},
		beforeRouteLeave (to, from, next) {
			let path = to.path
			if (path === '/pay' || path === '/shopcat/address' || '/mine/coupon') {
				next(true)
				return
			}
			// 弹窗提示
			this.Dialog.alert({
				title: '温馨提示',
				msg: '小主，确定要放弃当前购物吗',
				buttons: ['去逛逛', '再想想']
			}, (res) => {
				if (res.buttonIndex === 2) {
					next(false)
					return
				}
				next(true)
			})
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './order.styl'
</style>
