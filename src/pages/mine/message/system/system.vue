<template>
	<div class="mine-message-system">
		<!-- 头部 -->
		<section class="mine-message-system-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">系统消息</p>
			<div class="submit-btn" @click="doSubmit()">
				<img :src="settingIconSrc">
			</div>
		</section>
		<!-- 列表 -->
		<ul class="message-list">
			<li ref="listItem" v-for="(item, index) in messageList" class="list-item">
				<p class="time">{{ item.time }}</p>
				<div class="list-box" :class="{ deleteShow: index === deleteIndex }">
					<div class="content">
						<p class="title">{{ item.title }}</p>
						<p v-if="!item.isType" class="desc">{{ item.content }}</p>
						<p v-if="item.isType" class="info">
							<span class="label-name">状态：</span>
							<span class="text fail">失败</span>
							<span class="label-name">类型：</span>
							<span class="text">帖子</span>
						</p>
						<span class="dot" v-if="item.noread"></span>
					</div>
					<div class="delete-box" ref="deleteBox">移除</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let messageList = [{
		time: '3分钟前',
		title: '微校网更新通知(标题和内容后台编辑)',
		content: '微校网更新新版本啦，快去下载试试吧！>>',
		isType: false,
		noread: true
	}, {
		time: '3分钟前',
		title: '微校网更新通知(标题和内容后台编辑)',
		content: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容',
		isType: false
	}, {
		time: '3分钟前',
		title: '帖子图片视频标题帖子图片视频标题帖子图片视频标题',
		content: '私信内容私信内容私信内容私信内容私信内容',
		isType: true
	}]
	import { hasClass } from '@/common/js/common.js'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				settingIconSrc: require('@/common/icons/setting_icon.png'),
				messageList: messageList,
				deleteIndex: -1,
				startX: 0
			}
		},
		computed: {
		},
		mounted () {
			this.$nextTick(() => {
				this.getDeleteLineHeight()
				if (this.messageList.length) {
					this.listenTouchEvent()
				}
			})
		},
		methods: {
			// 监听滑动事件
			listenTouchEvent () {
				this.$refs.listItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.deleteIndex = -1
							}
							return false
						} else {
							this.deleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.deleteIndex = index
						}
					})
				})
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 提交
			doSubmit () {
				this.$router.push({
					path: '/mine/setting'
				})
			},
			// 获得行高
			getDeleteLineHeight () {
				this.$refs.deleteBox.forEach(item => {
					item.style.lineHeight = item.offsetHeight + 'px'
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './system.styl'
</style>