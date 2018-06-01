<template>
	<header ref="top" class="book-detail-header">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./back_icon.png">
		</div>
		<div ref="searchArea" class="title">
			<ul class="top-tab">
				<li v-for="(item, index) in showItems" class="tab-item" :class="{ active: topTabIndex === index }" @click="changeTopTabIndex(index)">{{ item }}</li>
			</ul>
		</div>
		<!-- 分享 -->
		<div class="share" @click="shareChange()" >
			<img src="./share_icon.png">
			<span style="width: 0.4rem;"></span>
		</div>
		<!-- 更多 -->
		<div class="more" @click="change()">
			<img src="./more_icon.png">
			<span style="width: 0.4rem;"></span>
		</div>
		<div class="more-box" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp"  v-show="!fold">
			<ul>
				<li @click="goHome()">
					<img src="./toHome.png">
					<p>首页</p>
				</li>
				<li @click="goMessage()">
					<img src="./toMessage.png">
					<p>消息</p>
				</li>
				<li @click="goSearch()">
					<img src="./toSearch.png">
					<p>搜索</p>
				</li>
				<li @click="goMine()">
					<img src="./toMine.png">
					<p>我的微校网</p>
				</li>
			</ul>
		</div>

		<!-- 遮罩层 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="!fold" @click="hideSelector()" class="mask">
			</section>
		</transition>
	</header>

</template>

<script>
	export default {
		name: 'book-top',
		props: {
			topTabIndex: {
				type: Number
			},
			showItems: {
				type: Array
			}
		},
		data () {
			return {
				// 收起
				fold: true,
				fold1: true
			}
		},
		computed: {
		},
		created () {
		},
		methods: {
			// 切换显示内容
			changeTopTabIndex (index) {
				this.$emit('changeTopTabIndex', index)
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			goHome () {
				this.$router.push({
					path: '/'
				})
			},
			goMessage () {
				this.$router.push({
					path: '/mine/message/index'
				})
			},
			goSearch () {
				this.$router.push({
					path: '/search'
				})
			},
			goMine () {
				this.$router.push({
					path: '/mine'
				})
			},
			// 隐藏选择器
			hideSelector () {
				this.fold = true
			},
			change () {
				if (this.fold === false) {
					this.fold = true
					return
				}
				this.fold = false
			},
			shareChange () {
				if (this.fold === true) {
					this.fold = false
				}
				this.fold = true

				this.$parent.change()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>
