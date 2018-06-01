<template>
	<div class="mine-address-edit">
		<!-- 头部 -->
		<section class="mine-address-index-top underline">
			<div class="back-icon" @click="$router.goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">地址管理</p>
			<div class="add-btn" @click="doSave()">
				保存
			</div>
		</section>
		<ul class="input-list">
			<li class="list-item">
				<span class="name">姓名</span>
				<input required v-model="address.name" type="text" placeholder="请输入收货人姓名">
			</li>
			<li class="list-item">
				<span class="name">手机</span>
				<input required v-model="address.mobile" ref="mobile" type="number" pattern="[0-9]*" placeholder="请输入您的手机号">
			</li>
			<li class="list-item">
				<span class="name">省市区</span>
				<span class="input" :class="{ placeholder: !cityArea }" @click="showPicker()">{{ cityArea || '请选择地区' }}</span>
				<!-- <input type="hidden" v-model="cityArea" required placeholder="请选择地区"> -->
				<img :src="rightArrowSrc">
			</li>
			<li class="list-item">
				<span class="name">地址</span>
				<input required v-model="address.address" type="text" placeholder="请输入您的详细地址">
			</li>
		</ul>
	</div>
</template>

<script>
	import Picker from 'better-picker'
	import area from '../../../../static/data/area.json'
	import { checkInput, checkMobile } from '@/common/js/common.js'
	export default {
		name: 'address',
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				picker: '',
				// 城市选择数据
				data: area.result,
				// 选中序号
				tempIndex: [0, 0, 0],
				// 地址
				address: {},
				ts: this.$route.query.address,
				newAddress: []
			}
		},
		computed: {
			// 动态城市选择数据
			linkageData () {
				let provinces = []
				let cities = []
				let areas = []
				this.data.forEach((item, index) => {
					provinces.push({
						text: item.provincename,
						value: item.provinceid
					})
				})
				this.data[this.tempIndex[0]].citylist.forEach(item => {
					cities.push({
						text: item.cityname,
						value: item.cityid
					})
				})
				this.data[this.tempIndex[0]].citylist[this.tempIndex[1]].regionlist.forEach(item => {
					areas.push({
						text: item.regionname,
						value: item.regionid
					})
				})
				return [provinces, cities, areas]
			},
			// 省市区
			cityArea () {
				if (!this.address.provinceName) {
					return ''
				}
				return this.address.provinceName + ',' + this.address.cityName + ',' + this.address.regionName
			}
		},
		watch: {
			linkageData () {
				// 填充数据
				this.picker.refill(this.linkageData)
			}
		},
		mounted () {
			// 创建地址
			// this.address = this.$route.query.address ? JSON.parse(this.$route.query.address) : {
			// 	_uid: localStorage.getItem('userId'),
			// 	name: '',
			// 	mobile: '',
			// 	address: '',
			// 	province_id: '',
			// 	province_name: '',
			// 	city_id: '',
			// 	city_name: '',
			// 	region_id: '',
			// 	region_name: '',
			// }

			this.address = this.$route.query.address ? JSON.parse(this.$route.query.address) : {
				address: '',
				cityId: '',
				// id: JSON.parse(this.ts).id,
				mobile: '',
				name: '',
				provinceId: '',
				regionId: '',
				uid: localStorage.getItem('userId'),

				provinceName: '',
				cityName: '',
				regionName: ''
			}
			// 初始化选择器
			this.picker = new Picker({
				data: this.linkageData,
				selectedIndex: [0, 0, 0],
				title: '请选择地区'
			})
			// 选中
			this.picker.on('picker.select', (selectedVal, selectedIndex) => {
				
				this.address.cityId = selectedVal[1]
				this.address.provinceId = selectedVal[0]
				this.address.regionId = selectedVal[2]

				this.address.provinceName = this.linkageData[0][selectedIndex[0]].text
				this.address.cityName = this.linkageData[1][selectedIndex[1]].text
				this.address.regionName = this.linkageData[2][selectedIndex[2]].text

				// this.address.province_id = selectedVal[0]
				// this.address.city_id = selectedVal[1]
				// this.address.region_id = selectedVal[2]
				// this.address.province_name = this.linkageData[0][selectedIndex[0]].text
				// this.address.city_name = this.linkageData[1][selectedIndex[1]].text
				// this.address.region_name = this.linkageData[2][selectedIndex[2]].text
			})
			// 改变
			this.picker.on('picker.change', (index, selectedIndex) => {
				this.tempIndex[index] = selectedIndex
				console.log(selectedIndex)
				if (index > 1) {
					return
				}
				if (index === 0) {
					this.tempIndex = [selectedIndex, this.tempIndex[1], this.tempIndex[2]]
				} else {
					this.tempIndex = [this.tempIndex[0], selectedIndex, this.tempIndex[2]]
				}
			})
		},
		methods: {
			// 展示城市列表
			showPicker () {
				this.picker.data = this.linkageData
				this.picker.show()
			},

			// 新地址传参方法
			newAddressFill () {
				// 判断
				if(this.ts) {
					this.newAddress = {
						address: this.address.address,
						cityId: this.address.cityId,
						id: JSON.parse(this.ts).id,
						mobile: this.address.mobile,
						name: this.address.name,
						provinceId: this.address.provinceId,
						regionId: this.address.regionId,
						uid: localStorage.getItem('userId'),
					}
					return JSON.stringify(this.newAddress)
				} else {
					this.newAddress = {
						address: this.address.address,
						cityId: this.address.cityId,
						mobile: this.address.mobile,
						name: this.address.name,
						provinceId: this.address.provinceId,
						regionId: this.address.regionId,
						uid: localStorage.getItem('userId')
					}
					return JSON.stringify(this.newAddress)
				}

			},

			// 保存
			doSave () {
				// 表单验证
				if (!this.checkForm()) {
					return
				}
				let params = {}
				// 测试
				// params = this.address
				params = this.newAddressFill()
				this.$ajax.addressUpdate(params).then(res => {
					if (res.status === 200) {
						this.$ajax.addressList().then(res => {
							// 广播更新地址事件
							this.$root.Bus.$emit('updateAddress', JSON.stringify(this.address))
							// 返回上一页
							this.$router.goBack()
						}, err => {
							console.log(err)
						})
					}
				}, err => {
					console.log(err)
				})
			},
			checkForm () {
				if (!checkInput() || !checkMobile(this.$refs.mobile)) {
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './address.styl'
</style>