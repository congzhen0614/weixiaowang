<template>
	<ul class="circle-list">
		<transition-group enter-active-class="animated" leave-active-class="animated slideOutRight">
		<li :key="item.id" v-for="item in listData" class="list-item" @click="openDetail">
			<!-- 标题 -->
			<p class="title">
				<span class="text">{{ item.title }}</span>
				<span v-if="parseInt(item.is_best)" class="color-label c00b7ee">精</span>
				<span v-if="parseInt(item.img_quantity)" class="color-label c3fc97d">图</span>
				<!-- <span class="color-label cf7996c">热</span> -->
			</p>
			<!-- 图片 -->
			<ul v-if="item.imgList && item.imgList.length && item.type !== '0'" class="media-list">
				<li v-for="img in item.imgList" ref="listImg" :style="getImgStyle(item.imgList.length)" class="img-item">
					<img v-lazy="img">
				</li>
			</ul>
			<!-- 视频 -->
			<ul v-if="item.type === '0'" class="media-list">
				<li v-for="img in item.imgList" ref="listImg" :style="getImgStyle(item.imgList.length)" class="img-item">
					<img v-lazy="img">
				</li>
				<div class="video-icon" @click="playItem($event)">
					<img src="./index_video_icon.png">
				</div>
				<div class="video-box" :style="getVideoStyle()">
					<video :src="item.videoSrc"></video>
				</div>
			</ul>
			<!-- 底部 -->
			<div class="bottom">
				<div class="left-part">
					<div class="comment item">
						<img src="./comment_icon.png">
						<span class="count">{{ item.comment_count }}</span>
					</div>
					<div class="like item">
						<img src="./like_icon.png">
						<span class="count">{{ item.zan_count }}</span>
					</div>
					<div class="time item">
						<img src="./time_icon.png">
						<span class="count">{{ item.created_at | getPastTimeText }}前</span>
					</div>
				</div>
				<div class="right-part">
					<img class="avatar" v-lazy="item.user_avatar">
					<span class="name">{{ item.user_name }}</span>
				</div>
			</div>
			<!-- 其他 -->
			<div class="other">
				<span class="other-label attention">
					<span v-if="item.attention" class="flag">已</span>关注
				</span>
				<span class="other-label type">
					{{ item.channel_name }}
				</span>
				<!-- 首页可关闭单条按钮 -->
				<div v-if="indexPage" class="close-icon" @click="closeItem(item.id)">
					<img src="./close_icon.png">
				</div>
			</div>
		</li>
		</transition-group>
	</ul>
</template>

<script>
	export default {
		name: 'circle-list',
		props: {
			listData: {
				type: Array
			},
			indexPage: {
				type: Boolean
			}
		},
		data () {
			return {}
		},
		watch: {
			listData (newVal, oldVal) {
				if (!newVal.length) {
					return
				}
				newVal.forEach((item, index) => {
					// 没有imgList的话
					if (!item.imgList && item.res_path) {
						item.imgList = item.res_path.split(',')
					}
					// 为视频的情况下
					if (item.type === '0') {
						item.videoSrc = item.imgList[1]
					}
				})
			}
		},
		methods: {
			// 获取图片高度 style 对象
			getImgStyle (length) {
				let resize = window.innerWidth / 375
				let ip6Width = ((375 - 20) - (length - 1) * 5) / length
				return {
					height: ip6Width * 0.6 * resize + 'px',
					lineHeight: ip6Width * 0.6 * resize + 'px'
				}
			},
			// 获得视频的 style 对象
			getVideoStyle () {
				let resize = window.innerWidth / 375
				let ip6Width = 375 - 20
				return {
					width: '100%',
					height: ip6Width / 16 * 9 * resize + 'px',
					lineHeight: ip6Width / 16 * 9 * resize + 'px'
				}
			},
			// 关闭单条
			closeItem (id) {
				this.$emit('closeItem', id)
			},
			// 播放当前视频
			playItem (el) {
				console.log(el)
				el.target.style.display = 'none'
				let video = el.target.parentNode.parentNode.querySelector('.video-box video')
				video.setAttribute('controls', true)
				video.play()
			},
			openDetail () {
			}		
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>