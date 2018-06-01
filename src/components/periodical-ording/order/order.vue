<template>
	<section class="order">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</section>
</template>

<script>
	export default {
		name: 'order',
		data () {
			return {}
		},
		created () {
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
			// 判断浏览器
			if (this.isWeixin) {
				// 判断微信登陆返回 status
				if (this.$route.query.hasOwnProperty('status')) {
					if (parseInt(this.$route.query.status) === 0) {
						localStorage.setItem('userId', this.$route.query.uid)
						localStorage.setItem('wxOpenId', this.$route.query.openid)
					} else {
						window.reload()
					}
				}
			}
		},
		beforeRouteLeave (to, from, next) {
			if (to.path === '/pay') {
				next(true)
				return
			}
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