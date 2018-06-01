<template>
	<div class="mine-group">
		<!-- 头部 -->
		<section class="mine-group-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">我的团购</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="group-list">
			<li v-for="(item, index) in listData" class="group-item">
				<div class="left-part">
					<img v-lazy="item.logo">
				</div>
				<div class="right-part">
					<div class="box">
						<p class="name">{{ item.name }}</p>
						<p class="type">
							<span class="num">{{ item.number }}</span>
							<span class="all">/{{ item.all }}</span>
						</p>
						<div class="bottom-btns">
							<span v-if="index ===0" class="bottom-btn grouping">团购中</span>
							<span v-if="index ===1" class="bottom-btn success">团购成功</span>
							<span v-if="index ===2" class="bottom-btn failed">团购失败</span>
							<span v-if="index ===1" class="bottom-btn backed">已返现10元</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<v-recommend></v-recommend>
	</div>
</template>

<script>
	let listData = [{
		logo: require('@/common/icons/avatar.jpg'),
		name: '我们爱科学(快乐动漫)',
		number: 20,
		all: '20人团',
		price: '50.00'
	}, {
		logo: require('@/common/icons/avatar.jpg'),
		name: '我们爱科学我们爱科学我们爱科学我们爱科学我们(快乐动漫)',
		number: 20,
		all: '疯狂团',
		price: '50.00'
	}, {
		logo: require('@/common/icons/avatar.jpg'),
		name: '我们爱科学我们爱科学我们爱科学我们爱科学我们(快乐动漫)',
		number: 20,
		all: '疯狂团',
		price: '50.00'
	}]
	import recommend from '@/pages/book/recommend/recommend'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				listData: listData
			}
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		},
		components: {
			'v-recommend': recommend
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './group.styl'
</style>