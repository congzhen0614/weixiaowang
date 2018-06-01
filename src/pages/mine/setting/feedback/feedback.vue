<template>
	<div class="mine-feedback">
		<!-- 头部 -->
		<section class="mine-feedback-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">意见反馈</p>
			<div class="submit-btn" @click="doSubmit()">
				提交
			</div>
		</section>
		<!-- 评价内容 -->
		<section class="feedback-content">
			<div class="text-box">
				<textarea v-model="text" placeholder="欢迎您提出宝贵的意见或建议帮助我们更好的改进！"></textarea>
				<span class="limit">
					<span class="numbers" :class="{ red: text.length > limit }">{{ text.length }}</span><span class="max">/{{ limit }}</span>
				</span>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				text: '',
				limit: 300
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
	@import './feedback.styl'
</style>