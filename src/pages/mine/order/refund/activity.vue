<template>
	<div class="mine-order-refund">
		<!-- 头部 -->
		<section class="mine-order-refund-top">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">退款</p>
			<div class="submit-btn" @click="doSubmit()">
				提交
			</div>
		</section>
		<!-- 评分 -->
		<section class="activity-info">
			<p>
				<span class="label-name">报名人</span>
				<span class="text">李累</span>
			</p>
			<p>
				<span class="label-name">报名费</span>
				<span class="text">¥50.00</span>
			</p>
			<p>
				<span class="label-name">退款截止日期</span>
				<span class="text">2017年8月10日</span>
			</p>
		</section>
		<!-- 活动名称 -->
		<section class="activity-name">
			活动培训名称活动培训名称活动培训名称活动培训名称活动培训名称活动培训名称
		</section>
		<!-- 退款说明 -->
		<section class="refund-explain activity">
			<p class="title">
				<span class="text">退款说明</span>
				<span class="must-btn">必填</span>
			</p>
			<div class="explain-box">
				<textarea class="explain-area" placeholder="请在此输入退款说明"></textarea>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
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
			// 更改评分
			changeScore (index) {
			},
			// 上传图片
			submitPic () {
				this.$refs.file.click()
			},
			// 提交
			doSubmit () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './refund.styl'
</style>