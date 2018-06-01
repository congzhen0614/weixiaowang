<template>
	<div class="mine-help">
		<!-- 头部 -->
		<section class="mine-help-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">使用帮助</p>
			<div class="submit-btn" @click="doSubmit()">
				意见反馈
			</div>
		</section>
		<!-- 评价内容 -->
		<ul class="help-list">
			<li v-for="(item, index) in helpList" class="help-item" @click="openItem(item.title)">
				<p class="title">{{ item.title }}</p>
				<div class="arrow-box">
					<img :src="rightArrowSrc">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let helpList = [{
		title: '成功付款后，如何查看已购买的订单？成功付款后，如何查看已购买的订单？'
	}, {
		title: '成功付款后，如何查看已购买的订单？'
	}, {
		title: '成功付款后，如何查看已购买的订单？'
	}]
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				// 数据
				helpList: helpList
			}
		},
		computed: {
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 提交
			doSubmit () {
				this.$router.goBack()
			},
			// 打开单条内容
			openItem (title) {
				this.$router.push({
					path: 'detail',
					query: {
						title: title
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './help.styl'
</style>