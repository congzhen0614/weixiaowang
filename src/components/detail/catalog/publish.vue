<template>
	<div class="publish">
		<ul class="info-list">
			<li v-for="item in infoList" class="list-item">
				<div class="name">
					{{ item.name }}
				</div>
				<div class="value">
					{{ item.value }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let infoList = [{
		name: '商品名称',
		value: '精装'
	}, {
		name: 'ISBN',
		value: '97474384754738'
	}, {
		name: '作者',
		value: '张德芬'
	}, {
		name: '出版社',
		value: '北京联合出版公司'
	}, {
		name: '出版时间',
		value: '2016-05-12'
	}, {
		name: '版次',
		value: '1'
	}, {
		name: '印次',
		value: '1'
	}, {
		name: '页数',
		value: '250'
	}, {
		name: '字数',
		value: '1500000'
	}, {
		name: '开本',
		value: '21开'
	}, {
		name: '纸张',
		value: '胶版纸'
	}, {
		name: '包装',
		value: '精装'
	}]
	export default {
		name: 'publish',
		data () {
			return {
				infoList: infoList
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './publish.styl'
</style>