<template>
	<div class="mine-focus">
		<!-- 头部 -->
		<section class="mine-focus-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">{{ title }}</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="focus-list">
			<li v-for="(item, index) in listData" ref="listItem" class="focus-item">
				<!-- 左侧图片 -->
				<div class="left-media">
					<img src="./back_icon.png">
				</div>
				<!-- 右侧文字 -->
				<div class="right-part">
					<div class="text-part">
						<p class="top-line">
							<span class="text">{{ item.nickName }}</span>
							<img v-if="item.isMerchant" src="./merchant.png">
						</p>
						<p class="bottom-line">{{ item.content }}</p>
					</div>
					<div v-if="index === 0" class="right-btn either">互相关注</div>
					<div v-if="index === 1" class="right-btn attention">关注TA</div>
					<div v-if="index === 2" class="right-btn cancel">取消关注</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let listData = [{
		nickName: '理会',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		number: 3,
		time: '10分钟',
		isMerchant: true,
		logo: require('@/pages/index/mine/avatar.jpg')
	}, {
		nickName: '理会',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		number: 0,
		time: '10分钟',
		logo: require('@/pages/index/mine/avatar.jpg')
	}, {
		nickName: '理会',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		number: 3,
		time: '10分钟',
		logo: require('@/pages/index/mine/avatar.jpg')
	}]
	export default {
		data () {
			return {
				startX: 0,
				// 数据
				listData: listData,
				// 删除序号
				deleteIndex: -1,
				// 标题
				title: '互相关注'
			}
		},
		computed: {
		},
		mounted () {
			this.title = this.$route.query.title
			this.$nextTick(() => {
				if (this.listData.length) {
					this.listenTouchEvent()
				}
			})
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 监听滑动事件
			listenTouchEvent () {
				this.$refs.listItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						// event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						let endX = event.changedTouches[0].clientX
						if (this.hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.deleteIndex = -1
							}
							return false
						} else {
							this.deleteIndex = -1
						}
						console.log(event.target)
						if (this.startX - endX > 30) {
							event.stopPropagation()
							this.deleteIndex = index
						}
					})
				})
			},
			// 判断有没有 class
			hasClass (element, name) {
				return element.className.match(RegExp('(\\s|^)' + name + '(\\s|$)'))
			},
			// 添加 class
			addClass (element, name) {
				element.className += ' ' + name
			},
			// 删除 class
			deleteClass (element, name) {
				if (this.hasClass(element, name)) {
					element.className.replace(RegExp('(\\s|^)' + name + '(\\s|$)'), ' ')
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './focus.styl'
</style>