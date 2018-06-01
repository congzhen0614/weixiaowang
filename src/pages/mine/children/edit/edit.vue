<template>
	<div class="mine-children-edit">
		<!-- 头部 -->
		<section class="mine-children-edit-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="../back_icon.png">
			</div>
			<p class="title">孩子管理</p>
			<div class="add-btn" @click="doSave()">
				保存
			</div>
		</section>
		<!-- 内容 -->
		<ul class="input-list">
			<li class="input-item">
				<div class="left-part">
					<img :src="item.avatar || defaultAvatar">
				</div>
				<div class="center-part" @click="setAvatar()">
					<upload ref="upload" style="display: none;"></upload>
					<input type="text" placeholder="设置头像" readonly="">
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">姓名</span>
				</div>
				<div class="center-part">
					<input type="text" v-model="item.name" placeholder="请输入孩子姓名">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">性别</span>
				</div>
				<div class="center-part">
					<div class="sex-box">
						<div @click="changeSex('1')" class="select-box">
							<img class="select-img" :src="item.sex === '1' ? selectedSrc : notSelectedSrc">
							<img class="sex-icon" src="../boy.png">
							<span class="text">男</span>
						</div>
					</div>
					<div class="sex-box">
						<div @click="changeSex('2')" class="select-box">
							<img class="select-img" :src="item.sex === '2' ? selectedSrc : notSelectedSrc">
							<img class="sex-icon" src="../girl.png">
							<span class="text">女</span>
						</div>
					</div>
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">地区</span>
				</div>
				<div class="center-part" @click="showPicker('addressPicker')">
					<input type="text" v-model="areaName" placeholder="请选择地区" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">入学年份</span>
				</div>
				<div class="center-part" @click="showPicker('beginYearPicker')">
					<input type="text" v-model="item.enrollment" placeholder="请选择孩子入学年份" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">学校</span>
				</div>
				<div class="center-part">
					<input type="text" v-model="item.schoolName" placeholder="请选择学校" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">年级</span>
				</div>
				<div class="center-part" @click="showPicker()">
					<input class="yellow" v-model="item.gradeName" type="text" placeholder="请选择孩子当前就读年级" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">班级</span>
				</div>
				<div class="center-part">
					<input type="text" v-model="item.className" placeholder="请选择班级" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">家长</span>
				</div>
				<div class="center-part">
					<input type="text" v-model="item.parent" placeholder="请输入家长姓名">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">电话</span>
				</div>
				<div class="center-part">
					<input type="text" v-model="item.mobile" placeholder="请输入孩子家长联系电话">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">关系</span>
				</div>
				<div class="center-part" @click="showPicker('relationPicker')">
					<input type="text" v-model="item.relation" placeholder="请输入家长与孩子关系" readonly>
				</div>
				<div class="right-part">
					<img src="../right_arrow.png">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">设置为当前</span>
				</div>
				<div class="center-part">
					<div class="block-box"></div>
					<div @click="changeSelected" class="select-box">
						<img class="select-img" :src="item.is_default ? selectedSrc : notSelectedSrc">
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	// 上传文件
	import upload from '@/components/common/upload/upload'
	import Picker from 'better-picker'
	import area from '../../../../../static/data/area.json'
	// 入学年份
	let nowYear = new Date().getFullYear()
	let beginYearList = []
	for (let i = nowYear; i > nowYear - 20; i--) {
		beginYearList.push({
			text: i,
			value: i
		})
	}
	// 年级
	let gradeList = [{
		text: '一年级',
		value: 1
	}, {
		text: '二年级',
		value: 2
	}, {
		text: '三年级',
		value: 3
	}, {
		text: '四年级',
		value: 4
	}, {
		text: '五年级',
		value: 5
	}, {
		text: '六年级',
		value: 6
	}, {
		text: '七年级',
		value: 7
	}, {
		text: '八年级',
		value: 8
	}, {
		text: '九年级',
		value: 9
	}, {
		text: '小班',
		value: 10
	}, {
		text: '中班',
		value: 11
	}, {
		text: '大班',
		value: 12
	}]

	// 班级
	let classList = [{

	}]

	// 关系
	let relationList = [{
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
		data () {
			return {
				// 孩子对象
				item: {
					enrollment: beginYearList[0].text,
					sex: '1'
				},
				defaultAvatar: require('@/common/icons/avatar.jpg'),
				selectedSrc: require('../reset/select_btn_active.png'),
				notSelectedSrc: require('../reset/select_btn.png'),
				// 地区数据
				addressData: area.result,
				// 已选信息
				tempIndex: [0, 0, 0],
				addressPicker: null,
				// 入学时间
				beginYearPicker: new Picker({
					data: [beginYearList],
					selectedIndex: [0],
					title: '入学年份'
				}),
				// 关系
				relationPicker: new Picker({
					data: [relationList],
					selectedIndex: [0],
					title: '关系'
				})
			}
		},
		computed: {
			// 地区数据
			linkageData () {
				let provinces = []
				let cities = []
				let areas = []
				this.addressData.forEach((item, index) => {
					provinces.push({
						text: item.provincename,
						value: item.provinceid
					})
				})
				this.addressData[this.tempIndex[0]].citylist.forEach(item => {
					cities.push({
						text: item.cityname,
						value: item.cityid
					})
				})
				this.addressData[this.tempIndex[0]].citylist[this.tempIndex[1]].regionlist.forEach(item => {
					areas.push({
						text: item.regionname,
						value: item.regionid
					})
				})
				return [provinces, cities, areas]
			},
			// 地区
			areaName () {
				if (!this.item.hasOwnProperty('cityName')) {
					return ''
				}
				return this.item.provinceName + this.item.cityName + this.item.regionName
			}
		},
		watch: {
			linkageData () {
				this.addressPicker.refill(this.linkageData)
			}
		},
		created () {
			// 判断是编辑还是新增
			//
			if (this.$route.query.id) {
				this.loadData()
			}
			// 
			if (this.$route.query.item && JSON.parse(this.$route.query.item).hasOwnProperty('sex')) {
				this.item = JSON.parse(this.$route.query.item)
				console.log(this.item)
			}
		},
		mounted () {
			if (this.$route.query.item) {
				this.item = JSON.parse(this.$route.query.item)
			}
			this.addressPicker = new Picker({
				data: this.linkageData,
				selectedIndex: [0, 0, 0],
				title: '请选择地区'
			})
			this.$nextTick(() => {
				// 监听更改
				this.listenSelectChange()
			})
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.childList().then(res => {
					this.item = res.data.data.filter(item => {
						return item.id === this.$route.query.id
					})[0]
					this.item.is_default = parseInt(this.item.is_default)
				}, err => {
					console.log(err)
				})
			},
			// 切换选中状态
			changeSelected () {
				if (!this.item.is_default) {
					this.item.is_default = 1
				} else {
					this.item.is_default = 0
				}
			},
			// 孩子性别
			changeSex (index) {
				this.item.sex = index
			},
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 保存
			doSave () {
				let params = {}
				// params.avatar = 
				params.city_id = item.cityid
				params.class_id = item.class_id
				params.enrollment = item.enrollment
				params.grade_id = item.grade_id
				params.id = item.id
				params.is_default =	item.is_default
				params.mobile = item.mobile
				params.name = item.name
				params.parent = item.parent
				params.province_id = item.provinceId
				params.region_id = item.regionId
				params.relation = item.relation
				params.school_id = item.school_id
				params.sex = item.sex
				params.uid = localStorage.getItem('userId')
				console.log(params)
				this.$ajax.childUpdate(this.item).then(res => {
					if (res.data.status === '0') {
						this.Toast.success({
							title: '保存成功！'
						})
						setTimeout(() => {
							this.goBack()
						}, 300)
					}
				}, err => {
					console.log(err)
				})
			},
			// 设置头像
			setAvatar () {
				this.$refs.upload.uploadFile()
			},
			// 选择
			showPicker (type) {
				this['' + type + ''].show()
			},
			// 监听更改
			listenSelectChange () {
				// 入学年份
				this.beginYearPicker.on('picker.select', (index, selectedIndex) => {
					this.item.enrollment = beginYearList[selectedIndex[0]].text
				})
				// 地区
				this.addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
					this.item.province_id = selectedVal[0]
					this.item.city_id = selectedVal[1]
					this.item.region_id = selectedVal[2]
					this.item.province_name = this.linkageData[0][selectedIndex[0]].text
					this.item.city_name = this.linkageData[1][selectedIndex[1]].text
					this.item.region_name = this.linkageData[2][selectedIndex[2]].text
				})
				// 地区更新
				this.addressPicker.on('picker.change', (index, selectedIndex) => {
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
				// 关系选择
				this.relationPicker.on('picker.select', (index, selectedIndex) => {
					this.item.relation = relationList[selectedIndex[0]].text
				})
				// 年级选择
				// this.gradePicker.on('picker.select', (index, selectedIndex) => {

				// })
				// 班级选择
				// this.classPinker.on('picker.select', (index, selectedIndex) => {

				// })
			}
		},
		components: {
			upload
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './edit.styl'
</style>