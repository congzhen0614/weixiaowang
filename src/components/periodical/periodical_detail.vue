<template>
	<div class="periodical">
		<v-header></v-header>
		<v-content :title="title">
			<div slot="desc" class="desc-perio">
				<div class="activity">
					半年12期加一张光盘
				</div>
				<div class="age">
					适读年龄: 2年级~4年级
				</div>
				<div class="price">
					￥<span class="big">248</span>.00
				</div>
			</div>
		</v-content>
		<div class="product-title">
			简介
		</div>
		<v-product :activity="true"></v-product>
		<split></split>
		<div class="comment-area">
			<v-comment></v-comment>
		</div>
		<v-shopcat :onlyBuy="true"></v-shopcat>
	</div>
</template>

<script>
	import header from '../header/header'
	import content from '../detail/content/content'
	import product from '../detail/product/product'
	import comment from '../detail/comment/comment'
	import split from '../common/split/split'
	import shopcat from '../shopcat/shopcat'
	export default {
		name: 'periodical',
		data () {
			return {
				title: '刊物名称'
			}
		},
		components: {
			'v-header': header,
			'v-content': content,
			'v-product': product,
			'v-comment': comment,
			'v-shopcat': shopcat,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.periodical
		.product-title
			padding: 0 0.2rem
			width: 100%
			height: 0.6rem
			line-height: 0.6rem
			font-size: 0.28rem
			border-1px(#f0f0f0)
		.comment-area
			padding-bottom: 1.6rem
			background: #f0f0f0
</style>