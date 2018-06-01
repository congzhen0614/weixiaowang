<template>
	<div class="contracts">
		<v-header :entrance="'apply'" :title="title"></v-header>
		<div>
			<ul class="info">
				<li class="main" v-for="(item, index) in list">
					<div class="main-header">
						<div class="left">
							<span class="type">{{ item.ticket_name }}</span>
							<span v-if="item.is_group" class="group">团</span>
						</div>
						<div class="right">
							<span class="price">￥{{ item.item_fee }}</span>
							<img src="./child_info.png">
						</div>
					</div>
					<ul class="list">
						<li class="name underline">
							<span class="desc">孩子姓名</span>
							<input v-model="item.kid_name" required="" type="text" name="name" placeholder="请在此输入孩子姓名">
						</li>
						<li class="gender underline">
							<span class="desc">孩子性别</span>
							<div class="box">
								<div class="item" @click="changeGenderIndex(index, 1)">
									<div class="img" :class="{ active: item.kid_sex === 1 }"></div>
									<span class="">女生</span>
								</div>
								<div class="item man" @click="changeGenderIndex(index, 0)">
									<div class="img" :class="{ active: item.kid_sex === 0 }"></div>
									<span class="">男生</span>
								</div>
							</div>
						</li>
						<li class="parent-name underlzine">
							<span class="desc">家长姓名</span>
							<input v-model="item.name" required="" type="text" name="parentName" placeholder="请在此输入家长姓名">
						</li>
						<li class="parent-tel underline">
							<span class="desc">家长电话</span>
							<input v-model="item.tel" ref="mobile" required="" pattern="[0-9]*" type="number" name="parentTel" placeholder="请在此输入家长电话">
						</li>
						<li @click="showPicker(index)" class="relation list-item-arrow">
							<span class="desc">关系</span>
							<div>{{ item.relation }}</div>
							<input type="hidden" name="relation" v-model="item.relation" required placeholder="请选择与孩子的关系">
							<!-- <input v-model="item.relation" readonly="" required="" type="text" name="parentTel" placeholder="请在此输入关系"> -->
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 底部提交按钮 -->
		<footer class="footer" @click="doSubmit()">
			提交
		</footer>
	</div>
</template>

<script>
	import header from '@/components/header/header'
	import { checkInput, checkMobile } from '@/common/js/common'
	// 选择器组件
	import Picker from 'better-picker'
	// 选择数据
	let data1 = [{
		text: '爸爸',
		value: 1
	}, {
		text: '妈妈',
		value: 2
	}, {
		text: '爷爷',
		value: 3
	}, {
		text: '奶奶',
		value: 4
	}, {
		text: '外公',
		value: 5
	}, {
		text: '外婆',
		value: 6
	}, {
		text: '其他',
		value: 7
	}]
	export default {
		name: 'realname',
		data () {
			return {
				noCheckSrc: `gender_check.png`,
				hasCheckSrc: `gender_check_active.png`,
				// 孩子信息
				childInfoSrc: `child_info.png`,
				title: '请填写报名人员信息',
				// 可以提交
				canSubmit: true,
				// 有被选中的票
				list: JSON.parse(this.$route.query.overList).filter((item) => {
					item.kid_name = ''
					item.kid_sex = 0
					item.name = ''
					item.tel = ''
					item.relation = ''
					return item
				}),
				// 第几个人
				personIndex: 0,
				// 关系数组
				relationList: data1,
				picker: new Picker({
					data: [data1],
					selectedIndex: [0, 0, 0],
					title: '角色'
				})
			}
		},
		computed: {
		},
		mounted () {
			document.title = this.title
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
			let _that = this
			// 选中
			this.picker.on('picker.select', (index, selectedIndex) => {
				_that.list[_that.personIndex].relation = _that.relationList[index - 1].text
			})
		},
		methods: {
			// 更换性别
			changeGenderIndex (itemIndex, index) {
				this.list[itemIndex].kid_sex = index
			},
			// 提交
			doSubmit () {
				// 验证
				if (!checkInput()) {
					return
				}
				this.$refs.mobile.forEach((item) => {
					if (!checkMobile(item)) {
						this.canSubmit = false
					}
				})
				if (!this.canSubmit) {
					this.canSubmit = true
					return
				}
				let users = []
				let _uid = localStorage.getItem('userId')
				this.list.forEach((item, index) => {
					let obj = {}
					obj.uid = _uid
					obj.cls = item.cls
					// 活动 id
					obj.sid = this.$route.query.active_id
					// 订单 id
					obj.trade_detail_id = item.id
					// 票务 id
					obj.trade_id = item.trade_id
					obj.ticket_id = item.ticket_id
					obj.kid_name = item.kid_name
					obj.kid_sex = item.kid_sex
					obj.name = item.name
					obj.tel = item.tel
					obj.relation = item.relation
					users.push(obj)
				})
				this.Toast.loading({
					title: '提交中...'
				})
				let _data = {
					_uid: _uid,
					users: JSON.stringify(users),
					type: this.$route.query.type
				}
				this.$ajax.applyUserSave(_data)
					.then((res) => {
						if (res.data.msg === 'success') {
							// 判断是否免费
							if (parseFloat(this.$route.query.fee) <= 0) {
								let id = this.$route.query.id
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
											window.location.href = this.$route.query.href
										})
									}, err => {
										console.log(err)
									})
								return
							}
							let fee = this.$route.query.fee
							let id = this.$route.query.id
							let outtradeno = this.$route.query.outtradeno
							let cls = this.$route.query.cls
							let href = this.$route.query.href
							let isRealname = true
							let protocol = window.location.protocol
							let host = window.location.host
							// 切换页面
							window.location.href = `${protocol}//${host}/pay?isRealname=${isRealname}&cls=${cls}&fee=${fee}&id=${id}&outtradeno=${outtradeno}&href=${href}`
							// this.$router.push({
							// 	path: '/pay',
							// 	query: {
							// 		fee: fee,
							// 		outtradeno: outtradeno,
							// 		id: id,
							// 		cls: cls,
							// 		isRealname: isRealname,
							// 		href: href
							// 	}
							// })
						}
					}, err => {
						console.log(err)
					})
			},
			// 显示选择器
			showPicker (index) {
				this.personIndex = index
				this.picker.show()
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