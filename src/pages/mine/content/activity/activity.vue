<template>
	<div class="mine-activity">
		<!-- 头部 -->
		<section class="mine-activity-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">我的活动</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="activity-list">
			<li v-for="(item, index) in listData" class="activity-item">
				<div class="list-body">
					<div class="left-part">
						<img v-lazy="item.logo">
					</div>
					<div class="right-part">
						<div class="box">
							<p class="name">{{ item.name }}</p>
							<p class="price">
								<span class="small">￥</span>
								<span class="big">{{ item.price | getInteger }}</span>
								<span class="small">{{ item.price | getDecimal }}</span>
							</p>
						</div>
					</div>
				</div>
				<!-- 底部按钮 -->
				<div class="bottom-btns">
					<span class="bottom-btn commented">已评分</span>
					<span class="bottom-btn comment" @click="goEvaluate()">去评分</span>
					<span class="bottom-btn delete">删除</span>
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
		price: '50.00'
	}, {
		logo: require('@/common/icons/avatar.jpg'),
		name: '儿童故事画报推理小侦探成长不烦恼笑话与漫画',
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
		computed: {
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 去评分
			goEvaluate () {
				this.$router.push({
					path: '/mine/activity/evaluate'
				})
			}
		},
		components: {
			'v-recommend': recommend
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './activity.styl'
</style>