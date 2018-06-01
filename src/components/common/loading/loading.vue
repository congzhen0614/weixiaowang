<template>
  <div class="loading-box">
    <div></div>
    <div>领取中...</div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {}
		}
	}
</script>
<style type="text/css">
	@keyframes move {
		0%, 100% {
			top: 0%;
			left: 0%;
		}
		25% {
			top: 0%;
			left: 50%;
		}
		50% {
			top: 50%;
			left: 50%;
		}
		75% {
			top: 50%;
			left: 0%;
		}
	}
	@keyframes rounding {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../../common/stylus/mixin.styl' 
	.loading-box
		width 1.2rem
		height 1.2rem
		// border 0.02rem solid #f8bd48
		border-radius 50%
		> div
			left 0
			position relative
			width 1.2rem
			height 1.2rem
			border-radius 100%
			overflow hidden
			&:first-child
				background linear-gradient(to left, #ff6060, #fff)
				animation rounding 0.8s linear 0s infinite
				&:after
					content ''
					position absolute
					top 0.3rem
					width 1.2rem
					height 1.2rem
					background linear-gradient(to left, #ff6060, red)
			&:nth-child(2)
				width 1.16rem
				height 1.16rem
				top -1.18rem
				left 0.02rem
				line-height 1.16rem
				font-size 0.24rem
				color #ff6060
				text-align center
				z-index 999
				background-color rgba(255, 255, 255, 1)
</style>
