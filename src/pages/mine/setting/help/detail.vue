<template>
	<div class="mine-help">
		<!-- 头部 -->
		<section class="mine-help-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">帮助详情</p>
		</section>
		<!-- 评价内容 -->
		<section class="help-detail">
			<p class="title">{{ title }}</p>
			<p class="content">{{ detail.content }}</p>
		</section>
	</div>
</template>

<script>
	let detail = {
		content: '点击主页左上角按钮，进入侧滑页面；点击用户名或头像，进入“我的”。界面中有“我的订单”，点击即可查阅所有类型的订单。'
	}
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				// 标题
				title: this.$route.query.title,
				detail: detail
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
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './help.styl'
</style>