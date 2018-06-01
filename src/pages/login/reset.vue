<template>
	<div class="login">
		<v-header :entrance="'login'" :title="'修改密码'"></v-header>
		<div class="page-sign-reset page-sign-login reset">
			<form id="form-login" class="form-login form-wxw">
				<div class="form-group">
					<span class="tag-pwd tag-input"></span>
					<input type="password" class="form-control password" placeholder="请输入您的新密码" v-model="password" ref="password">
					<div class="actions-group">
						<div v-if="password.length" class="btn-clear btn-action" @click="clearInput('password')"></div>
						<div class="btn-visible btn-action" :class="{active: pwdShow}" @click="togglePwdShow()"></div>
					</div>
				</div>
				<div class="form-group form-group-login">
					<button class="btn-login btn btn-block btn-primary btn-lg" ref="btn" type="button" disabled @click="doSubmit()">
						确认
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import header from '@/components/header/header'
	export default {
		name: 'hello',
		data () {
			return {
				mobile: this.$route.query.mobile,
				password: '', // 密码
				pwdShow: false, // 密码显示
				loginDisabled: true // 可登陆
			}
		},
		computed: {
			// 可用 QQ 登陆
			canQQLogin () {
				return !this.isWeixin && !(this.isWeibo && this.isIos)
			}
		},
		mounted () {
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
		},
		watch: {
			password (curVal, oldVal) {
				this.$refs.btn.disabled = !this.password || this.password.length < 6
			}
		},
		methods: {
			clearInput (type) {
				this['' + type + ''] = ''
			},
			togglePwdShow () {
				this.pwdShow = !this.pwdShow
				this.$refs.password.type = this.pwdShow ? 'text' : 'password'
			},
	    // 登录
			doSubmit () {
				this.Toast.loading({
					title: '提交中...'
				})
				this.$ajax.userUpdatePass({
					_uid: this.$route.query.uid,
					password: this.password
				})
				.then(res => {
					this.Toast.success({
						title: '设置密码成功！'
					})
					setTimeout(() => {
						// window.location.href = this.$route.query.href
						this.$router.go(-2)
					}, 500)
				}, err => {
					console.log(err)
				})
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
	@import './login.styl'
</style>
