<template>
	<div class="link_top_line" :style="position">
		<div class="link_logo_img">
			<img src="./logo.png">
		</div>
		<div class="link_title">微校网</div>
		<div class="link_text">快乐成长百宝箱</div>
		<div class="link_btn" @click="openApp()">打开APP</div>
		<div class="link_close_button" @click="closeLink()">
			<img src="./close_icon.png">
		</div>
	</div>
</template>

<script>
	let u = navigator.userAgent
	export default {
		props: {
			position: {
				// type: Object,
				type: Array,
				default: function () {
					top: '40px'
				}
			}
		},
		name: 'link',
		data () {
			return {
				iosUrl: 'WeiXiaoWangAli://',
				androidUrl: 'weixiaowang://',
				downloadUrl: 'http://www.21weixiao.com/download/default.html',
				isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
				timer: null,
				time1: '',
				time2: '',
				iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
				androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr',
				ifra: null
			}
		},
		computed: {
			// iframe 链接
			iframeSrc () {
				return this.isIos ? this.iosUrl : this.androidUrl
			}
		},
		methods: {
			// 关闭
			closeLink () {
				this.$emit('close-link')
			},
			// 打开 App
			openApp () {
				if (this.isWeibo) {
					this.Dialog.alert({
						title: '请通过浏览器查看APP'
					}, res => {})
					return
				}
				this.iframeOpen()
			},
			// 利用 iframe 打开客户端
			iframeOpen (callback) {
				this.time1 = new Date().getTime()
				if (!this.isIos) {
					this.ifra = document.createElement('iframe')
					this.ifra.src = this.iframeSrc
					this.ifra.style.display = 'none'
					document.body.appendChild(this.ifra)
				} else {
					window.location.href = this.iframeSrc
				}
				this.jumpDownload()
			},
			// 跳转下载页面
			jumpDownload () {
				this.timer = setTimeout(() => {
					this.time2 = new Date().getTime()
					if (this.time2 - this.time1 < 500) {
						window.location.href = this.isIos ? this.iosDownload : this.androidDownload
					}
				}, 400)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './link.styl'
</style>