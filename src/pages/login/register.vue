<template>
	<div class="page-sign-register">
		<v-header :entrance="'login'" :title="'用户注册'"></v-header>
		<form id="form-register" class="form-register form-wxw">
			<!-- 手机号 -->
			<div class="form-group">
				<span class="tag-mobile tag-input"></span>
				<input id="login-mobile" type="number" pattern="[0-9]*" ref="mobile" class="form-control" placeholder="请输入您的手机号码" v-model="mobile">
				<div class="actions-group">
					<div v-if="mobile.length" class="btn-clear btn-action" @click="clearInput('mobile')"></div>
				</div>
			</div>
			<!-- 验证码 -->
			<div class="form-group">
				<span class="tag-captcha tag-input"></span>
				<input v-model="code" ref="btn" id="login-captcha" type="text" class="form-control" placeholder="请输入您的验证码">
				<div class="actions-group">
					<button class="btn-captcha btn" disabled type="button" ref="btn" @click="getVerification()"><span v-if="canClick">{{ btnText }}</span><span v-if="!canClick">{{ seconds }}S后重新发送</span></button>
				</div>
			</div>
			<!-- 密码 -->
			<div class="form-group">
				<span class="tag-pwd tag-input"></span>
				<input id="login-pwd" type="password" class="form-control" placeholder="请输入您的登录密码" v-model="password" ref="passwordShow">
				<div class="actions-group">
					<div v-if="password.length" class="btn-clear btn-action" @click="clearInput('password')"></div>
					<div class="btn-visible btn-action" :class="{active: passwordShow}" @click="togglePwdShow('passwordShow')"></div>
				</div>
			</div>
			<div class="form-group form-group-ua">
				<label class="label-ua" :class="{active: hasRead}" @click="toggleRead()">
					<span class="tag-cb"></span> 我已阅读并同意《微校网用户协议》
				</label>
			</div>
			<div class="form-group form-group-submit">
				<button class="btn-submit btn btn-block btn-primary btn-lg" type="button" ref="submit" disabled="" @click="doSubmit()">
					提交
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import header from '@/components/header/header'
	import { checkMobile, getMd5 } from '@/common/js/common.js'
	export default {
		name: 'register',
		data () {
			return {
				mobile: '', // 手机
				password: '', // 密码
				code: '', // 验证码
				canClick: true, // 按钮可点击
				btnText: '点击获取验证码', // 按钮内容
				seconds: 60, // 计时
				passwordShow: false, // 密码显示
				hasRead: true, // 已读
			}
		},
		computed: {
			canSubmit () {
				return !(this.code.length < 4 || !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.mobile) || this.password.length < 6 || !this.hasRead)
			}
		},
		watch: {
			// 验证码
			code (curVal, oldVal) {
			},
			mobile (newVal, oldVal) {
				this.$refs.btn.disabled = !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(newVal)
			},
			// 是否可提交
			canSubmit (newVal, oldVal) {
				this.$refs.submit.disabled = !newVal
			},
			// 密码
			password (newVal, oldVal) {
				let patten = new RegExp('[`~!#$^&*()=:;,[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“。，、？‘]')
				let lastText = newVal.substr(-1, 1)
				if (patten.test(lastText)) {
					this.Toats.warning({
						title: '请勿输入特殊字符'
					})
					this.password = this.password.substr(0, this.password.length - 1)
				}
			}
		},
		mounted () {
		},
		created () {
		},
		methods: {
			// 获取验证码
			getVerification () {
				if (!checkMobile(this.$refs.mobile)) {
					return
				}
				this.Toast.loading({
					title: '正在获取验证码...'
				})
				let _data = {
					mobile: this.mobile,
					sign: getMd5(this.mobile)
				}
				// 发送请求
				this.$ajax.sendVerifyCode(_data)
					.then((res) => {
						console.log(_data)
						this.Toast.success({
							title: res.data.data.tip
						})
						this.$refs.btn.disabled = true
						this.canClick = false
						this.setSeconds()
					}, err => {
						console.log(err)
					})
			},
			// 倒计时
			setSeconds () {
				var that = this
				if (this.seconds <= 0) {
					this.resetBtn()
					return
				}
				setTimeout(function () {
					that.seconds -= 1
					that.setSeconds()
				}, 1000)
			},
			// 清空输入内容
			clearInput (type) {
				this['' + type + ''] = ''
			},
			// 切换密码显示
			togglePwdShow (type) {
				this['' + type + ''] = !this['' + type + '']
				this.$refs['' + type + ''].type = this['' + type + ''] ? 'text' : 'password'
			},
			// 切换已读未读
			toggleRead () {
				this.hasRead = !this.hasRead
			},
			// 重置按钮属性
			resetBtn () {
				this.canClick = true
				this.btnText = '点击再次获取'
				this.$refs.btn.disabled = false
				this.seconds = 60
			},
			// 提交
			doSubmit () {
				if (!this.hasRead) {
					this.Dialog.alert({
						title: '您当前未确认已阅读并同意',
						msg: '《微校网用户协议》'
					})
					return
				}
				this.Toast.loading({
					title: '正在验证...'
				})
				// 验证验证码
				this.$ajax.validateVerifyCode({
					mobile: this.mobile,
					code: this.code,
					sign: getMd5(this.mobile)
				})
					.then((res) => {
						this.$ajax.register({
							mobile: this.mobile,
							password: this.password
						})
							.then((res) => {
								this.Toast.success({
									title: '注册成功！'
								})
								localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
								this.$router.goBack()
							}, err => {
								console.log(err)
							})
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
