<template>
	<div>
		<div class="comment">
			<!-- 活动 -->
			<div v-if="entrance === entranceList[0]" class="title activity">
				<span class="text">最新评论</span>
				<span class="right-text">{{ commentList.length }}</span>
				<img src="./comment_icon.png" class="comment-icon">
			</div>
			<div v-else class="title">
				<!-- <div class="img comment-icon"></div> -->
				<img src="./comment_icon.png">
				<span class="text">评论</span>
				<span class="right-text">共23条评论</span>
			</div>
			<ul class="comment-list">
				<li v-for="(item, index) in commentList" v-if="index < commentShowThreshold" class="list-item">
					<div class="avatar" :class="{ round: entrance === entranceList[0] }">
						<img :src="item.avatar">
					</div>
					<div class="content">
						<div v-if="entrance !== entranceList[0]" class="level">
							<img v-for="star in levels" :src="getLevel(item.starLevel, star)">
						</div>
						<div v-if="entrance === entranceList[0]" class="name" :class="{ activity: entrance === entranceList[0] }">
							<span>{{ item.nick_name }}</span>
							<!-- <span class="right-text" @click="toggleCollect(item, index)">点赞 <span class="c999999">({{ item.zan_quantity }})</span></span> -->
							<span class="right-text">点赞 <span class="c999999">({{ item.zan_quantity }})</span></span>
							<img src="./like_icon.png" class="comment-icon">
						</div>
						<div v-else class="name">洛可可</div>
						<div v-if="entrance !== entranceList[0]" class="time">
							2016-05-18 12:36:50
						</div>
						<div class="text">
							{{ item.content }}
						</div>
						<div v-if="item.imgs && item.imgs.length" class="photos">
							<div v-for="img in transformArr(item.imgs)" class="item">
								<img ref="imgs" :src="img">
							</div>
						</div>
						<div v-if="entrance === entranceList[0]" class="bottom">
							<div class="location">
								<img src="./comment_location.png">
								<span class="">{{ item.area }}</span>
							</div>
							<div class="times">
								<img src="./time.png">
								<span class="">{{ getPastTimeText(item.created_at) }}前</span>
							</div>
							<div class="reply">
								<img src="./reply.png">
								<span class="">回复({{ item.comment_quantity }})</span>
							</div>
							<div v-if="item.canDel" @click="delComment(item.id, item.sid)" class="deletes">
								<img src="./delete.png">
								<span class="delete-text">删除</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="show-all" :class="{ activity: entrance === entranceList[0]}" style="margin-top: 0.2rem" v-if="holdOn" @click="showMore('comment')">
			<span class="text" :class="{ down: entrance !== entranceList[0]}" v-show="!commentUnfold">查看所有评论</span>
			<span class="text" :class="{ up: entrance !== entranceList[0]}" v-show="commentUnfold">收起</span>
		</div>
	</div>
</template>

<script>
	// let commentList = []
	let starSrc = `star.png`
	let starActiveSrc = `star_active.png`
	// for (var j = 0; j < 6; j++) {
	// 	commentList.push({
	// 		url: `book.jpg`,
	// 		starLevel: 4,
	// 		likes: 5,
	// 		time: 1,
	// 		reply: 6
	// 	})
	// }
	import {getPastTimeText} from '../../../common/js/date.js'
	export default {
		name: 'comment',
		props: ['entrance', 'cls', 'eventId'],
		data () {
			return {
				commentList: [],
				commentThreshold: 3, // 评论阈值
				commentShowThreshold: 3, // 评论显示阈值
				commentUnfold: false, // 评论是否展开
				imgList: [{
					url: `book.jpg`
				}, {
					url: `book.jpg`
				}, {
					url: `book.jpg`
				}],
				levels: [1, 2, 3, 4, 5],
				entranceList: ['activity']
			}
		},
		mounted () {
			this.getData()
		},
		computed: {
			holdOn () {
				return this.commentList.length > this.commentThreshold
			}
		},
		methods: {
			showMore (entrance) {
				this[entrance + 'Unfold'] = !this[entrance + 'Unfold']
				if (this[entrance + 'Unfold']) {
					this[entrance + 'ShowThreshold'] = this[entrance + 'List'].length
				} else {
					this[entrance + 'ShowThreshold'] = this[entrance + 'Threshold']
				}
			},
			getLevel (num, index) {
				return num >= index ? starActiveSrc : starSrc
			},
			// 获取过去时间
			getPastTimeText (time) {
				return getPastTimeText(time)
			},
			// 转换成数组
			transformArr (str) {
				return str.split(',')
			},
			// 点赞/取消
			toggleCollect (item, index) {
				let _url = `/activecomment/zan?cls=${this.cls}&comment_id=${item.id}&event_id=${this.eventId}&_uid=${localStorage.getItem('userId')}`
				this.$ajax.getAjax(_url)
					.then((res) => {
						// console.log(res)
						this.commentList[index].is_zan = !this.commentList[index].is_zan
						if (!this.commentList[index].is_zan) {
							this.commentList[index].zan_quantity = parseInt(this.commentList[index].zan_quantity) + 1
						} else {
							if (this.commentList[index].zan_quantity <= 0) {
								return
							}
							this.commentList[index].zan_quantity = parseInt(this.commentList[index].zan_quantity) - 1
						}
					}, err => {
						console.log(err)
					})
			},
			getData () {
				this.Toast.loading({
					title: '正在获取评论列表...'
				})
				let _data = {
					cls: this.cls,
					sid: this.eventId
				}
				// 获取评论列表
				this.$ajax.listComment(_data)
					.then((res) => {
						this.Toast.hide()
						res.data.data.list.filter((item) => {
							if (item.uid === localStorage.getItem('userId')) {
								item.canDel = true
							}
							return item
						})
						this.commentList = res.data.data.list
					}, err => {
						console.log(err)
					})
			},
			// 删除评论
			delComment (id, sid) {
				let _data = {
					sid: sid,
					toid: id,
					cls: this.$route.query.cls
				}
				this.$ajax.activecommentDel(_data)
					.then((res) => {
						this.Toast.success({
							title: '删除成功！'
						})
					}, err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './comment.styl'
</style>