<template>
  <div class="page_transition_box">
		<transition :name="transitionName">
	    <router-view class="child-view"></router-view>
	  </transition>
  </div>
</template>

<script>
	export default {
		name: 'page-transition',
		data () {
			return {
				transitionName: 'slide-left'
			}
		},
		beforeRouteUpdate (to, from, next) {
			// 是否为返回
			let isBack = this.$router.isBack
			// 修改动画方向
			if (isBack) {
				this.transitionName = 'slide-right'
			} else {
				this.transitionName = 'slide-left'
			}
			// 重置
			this.$router.isBack = false
			next()
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.page_transition_box
		width 100%
		height 100%
	.child-view
		position absolute
		width 100%
		min-height 100%
		transition all .3s
    //cubic-bezier(.55, 0, .1, 1)
	.slide-left-enter, .slide-right-leave-active
		opacity 0
		transform translate(50px, 0)
	.slide-left-leave-active, .slide-right-enter
		opacity 0
		transform translate(-50px, 0)
</style>
