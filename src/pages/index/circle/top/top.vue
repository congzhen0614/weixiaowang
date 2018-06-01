<template>
	<section ref="top" class="circle-index-top" :style="topStyleObj">
		<div class="left-part">
			<div class="input-area">在此输入搜索内容</div>
			<div class="search-icon">
				<img src="./search_icon.png">
			</div>
		</div>
		<div class="right-part">
			<div class="mine">
				<img src="./mine_icon.png">
			</div>
			<div class="message">
				<img src="./message_icon.png">
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data () {
			return {
				scrollTop: 0
			}
		},
		computed: {
			// 顶部样式
			topStyleObj () {
				if (this.scrollTop <= 0) {
					return {
						top: 0
					}
				}
				if (this.scrollTop > 44) {
					return {
						top: '-44px'
					}
				}
				return {
					top: -this.scrollTop + 'px'
				}
			}
		},
		created () {
			// 监听滚动
			this.$root.Bus.$on('circleScroll', (val) => {
				this.scrollTop = val
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './top.styl'
</style>