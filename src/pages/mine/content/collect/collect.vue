<template>
	<div class="mine-collect">
		<v-top :title="title"></v-top>
		<v-nav :navIndex="navIndex" @changeNavIndex="changeNavIndex"></v-nav>
		<transition-group enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
			<component :key="navIndex" :is="nowContent" :listData="nowListData"></component>
		</transition-group>
	</div>
</template>

<script>
	// let listData = [{
	// 	text: '',
	// 	status: '待付款',
	// 	collectId: '111111111',
	// 	numbers: 3,
	// 	complete: false,
	// 	price: '100.00',
	// 	buttonText: '去付款',
	// 	name: '我们爱科学(快乐动漫)'
	// }, {
	// 	text: '',
	// 	status: '待付款',
	// 	collectId: '111111111',
	// 	numbers: 3,
	// 	complete: false,
	// 	price: '100.00',
	// 	buttonText: '',
	// 	name: '儿童故事画报推理小侦探成长不烦恼(笑话与漫画)'
	// }, {
	// 	text: '',
	// 	status: '待付款',
	// 	collectId: '2222222',
	// 	numbers: 5,
	// 	complete: true,
	// 	price: '222.00',
	// 	buttonText: '去评价',
	// 	name: '儿童故事画报推理小侦探成长不烦恼(笑话与漫画)'
	// }, {
	// 	text: '',
	// 	status: '待付款',
	// 	collectId: '2222222',
	// 	numbers: 5,
	// 	complete: true,
	// 	price: '222.00',
	// 	buttonText: '去评价',
	// 	name: '儿童故事画报推理小侦探成长不烦恼(笑话与漫画)',
	// 	type: '微课堂',
	// 	video: 1000,
	// 	comment: 1000
	// }]
	import top from './top/top'
	import nav from './nav/nav'
	import list from './list/list'
	export default {
		data () {
			return {
				title: '刊物',
				navIndex: 0,
				listData: [],
				contentList: ['v-list', 'v-list', 'v-list', 'v-list']
			}
		},
		computed: {
			nowListData () {
				return this.listData.slice(this.navIndex, this.navIndex + 1)
			},
			nowContent () {
				return this.contentList[this.navIndex]
			}
		},
		created () {
			this.getCollect()
		},
		methods: {
			changeNavIndex (index) {
				this.navIndex = index
			},
			// 获取数据
			getCollect () {
				let params = {
					uid: localStorage.getItem('userId'),
					// sid: this.$route.query.id,
					cls: '2'
				}
				this.$ajax.getCollect(params).then(res => {
					console.log(res)
					this.listData = res.data.data.list
					console.log(this.listData)
				}, err => {
					console.log(err)
				})
			},
			addTabIndex (num) {
				let index = this.navIndex + num
				if (index >= 4 || index <= 0) {
					return false
				}
				this.navIndex = index
			}
		},
		components: {
			'v-top': top,
			'v-nav': nav,
			'v-list': list
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './collect.styl'
</style>