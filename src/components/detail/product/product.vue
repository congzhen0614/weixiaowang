<template>
	<div class="product-detail">
		<div class="content">
			内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍内容介绍。
		</div>
		<split v-if="activity"></split>
		<div v-if="activity" class="activity">
			<img :src="giveIconSrc">
			<span class="text">捕鱼达人游戏机捕鱼达人游戏机捕鱼达人游戏机</span>
		</div>
		<div class="img-demo-1">
			<img :src="imgDemo1">
		</div>
	</div>
</template>

<script>
import split from '../../common/split/split.vue'

export default {
	name: 'product',
	props: ['activity'],
	data () {
		return {
			imgDemo1: `img_demo_1.jpg`,
			giveIconSrc: `give_icon.png`
		}
	},
	components: {
		split
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import 'product.styl'					
</style>