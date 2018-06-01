<template>
	<ul ref="list" class="mine-collect-list">
		<li v-if="listData && listData.length" ref="listItem" v-for="(item, index) in listData" :class="{ deleteShow: deleteIndex === index}" class="list-item" @click.prevent.stop="getCollect()">
			<div class="content">
				<div class="list-body">
					<!-- 左侧图片 -->
					<div class="left-media">
						<img src="./back_icon.png">
					</div>
					<!-- 右侧文字 -->
					<div class="right-part">
						<div class="box">
							<p class="name">{{ item.name }}</p>
							<!-- 除了微课堂 -->
							<p v-if="item.type !== '微课堂'" class="price">
								<span class="small">￥</span>
								<span class="big">{{ item.price | getInteger }}</span>
								<span class="small">{{ item.price | getDecimal }}</span>
							</p>
							<!-- 微课堂 -->
							<p v-if="item.type === '微课堂'" class="datas">
								<img src="./video_icon.png">
								<span class="text">{{ item.video }}</span>
								<img class="comment-icon" src="./comment_icon.png">
								<span class="text">{{ item.comment }}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="delete-button">
				取消<br/>收藏
			</div>
		</li>
		<div class="empty-box" v-if="!listData.length">
			<img src="./empty_logo.png">
			<p class="text">暂无内容</p>
		</div>
		<v-recommond></v-recommond>
	</ul>
</template>

<script>
	import { hasClass } from '@/common/js/common.js'
	import recommond from '@/pages/book/recommend/recommend'
	export default {
		name: 'mine-collect-list',
		// props: {
		// 	listData: {
		// 		type: Array
		// 	}
		// },
		data () {
			return {
				startX: 0,
				deleteIndex: -1,
				listData: []
			}
		},
		mounted () {
			this.$nextTick(() => {
				if (this.listData.length) {
					this.listenTouchEvent()
				}
			})
		},
		watch: {
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
			// 打开详情页
			openDetail () {
				this.$router.push({
					path: '/mine/collect/detail',
					query: {
						cls: this.$route.query.cls
					}
				})
			},
			// 获取数据
			getCollect () {
				let params = {
					_uid: localStorage.getItem('userId'),
					cls: '2'
				}
				this.$ajax.getCollect(params).then(res => {
					this.listData = res.data.data.list
					console.log(this.listData)
				}, err => {
					console.log(err)
				})
			}

		},
		components: {
			'v-recommond': recommond
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>