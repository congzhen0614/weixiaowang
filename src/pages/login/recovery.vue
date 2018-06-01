<template>
	<div class="page-sign-recovery">
		<v-header :entrance="'login'" :title="'找回密码'"></v-header>
		<form id="form-recovery" class="form-recovery form-wxw">
			<div class="form-group">
				<span class="tag-mobile tag-input"></span>
				<input id="login-mobile" ref="mobile" type="number" pattern="[0-9]*" class="form-control" placeholder="请输入您的注册手机号码" v-model="mobile">
				<div class="actions-group">
					<div v-if="mobile.length" class="btn-clear btn-action" @click="clearInput()"></div>
				</div>
			</div>
			<div class="form-group">
				<span class="tag-captcha tag-input"></span>
				<input id="login-captcha" ref="code" v-model="code" pattern="[0-9]*" type="number" class="form-control" placeholder="请输入您的验证码">
				<div class="actions-group">
					<button class="btn-captcha btn" disabled type="button" ref="btn" @click="getVerification()"><span v-if="canClick">{{ btnText }}</span><span v-if="!canClick">{{ seconds }}S后重新发送</span></button>
				</div>
			</div>
			<div class="form-group form-group-submit">
				<button disabled="" ref="submit" class="btn-submit btn btn-block btn-primary btn-lg" type="button" @click="doSubmit()">
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
		name: 'recovery',
		data () {
			return {
				mobile: '',
				btnText: '点击获取验证码',
				canClick: true,
				seconds: 60,
				code: '',
				codeCanInput: false,
				uid: '',
			}
		},
		computed: {
			canSubmit () {
				if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.mobile) || this.code.length !== 4) {
					return false
				}
				return true
			}
		},
		watch: {
			mobile (newVal, oldVal) {
				this.$refs.btn.disabled = !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(newVal)
			},
			canSubmit (newVal, oldVal) {
				this.$refs.submit.disabled = !newVal
			},
			codeCanInput (newVal, oldVal) {
				this.$refs.code.readonly = !newVal
			}
		},
		mounted () {
		},
		methods: {
			// 清除输入
			clearInput () {
				this.mobile = ''
			},
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
				console.log(_data)
				// 发送请求
				this.$ajax.userGetPass(_data)
					.then((res) => {
						this.codeCanInput = true
						this.uid = res.data.data.id
					}, err => {
						console.log(err)
					})
				this.$refs.btn.disabled = true
				this.canClick = false
				this.setSeconds()
			},
			// 计时
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
			// 重置按钮属性
			resetBtn () {
				this.canClick = true
				this.btnText = '点击再次获取'
				this.$refs.btn.disabled = false
				this.seconds = 60
			},
			// 提交
			doSubmit () {
				let _data = {
					mobile: this.mobile,
					code: this.code,
					sign: getMd5(this.mobile+this.salt)
				}
				// 验证验证码
				this.$ajax.validateVerifyCode(_data)
					.then((res) => {
						// this.Dialog.alert({
						// 	title: '提交成功！',
						// 	msg: '凭短信密码登录'
						// }, (ret) => {
						// 	this.$router.goBack()
						// })
						this.Toast.success({
							title: '提交成功！请设置新密码'
						})
						this.$router.push({
							path: 'reset',
							query: {
								uid: this.uid
							}
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