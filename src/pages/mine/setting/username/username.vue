<template>
	<div class="mine-setting-username">
		<!-- 头部 -->
		<section class="mine-setting-username-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">用户名</p>
		</section>
		<!-- 输入 -->
		<section class="main">
			<div class="username-box">
				<input type="text" placeholder="请输入您的用户名称" v-model="username">
				<div v-if="username.length" class="close-icon" @click="clearInput()">
					<img src="./clear_icon.png">
				</div>
			</div>
			<div class="submit-btn" :class="{ active: canSubmit }">
				完成
			</div>
		</section>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				// 用户名
				username: ''
			}
		},
		computed: {
			canSubmit () {
				return this.username.length
			}
		},
		mounted () {
		},
		methods: {
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 保存
			doSave () {
				this.goBack()
			},
			// 清除输入
			clearInput () {
				this.username = ''
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './username.styl'
</style>