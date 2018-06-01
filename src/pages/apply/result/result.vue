<template>
	<div class="result">
		<header :style="{ height: headerHeight }" class="result-header" :class="{ success: success, fail: !success }">
			<div class="close-text" @click="backToRoot()">
				<canvas ref="mycanvas" id="mycanvas" width="50" height="50" class="canvas"></canvas>
				关闭 {{ timeLast }}s
			</div>
			<div class="price">
				￥<span class="big">{{ fee }}</span>
			</div>
			<div class="result-text" :class="{ success: success, fail: !success }">
				{{ resultText }}
			</div>
		</header>
		<section class="center-buttons" :style="{ height: otherHeight }">
			<div v-if="success">
				<div class="download-text"></div>
				<div @click="downloadApp()" class="download-app"></div>
				<div class="bottom">
					<div class="logo"></div>
					<div class="desc-text"></div>
				</div>
			</div>
			<div v-else>
				<div class="pay-again" @click="payAgain()"></div>
				<div class="bottom">
					<div class="logo"></div>
					<div class="desc-text"></div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	// import {getQueryString} from '../../../common/js/date'
	export default {
		name: 'result',
		data () {
			return {
				// 支付成功与否
				success: this.$route.query.success,
				fee: 0,
				step: 1,
				startAngle: 0,
				endAngle: 0,
				animation_interval: 100,
				iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
				androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr',
				interval: null,
				// 顶部高度
				headerHeight: window.innerWidth / 75 * 52 + 'px'
			}
		},
		computed: {
			// 倒计时时间
			count () {
				return this.success ? 60 : 150
			},
			// 剩余高度
			otherHeight () {
				return window.innerHeight - parseFloat(this.headerHeight) - 20 + 'px'
			},
			resultText () {
				this.fee = this.$route.query.total_amount || 0
				this.interval = setInterval(this.animation, this.animation_interval)
				return this.success ? '支付成功' : '支付失败'
			},
			timeLast () {
				return Math.ceil((this.count - this.step) / 10)
			},
			// width
			width () {
				return this.$refs.mycanvas.width
			},
			// height
			height () {
				return this.$refs.mycanvas.height
			},
			// ctx
			ctx () {
				return this.$refs.mycanvas.getContext('2d')
			}
		},
		mouted () {
			// 如果成功，history + 1
			if (this.success) {
				localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
				// 如果是 qq 需要多退2步
				if (this.isIosQQ) {
					localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 2)
				}
				if (this.isAndroidQQ) {
					localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 3)
				}
			}
			this.fee = this.$route.query.total_amount || 0
		},
		methods: {
			// 回到初始页面
			backToRoot () {
				clearInterval(this.interval)
				// 如果有活动页
				if (localStorage.getItem('activityPage')) {
					this.$router.push({
						path: localStorage.getItem('activityPage') || '/'
					})
				}
				// 如果有上一页
				if (this.isIosQQ || this.isAndroidQQ && this.$route.query.href) {
					window.location.href = this.$route.query.href
					return
				}
				if (this.$route.query.href) {
					window.location.href = this.$route.query.href
					return
				}
				// 之前的活动分享页
				let historyBack = -parseInt(localStorage.getItem('historyLength'))
				if (historyBack !== 0) {
					localStorage.setItem('historyLength', 0)
					window.history.go(historyBack)
					return
				} else {
					// 没有则返回首页
					this.$router.push({
						path: localStorage.getItem('activityPage') || '/'
					})
				}
				localStorage.setItem('historyLength', 0)
			},
			// 画图
			drawArc (start, end) {
				let x = this.width / 2
				let y = this.height / 2
				let radius = x - 10
				let counterClockwise = false
				this.ctx.strokeStyle = '#000000'
				this.ctx.beginPath()
				// this.ctx.moveTo(x, y)
				this.ctx.arc(x, y, radius, start, end, counterClockwise)
				this.ctx.stroke()
			},
			// 动画
			animation () {
				if (this.step <= this.count) {
					this.endAngle = (this.step / this.count) * 2 * Math.PI
					// this.drawArc(this.startAngle, this.endAngle)
					this.step += 1
				} else {
					clearInterval(this.interval)
					this.backToRoot()
				}
			},
			// 重新支付
			payAgain () {
				clearInterval(this.interval)
				localStorage.setItem('historyLength', localStorage.getItem('historyLength') - 1)
				this.$router.goBack()
				// this.$root.Bus.$emit('setHistoryBack', '')
			},
			// 下载 APP
			downloadApp () {
				if (this.isWeibo) {
					this.Dialog.alert({
						title: '请通过浏览器查看APP'
					}, res => {})
					return
				}
				window.location.href = this.isIos ? this.iosDownload : this.androidDownload
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './result.styl'
</style>