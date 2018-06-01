<template>
	<ul class="mall-list">
		<!-- 商城 -->
		<li class="list-item underline mall-item">
			<div class="mall-media">
				<img src="./111.jpg">
			</div>
			<p class="mall-name">团购商品名称团购商品名称团购商品名称团购商品名称团购商品名称团购商品名称团购商品名称团购商品名称</p>
			<div class="mall-bottom">
				<img src="./person_icon.png">
				<span class="size">5人团</span>
				<span class="group">疯狂团</span>
				<span class="price">￥198.0</span>
				<button class="btn">去开团></button>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'mall-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>