<template>
	<div class="address">
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
				<span class="input" :class="{ placeholder: !address.cityArea }" @click="showPicker()">{{ address.cityArea || '请选择地区' }}</span>
				<!-- <city-picker class="input" @select="handleSelect(3,arguments)" :data="data[3]" :selected-index="selectedIndex[3]"
              ref="picker3" :title="title[3]"></city-picker> -->
				<input type="hidden" v-model="address.cityArea" required placeholder="请选择地区">
				<img src="./arrow_right.png">
			</li>
			<li class="list-item">
				<span class="name">地址</span>
				<input required v-model="address.address" type="text" placeholder="请输入您的详细地址">
			</li>
		</ul>
		<footer @click="doSubmit()">完成</footer>
	</div>
</template>

<script>
	import Picker from 'better-picker'
	import area from '../../../../static/data/area.json'
	import { checkInput, checkMobile } from '../../../common/js/common.js'
	export default {
		name: 'address',
		data () {
			return {
				picker: '',
				data: area.result,
				tempIndex: [0, 0, 0],
				address: {}
			}
		},
		computed: {
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
			}
		},
		watch: {
			linkageData () {
				this.picker.refill(this.linkageData)
			}
		},
		mounted () {
			this.address = (localStorage.getItem('addressList') && JSON.parse(localStorage.getItem('addressList')).length) ? JSON.parse(localStorage.getItem('addressList'))[0] : {
				cityArea: '',
				name: '',
				mobile: '',
				address: '',
				id: '',
				areaValList: []
			}
			this.picker = new Picker({
				data: this.linkageData,
				selectedIndex: [0, 0, 0],
				title: '请选择地区'
			})
			this.picker.on('picker.select', (selectedVal, selectedIndex) => {
				this.address.areaValList = selectedVal
				this.address.cityArea = this.linkageData[0][selectedIndex[0]].text + ',' + this.linkageData[1][selectedIndex[1]].text + ',' + this.linkageData[2][selectedIndex[2]].text
			})
			this.picker.on('picker.change', (index, selectedIndex) => {
				this.tempIndex[index] = selectedIndex
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
			// 完成
			doSubmit () {
				// 表单验证
				if (!this.checkForm()) {
					return
				}
				this.Toast.loading({
					title: '提交中...'
				})
				let params = {}
				params.uid = localStorage.getItem('userId')
				params.name = this.address.name
				params.mobile = this.address.mobile
				params.provinceId = this.address.areaValList[0]
				params.cityId = this.address.areaValList[1]
				params.regionId = this.address.areaValList[2]
				params.address = this.address.address
				let addressList = localStorage.getItem('addressList') ? JSON.parse(localStorage.getItem('addressList')) : []
				// 如果存在 id 则更新，不存在则添加
				if (addressList.length && addressList[0].hasOwnProperty('id')) {
					params.id = addressList[0].id
				}
				// 调用设置地址接口，新增和更新为同一个
				this.$ajax.addressUpdate(params).then(res => {
          if (res.data.result.status==='0') {
            this.$router.goBack()
          } else {
            this.Toast.warning({
              title: res.data.result.msg
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
