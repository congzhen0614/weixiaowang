<template>
	<div class="choose">
		<v-header :entrance="'apply'" :title="title" @goBack="destroySelf()"></v-header>
		<ul class="combo-list">
			<li v-for="(item, index) in comboList" class="list-item">
				<div class="left-part"></div>
				<div class="content">
					<div class="title top">
						<span>{{ item.title }}</span>
						<span v-if="parseInt(item.is_group) > 0" class="group">团</span>
					</div>
					<div class="title readme">
						<span>{{ item.readme }}</span>
					</div>
					<!-- <div v-if="item.end_time && parseInt(item.is_group) > 0" class="deadline">
						团购于{{ getUpdateDay(item.end_time) }}截止
					</div> -->
					<div class="bottom">
						<div class="remain">
							<span>剩余</span>
							<span>{{ remainList[index] }}</span>
						</div>
						<div class="price">
							￥<span class="big">{{ item.fee }}</span>
						</div>
					</div>
				</div>
				<div class="right-part">
					<button class="add" ref="addButton" @click="addOne(index)"></button>
					<div class="num">{{ item.num }}</div>
					<button class="reduce" @click="reduceOne(index)"></button>
				</div>
			</li>
		</ul>
		<footer class="footer">
			<div class="condition">
				<div class="check" :class="{ active: checkFlag }" @click="toggleCheckFlag">
				</div>
				<span class="desc">我同意</span>
				<span class="protocol">《微校互联订购协议》</span>
			</div>
			<div class="bottom">
				<div class="left">
					<div class="title">已优惠</div>
					<div class="sum">
						合计 ￥<span class="big">{{ sum }}</span>元
					</div>
				</div>
				<div class="right" @click="goContracts()">下一步</div>
			</div>
		</footer>
	</div>
</template>

<script>
	import header from '@/components/header/header'
	import {getUpdateDay} from '@/common/js/date.js'
	export default {
		name: 'choose',
		data () {
			return {
				comboList: [],
				checkFlag: true,
				title: '请在以下套餐中选择'
			}
		},
		computed: {
			// 合计
			sum () {
				var sum = 0
				this.comboList.forEach((item, index) => {
					sum += item.fee * item.num
				})
				return sum.toFixed(2)
			},
			// 剩余数组
			remainList () {
				let arr = []
				this.comboList.forEach((item, index) => {
					let remain = item.total - item.num
					arr.push(remain)
				})
				return arr
			},
			// 数量
			totalCount () {
				let count = 0
				this.comboList.forEach((item) => {
					count += item.num
				})
				return count
			}
		},
		mounted () {
			document.title = this.title
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
			this.Toast.loading({
				title: '加载中...'
			})
			// 获取数据
			this.$ajax.listActivityTicket({
				sid: this.$route.query.id
			})
			.then((res) => {
				this.Toast.hide()
				let data = res.data.data.list
				data.forEach((item, index) => {
					item.total = item.ticket_quantity - item.ticket_sells // 当前剩余
					item.num = 0
				})
				this.comboList = data
			}, (err) => {
				console.log(err)
			})
		},
		methods: {
			// 切换确定按钮状态
			toggleCheckFlag () {
				this.checkFlag = !this.checkFlag
			},
			// 添加
			addOne (index) {
				if (this.comboList[index].num === this.comboList[index].total) {
					return
				}
				this.comboList[index].num += 1
			},
			// 减少
			reduceOne (index) {
				if (this.comboList[index].num < 1) {
					return
				}
				this.comboList[index].num -= 1
			},
			// 下一步
			goContracts () {
				if (!this.totalCount) {
					this.Toast.warning({
						title: '请先选择套餐'
					})
					return
				}
				if (!this.checkFlag) {
					this.Toast.warning({
						title: '请先同意微校互联订购协议'
					})
					return
				}
				this.$router.push({
					path: `/apply/contracts`,
					query: {
						amount: this.sum,
						id: this.$route.query.id,
						cls: this.$route.query.cls,
						type: this.$route.query.type,
						is_realname: this.$route.query.is_realname,
						comboList: JSON.stringify(this.comboList),
						href: this.$route.query.href
					}
				})
			},
			// 销毁自己
			destroySelf () {
				// this.$destroy()
			},
			// 获取格式化时间
			getUpdateDay (time) {
				return getUpdateDay(time)
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './choose.styl'
</style>