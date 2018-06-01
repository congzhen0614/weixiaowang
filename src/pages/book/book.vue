<template>
	<div class="book-home-page" style="min-height: 100%">
		<transition :name="transitionName">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
			</keep-alive>
	  </transition>
		<transition :name="transitionName">
	    <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
	  </transition>
	</div>
</template>

<script>
	export default {
		name: 'book-home-page',
		data () {
			return {
				isBack: false
			}
		},
		computed: {
			transitionName () {
				return this.isBack ? 'slide-right' : 'slide-left'
			}
		},
		beforeRouteUpdate (to, from, next) {
			if (to.meta.index > from.meta.index) {
				this.isBack = false
				setTimeout(() => {
					this.isBack = true
				}, 100)
			} else {
				this.isBack = true
				setTimeout(() => {
					this.isBack = false
				}, 100)
			}
			next()
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
