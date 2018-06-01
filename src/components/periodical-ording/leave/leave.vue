<template>
	<div class="leave">
		<div class="box">
			<textarea class="area" v-model="leaveText" placeholder="请在此输入您的留言内容！"></textarea>
			<span><span class="text" :class="{ warn: leaveText.length > 50 }">{{ leaveText.length || 0 }}</span>/50</span>
			<button @click="doSubmit()">提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'leave',
		data () {
			return {
				leaveText: ''
			}
		},
		created () {
			document.title = '留言'
		},
		methods: {
			doSubmit () {
				if (!this.leaveText.length) {
					this.Toast.warning({
						title: '小主<br>请先输入留言再提交'
					})
					return
				}
				if (this.leaveText.length > 50) {
					this.Toast.warning({
						title: '小主，您当前输入的内容已超出上限'
					})
					return
				}
				this.$root.Bus.$emit('leaveTextChange', this.leaveText)
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './leave.styl'
</style>