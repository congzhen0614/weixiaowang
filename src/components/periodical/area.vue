<template>
	<div>
		<div class="selected" @click="backLevel()">
			<div class="text">
				<span class="province">{{ selectedPro.text }}</span>&nbsp;
				<span class="city">{{ selectedCity.text }}</span>
			</div>
		</div>
		<split></split>
		<ul v-if="showType === 0" class="list">
			<li v-for="(item, index) in provinceData" class="list-item" @click="selectItem(item.text, item.value, 'selectedPro')">
				{{ item.text }}
			</li>
		</ul>
		<ul v-if="showType === 1" class="list">
			<li v-for="(item, index) in selectCity" class="list-item" @click="selectItem(item.text, item.value, 'selectedCity')">
				{{ item.text }}
			</li>
		</ul>
		<ul v-if="showType === 2" class="list">
			<li v-for="(item, index) in selectDist" class="list-item" @click="selectItem(item.text, item.value, 'selectedDist')">
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<script>
	import split from '../common/split/split'
	let provinceData = [{
		text: '浙江省',
		value: '1'
	}, {
		text: '江苏省',
		value: '2'
	}]
	let cityData = {
		'1': [{
			text: '杭州市',
			value: '11'
		}, {
			text: '宁波市',
			value: '12'
		}],
		'2': [{
			text: '苏州市',
			value: '21'
		}, {
			text: '南京市',
			value: '22'
		}]
	}
	let distData = {
		'11': [{
			text: '111',
			value: '111'
		}, {
			text: '112',
			value: '112'
		}],
		'12': [{
			text: '121',
			value: '121'
		}, {
			text: '122',
			value: '122'
		}],
		'21': [{
			text: '211',
			value: '211'
		}, {
			text: '212',
			value: '212'
		}],
		'22': [{
			text: '221',
			value: '221'
		}, {
			text: '222',
			value: '222'
		}]
	}
	export default {
		name: 'v-area',
		data () {
			return {
				provinceData: provinceData,
				cityData: cityData,
				distData: distData,
				showType: 0,
				selectedPro: {
					text: '',
					value: ''
				},
				selectedCity: {
					text: '',
					value: ''
				}
			}
		},
		computed: {
			selectCity () {
				return this.cityData['' + this.selectedPro.value + '']
			},
			selectDist () {
				return this.distData['' + this.selectedCity.value + '']
			},
			selectedArea () {
				return this.selectedPro.text + ' ' + this.selectedCity.text + ' ' + this.selectedDist.text
			}
		},
		methods: {
			// 选中内容
			selectItem (text, value, type) {
				this['' + type + ''].value = value
				this['' + type + ''].text = text
				this.showType += 1
				// 如果已经选完
				if (this.showType > 2) {
					this.$emit('selectArea', this.selectedArea)
				}
			},
			// 返回上一级
			backLevel () {
				if (this.showType <= 0) {
					return
				}
				if (this.showType === 2) {
					this.selectedCity.text = ''
					this.selectedCity.value = ''
				}
				if (this.showType === 1) {
					this.selectedPro.text = ''
					this.selectedPro.value = ''
				}
				this.showType -= 1
			}
		},
		components: {
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './area.styl'
</style>