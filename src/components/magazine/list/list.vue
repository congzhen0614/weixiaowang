<template>
	<ul class="magazine-list">
		<li class="list-item underline dis-flex">
			<div class="left-media">
				<img src="./111.jpg">
			</div>
			<div class="right-part">
				<div class="box">
					<p class="title">杂志名称善杂志名称</p>
					<p class="cycle">
						<span class="times">半年12期加一张光盘</span>
					</p>
					<div class="gift">
						<span class="icon">赠</span>
						<p class="text">捕鱼达人游戏机和变形金是是是洒发顺丰大哥的f</p>
					</div>
					<div class="bottom" @click.prevent.stop="">
						<span class="price">￥<span class="big">{{ 28.00 | getInteger }}</span>{{ 28.00 | getDecimal }}</span>
					</div>
					<div class="cart half-margin-top">
						<span>收藏</span>
						<span>加入购物车</span>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'magazine-list',
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