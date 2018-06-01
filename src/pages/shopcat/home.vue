<template>
	<div class="mine-shopcat-index">
		<!-- 头部 -->
		<section class="mine-shopcat-index-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">购物车</p>
			<div class="add-btn" @click="changeEdit()">
				{{ topText }}
			</div>
		</section>
		<v-main :canClear="canClear"></v-main>
	</div>
</template>

<script>
	import main from '@/pages/shopcat/index'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				canClear: false
			}
		},
		computed: {
			// 顶部文字
			topText () {
				if (!this.canClear) {
					return '编辑'
				} else {
					return '取消'
				}
			}
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 改变文字
			changeEdit () {
				this.canClear = !this.canClear
			}
		},
		components: {
			'v-main': main
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'
</style>