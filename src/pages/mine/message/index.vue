<template>
	<div class="mine-message">
		<!-- 头部 -->
		<section class="mine-message-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">消息中心</p>
			<div class="submit-btn" @click="doSubmit()">
				<img :src="settingIconSrc">
			</div>
		</section>
		<!-- 导航条 -->
		<nav class="nav-list">
			<div v-for="(navItem, index) in navList" class="list-item" @click="openItem(navItem.path)">
				<div class="content">
					<div class="left-part">
						<img :src="navItem.logo">
					</div>
					<div class="center-part">
						<div class="box">
							<div class="title-time">
								<p class="title">{{ navItem.title }}</p>
								<p class="time">1个月前</p>
							</div>
							<p v-if="navItem.unread" class="text unread">{{ navItem.unread }}条未读消息</p>
							<p v-if="!navItem.unread" class="text">暂无新消息</p>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<!-- 导航条 -->
		<ul class="talk-list">
			<li ref="listItem" v-for="(talkItem, index) in talkList" class="list-item" :class="{ deleteShow: deleteIndex === index }">
				<div class="content">
					<div class="left-part">
						<img :src="talkItem.logo">
					</div>
					<div class="center-part">
						<div class="box">
							<div class="title-time">
								<p class="title">{{ talkItem.title }}</p>
								<p class="time">1个月前</p>
							</div>
							<p class="text">{{ talkItem.content }}</p>
						</div>
					</div>
				</div>
				<div class="delete-box">移除</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let navList = [{
		logo: require('./message_system_logo.png'),
		title: '系统消息',
		unread: 0,
		path: 'system'
	}, {
		logo: require('./message_order_logo.png'),
		title: '订单消息',
		unread: 1,
		path: 'order'
	}, {
		logo: require('./message_function_logo.png'),
		title: '功能消息',
		unread: 0,
		path: 'function'
	}]
	let talkList = [{
		logo: require('./message_function_logo.png'),
		title: 'Daniel Richards',
		content: '私信内容私信内容私信内容私信内容私信内容私信…'
	}]
	import { hasClass } from '@/common/js/common.js'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				settingIconSrc: require('@/common/icons/setting_icon.png'),
				navList: navList,
				talkList: talkList,
				deleteIndex: -1,
				startX: 0
			}
		},
		computed: {
		},
		mounted () {
			this.$nextTick(() => {
				if (this.talkList.length) {
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
			// 打开单项
			openItem (path) {
				this.$router.push({
					path: path
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>