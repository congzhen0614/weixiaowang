<template>
	<div class="contracts">
		<v-header :entrance="'apply'" :title="title"></v-header>
		<div class="main">
			<div class="name underline">
				<span class="desc">联系人</span>
				<input type="text" required name="name" v-model="name" placeholder="请在此输入联系人名称">
			</div>
			<div class="tel">
				<span class="desc">手机</span>
				<input type="number" required ref="mobile" pattern="[0-9]*" name="mobile" v-model="mobile" placeholder="请在此输入联系人电话">
			</div>
		</div>
		<!-- 底部提交按钮 -->
		<footer class="footer" @click="doSubmit()">
			提交
		</footer>
	</div>
</template>

<script>
 	// 活动/培训报名
	import header from '@/components/header/header'
	import { checkInput, checkMobile } from '@/common/js/common.js'
	export default {
		name: 'contracts',
		data () {
			return {
				needInfo: false,
				name: '',
				mobile: '',
				title: '请填写联系人信息'
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
			})
		},
		mounted () {
			document.title = this.title
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
		},
		methods: {
			// 提交
			doSubmit () {
				if (!checkInput() || !checkMobile(this.$refs.mobile)) {
					return
				}
				var _data = {
					name: this.name,
					mobile: this.mobile,
					active_id: this.$route.query.id,
					pay_channel: '', // 报名
					_uid: localStorage.getItem('userId'),
					cls: this.$route.query.cls,
					src: "10086"
				}
				// 讲id 取出
				JSON.parse(this.$route.query.comboList).forEach((item, index) => {
					if (item.num > 0) {
						_data['ticket_' + item.id + ''] = item.num
					}
				})
				this.Toast.loading({
					title: '报名中...'
				})
				this.$ajax.activetradeConfirm(_data)
					.then((res) => {
						let data = res.data
						if (data.msg === 'success') {
							// 判读是否实名制
							if (!parseInt(this.$route.query.is_realname)) {
								// 判断是否免费
								if (parseFloat(data.data.totle_final_fee) <= 0) {
									let id = res.data.data.id
									let _uid = localStorage.getItem('userId')
									let cls = this.$route.query.cls
									let _url = `/activetrade/enter?id=${id}&_uid=${_uid}&cls=${cls}`
									this.Toast.loading({
										title: '提交中...'
									})
									this.$ajax.getAjax(_url)
										.then((response) => {
											this.Dialog.alert({
												title: '报名成功！'
											}, (ret) => {
												// this.$root.Bus.$emit('backToRoot', '')
												let historyBack = -parseInt(localStorage.getItem('historyLength'))
												localStorage.setItem('historyLength', 0)
												// 返回
												this.$router.go(historyBack)
												// window.location.href = this.$route.query.href
											})
										}, err => {
											console.log(err)
										})
									return
								}
								let fee = data.data.totle_final_fee
								let id = data.data.id
								let outtradeno = data.data.no
								let cls = this.$route.query.cls
								let href = this.$route.query.href
								let protocol = window.location.protocol
								let host = window.location.host
								window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&id=${id}&outtradeno=${outtradeno}&href=${href}`
								return
							}
							this.$router.push({
								path: '/apply/realname',
								query: {
									// 订单数组
									overList: JSON.stringify(res.data.data.detail),
									active_id: this.$route.query.id,
									cls: this.$route.query.cls,
									fee: data.data.totle_final_fee,
									id: data.data.id,
									outtradeno: data.data.no,
									href: this.$route.query.href
								}
							})
						}
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

<style lang="stylus" rel="stylesheet/stylus">
	@import './contracts.styl'
</style>