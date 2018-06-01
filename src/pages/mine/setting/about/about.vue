<template>
	<div class="mine-setting-about-page">
		<!-- 头部 -->
		<section class="mine-setting-about-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
		</section>
		<section class="img-part">
			<div class="top-part">
				<div class="right-cloud">
					<img src="./right_cloud.png">
				</div>
				<div class="left-cloud">
					<img src="./left_cloud.png">
				</div>
			</div>
			<div class="bottom-img" :style="{ height: bottomImgHeight + 'px' }">
				<div class="bottom-text">
					<img src="./bottom_text.png">
				</div>
			</div>
		</section>
		<section class="about-text">
			<p v-for="item in lines" class="text">
				{{ item }}
			</p>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				bottomImgHeight: window.innerWidth / 750 * 368,
				backIconSrc: require('@/common/icons/back_icon_black.png'),
				text: '微校网是一款关注3~12岁儿童成长的APP。深层剖析少儿心理，探讨先进教育理念；专一搜罗和挑选最新的优秀内容；提供衣食住行的全面索引，方便一家人的学习和生活。我们衷心希望能让您的孩子快乐地学习，健康地成长！'
			}
		},
		computed: {
			lines () {
				let lineWidth = window.innerWidth - 20 * 2
				let singleWidth = 15
				let numInLine = Math.floor(lineWidth / singleWidth)
				let textArr = this.text.split('')
				let returnArr = []
				let lineStr = ''
				for (let i = 0; i < textArr.length; i++) {
					lineStr += textArr[i]
					if (lineStr.length >= numInLine || i === textArr.length - 1) {
						returnArr.push(lineStr)
						lineStr = ''
					}
				}
				return returnArr
			}
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './about.styl'
</style>