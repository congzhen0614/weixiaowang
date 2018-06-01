<template>
	<div class="mine-message-function">
		<!-- 头部 -->
		<section class="mine-message-function-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">功能消息</p>
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
						<!-- 刊物或者图书 -->
						<div v-if="item.cls === '2'" class="book-item">
							<p class="title">{{ item.title }}</p>
							<div class="detail">
								<div class="left-part">
									<img :src="item.logo">
								</div>
								<div class="right-part">
									<div class="box">
										<p class="text">{{ item.text }}</p>
									</div>
								</div>
							</div>
						</div>
						<!-- 开始结束普通通知 -->
						<div v-if="!item.cls" class="common-item">
							<p class="title">{{ item.title }}</p>
							<p v-if="!item.isType" class="desc">{{ item.content }}</p>
						</div>
						<!-- 活动培训 -->
						<div v-if="item.cls === '13'" class="activity-item">
							<p class="title">{{ item.title }}</p>
							<div class="img">
								<img :src="item.logo">
							</div>
							<p class="text">{{ item.text }}</p>
						</div>
						<!-- 评论 -->
						<div v-if="item.type === 'comment'" class="comment-item">
							<span class="text">{{ item.text }}</span>
							<span class="comment-text">{{ item.commentText }}</span>
							<span class="text">>></span>
						</div>
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
		logo: require('@/common/icons/avatar.jpg'),
		title: '微校网更新通知(标题和内容后台编辑)',
		time: '3分钟前',
		status: '未付款~',
		text: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内...',
		noread: true,
		number: 2,
		cls: '2'
	}, {
		time: '3分钟前',
		title: '微校网更新通知(标题和内容后台编辑)',
		content: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容',
		isType: false
	}, {
		logo: require('@/common/icons/avatar.jpg'),
		time: '3分钟前',
		title: '帖子图片视频标题帖子图片视频标题帖子图片视频标题',
		content: '私信内容私信内容私信内容私信内容私信内容',
		text: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内...',
		cls: '13',
		isType: true
	}, {
		time: '3分钟前',
		text: '您的回复已被管理员删除',
		commentText: '//评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内..',
		type: 'comment'
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
	@import './function.styl'
</style>