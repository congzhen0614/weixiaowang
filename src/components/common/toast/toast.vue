<template>
	<div class="toast">
		<div class="toast-header">{{ title }}</div>
		<!-- <div class="toast-body">{{ message }}</div> -->
	</div>
</template>

<script>
	export default {
		name: 'toast',
		props: ['toast'],
		data () {
			return {}
		},
		computed: {
			title () {
				return this.toast.hasOwnProperty('title') ? this.toast.title : '请输入正确的信息'
			},
			message () {
				return this.toast.hasOwnProperty('message') ? this.toast.message : '请输入正确的信息'
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './toast.styl'
</style>