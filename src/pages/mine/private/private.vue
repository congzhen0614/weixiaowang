<template>
	<div class="mine-private">
		<!-- 头部 -->
		<section class="mine-private-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">我的私信</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="private-list">
			<li v-for="(item, index) in listData" ref="listItem" :class="{ deleteShow: deleteIndex === index}" class="private-item">
				<div class="content">
					<!-- 左侧图片 -->
					<div class="left-media">
						<img src="./back_icon.png">
					</div>
					<!-- 右侧文字 -->
					<div class="right-part">
						<p class="top-line">
							<span class="nickname">{{ item.nickName }}</span>
							<span class="time">{{ item.time }}</span>
						</p>
						<p class="bottom-line">
							<span class="content">{{ item.content }}</span>
							<span class="number" v-if="item.number">{{ item.number }}</span>
						</p>
					</div>
				</div>
				<div class="delete-button">移除</div>
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
				deleteIndex: -1
			}
		},
		computed: {
		},
		mounted () {
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
	@import './private.styl'
</style>