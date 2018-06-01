<template>
	<div class="screen">
		<ul class="list">
			<li v-for="(item, index) in firstData" class="list-item" :class="{ active: index === firstIndex}" @click="selectItem(item.text, item.value, 'firstIndex', index)">
				{{ item.text }}
			</li>
		</ul>
		<ul class="list">
			<li v-for="(item, index) in chooseSecond" class="list-item" :class="{ active: index === secondIndex}" @click="selectItem(item.text, item.value, 'secondIndex', index)">
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<script>
	let firstData = [{
		text: '浙江省',
		value: '1'
	}, {
		text: '江苏省',
		value: '2'
	}]
	let secondData = {
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
	export default {
		name: 'screen',
		data () {
			return {
				firstData: firstData,
				secondData: secondData,
				selectedPro: {
					text: '',
					value: ''
				},
				selectedCity: {
					text: '',
					value: ''
				},
				firstIndex: 0,
				secondIndex: 0
			}
		},
		computed: {
			chooseSecond () {
				return this.secondData['' + this.selectedFirst.value + '']
			},
			selectedFirst () {
				return this.firstData[this.firstIndex]
			},
			selectedSecond () {
				return this.secondData[this.secondIndex]
			}
		},
		methods: {
			selectItem (text, value, type, index) {
				this['' + type + ''] = index
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './screen.styl'
</style>