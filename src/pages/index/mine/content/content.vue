<template>
	<section class="mine-content-row">
		<div v-for="item in computedList" class="content-col" @click="openUrl(item.path)">
			<img v-if="item.src" :src="item.src">
			<p v-if="item.text" class="text">我的{{ item.text }}</p>
		</div>
	</section>
</template>

<script>
	let itemList = [{
		src: require('./collect.png'),
		text: '收藏',
		path: '/mine/collect'
	}, {
		src: require('./integral.png'),
		text: '积分',
		path: '/mine/integral'
	}, {
		src: require('./activity.png'),
		text: '活动',
		path: '/mine/activity'
	}, {
		src: require('./train.png'),
		text: '培训',
		path: '/mine/train'
	}, {
		src: require('./group.png'),
		text: '团购',
		path: '/mine/group'
	}, {
		src: require('./discount.png'),
		text: '优惠券',
		path: '/mine/discount'
	}, {
		src: require('./invitation.png'),
		text: '帖子',
		path: '/mine/circle'
	}]
	export default {
		name: 'mine-content',
		data () {
			return {
				// 类型数组
				itemList: itemList
			}
		},
		computed: {
			// 计算过的数组用于展示
			computedList () {
				let remainder = this.itemList.length % 4
				if (remainder === 0) {
					return this.itemList
				}
				let list = this.itemList
				// 少于4则补全
				for (let i = 4; i > remainder; i--) {
					list.push({})
				}
				return list
			}
		},
		methods: {
			// 打开单项目录
			openUrl (path) {
				this.$router.push({
					path: path
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './content.styl'
</style>