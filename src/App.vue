<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				toastShow: false
			}
		},
		created () {
			// 监听回到首页
			this.$root.Bus.$on('backToRoot', (val) => {
				let historyBack = -parseInt(localStorage.getItem('historyLength'))
				this.$router.go(historyBack)
			})
			// 监听提示
			this.$root.Bus.$on('showToast', (val) => {
				this.showToast(val)
			})
		},
		mounted () {
		},
		methods: {
			showToast (text) {
				this.toast.title = text || '请输入正确的信息'
				this.toastShow = true
				setTimeout(() => {
					this.toastShow = false
				}, 2000)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'common/stylus/base.styl'
  html, body {
    height: 100%;
  }
  #app {
  	font-size: 0.24rem;
    color: #2c3e50;
    background: #ffffff;
    height: 100%;
  }
  #app div {
  	// width: 100%;
  }
</style>
