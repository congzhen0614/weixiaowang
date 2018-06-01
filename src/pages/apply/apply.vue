<template>
	<div class="apply" style="height: 100%">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import { getQueryString } from '../../common/js/date.js'
	export default {
		name: 'apply',
		data () {
			return {}
		},
		mounted () {
			// 判断浏览器
			if (this.isWeixin) {
				// 判断微信登陆返回 status
				if (getQueryString('status')) {
					if (parseInt(getQueryString('status')) === 0) {
						localStorage.setItem('userId', getQueryString('uid'))
						localStorage.setItem('wxOpenId', getQueryString('openid'))
					} else {
						window.reload()
					}
				}
			}
		}
	}
</script>

<style></style>