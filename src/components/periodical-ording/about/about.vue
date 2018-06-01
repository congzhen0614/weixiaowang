<template>
	<div class="publish" :style="{ height: winHeight }">
		<div class="top">
			<img src="./top_logo.png">
		</div>
		<section class="main-content">
			<p class="desc">微校网是一款关注3~12岁儿童成长的APP。深层剖析少儿心理，探讨先进教育理念；专一搜罗和挑选最新的优秀内容；提供衣食住行的全面索引，方便一家人的学习和生活。我们衷心希望能让您的孩子快乐地学习，健康地成长！</p>
			<div class="buttons">
				<div class="download">
					<img src="./download_button.png" @click="downloadApp()">
				</div>
				<div class="center"></div>
				<div class="service" @click="getTel()">
					<a href="tel:4008470068" ref="tel"></a>
				</div>
				<!-- <img class="service" src="./service_button.png"> -->
			</div>
		</section>
		<div class="bottom-pic" :style="{ height: bottomHeight}">
			<img src="./company_logo.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'publish',
		data () {
			return {
				bottomHeight: (window.innerWidth / 2) + 'px',
				winHeight: window.innerHeight - 46 + 'px',
				iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
				androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr'
			}
		},
		methods: {
			downloadApp () {
				window.location.href = this.isIos ? this.iosDownload : this.androidDownload
			},
			// 调用通话
			getTel () {
				this.$refs.tel.click()
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './about.styl'
</style>