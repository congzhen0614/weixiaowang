<template>
	<div class="book-detail-comment">
		<!-- 头部导航栏 -->
		<nav class="nav-list" v-if="levelShow">
			<p class="nav-item" v-for="(level, index) in levels" :class="{ active: levelIndex === index }" @click="changeLevel(index, level.level)">{{ level.desc }}({{ level.total }})</p>
		</nav>
		<!-- 评价 -->
		<ul class="comment-list">
			<li v-for="(item, index) in showList" class="comment-item">
				<div class="left-part">
					<div class="avatar">
						<img :src="item.avatar">
					</div>
				</div>
				<div class="right-part">
					<div class="top">
						<p class="name">{{ item.name }}</p>
						<div class="stars">
							<img v-for="(star, index2) in stars" :class="{ active: index2 <= parseInt(item.score) }" class="star-item" :src="getImgSrc(index2, item.score)">
						</div>
					</div>
					<!-- 内容 -->
					<p class="content">{{ item.content }}</p>
					<ul v-if="item.imgs.length" class="photo-list">
						<li v-for="photo in item.imgs" class="photo-item">
							<img :src="photo">
						</li>
					</ul>
					<p class="time">{{ item.created_at | getPastTimeText }}前</p>
				</div>
			</li>
			<empty v-if="!allCommentList.length"></empty>
		</ul>
	</div>
</template>

<script>
	import empty from '@/components/common/empty/empty'

	export default {
		name: 'book-detail-page',
		props: {
			commentList: {
				type: Array
			},
			levelShow: {
				type: Boolean
			}
		},
		data () {
			return {
				// 评价星星数组
				stars: [0, 1, 2, 3, 4],
				// 等级
				levels: [],
				// 第几条
				levelIndex: 0,
				// 所有评价
				allCommentList: []
			}
		},
		computed: {
			// 在商品中只需要显示三条
			showList () {
				if (!this.levelShow) {
					return this.commentList
				}
				return this.allCommentList
			}
		},
		components: {
			empty
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 星星选中与否
			getImgSrc (index, score) {
				return index < parseInt(score) ? require('./star_active.png') : require('./star.png')
			},
			// 加载数据
			loadData () {
				this.$ajax.bookComment(this.$route.query.id).then(res => {
					this.levels = res.data.levels
					this.allCommentList = res.data.pageInfo.list
					this.$emit('totalComment', res.data.pageInfo.total)
				}, err => {
					console.error(err)
				})
			},
			// 单条评价
			getSingleLevelData (level) {
				this.$ajax.bookComment(this.$route.query.id, level).then(res => {
					this.allCommentList = res.data.pageInfo.list
				}, err => {
					console.error(err)
				})
			},
			// 切换
			changeLevel (index, level) {
				this.levelIndex = index
				this.getSingleLevelData(level)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './comment.styl'
</style>