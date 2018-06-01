<template>
	<div>
		<!-- 图书 -->
		<div v-if="book" class="top-header underline">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p>详情页</p>
			<div class="right-part">
				<div class="fenxiang"></div>
			</div>
		</div>
		<!-- 刊物 -->
		<div v-if="period" class="top-header underline">
			<div class="left-part">
				<div class="home-icon" @click="goHome()"></div>
			</div>
			<p>刊物</p>
			<div class="right-part">
				<div class="search right-icon-1"></div>
				<div class="shopcat right-icon-2">
					<div class="dot">
						3
					</div>
				</div>
			</div>
		</div>
		<!-- 活动 -->
		<div v-if="activity" class="top-header underline">
			<div class="left-part">
				<div class="home-icon" @click="goHome()"></div>
			</div>
			<slot name="title"></slot>
			<div @click="doLoginOut()" class="right-part">
				<!-- 退出登录 -->
				<div v-show="shareShow" class="share right-icon-1"></div>
				<div class="collect right-icon-2" @click="toggleCollect()">
					<div class="icon" :class="{ active: isCollected}"></div>
					<!-- <img ref="collect" src="./collect_active.png"> -->
				</div>
			</div>
		</div>
		<!-- 报名 -->
		<div v-if="entrance === 'apply'" class="top-header underline">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p class="apply">{{ title }}</p>
			<div @click="doLoginOut()" class="right-part">
				<!-- 退出登录 -->
			</div>
		</div>
		<!-- 活动图片 -->
		<div v-if="entrance === 'images'" class="top-header underline">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p class="apply">{{ title }}</p>
			<div class="right-part">
			</div>
		</div>
		<!-- 默认 -->
		<div v-if="entrance === 'login'" class="top-header">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p v-if="title">{{ title }}</p>
			<div class="right-part">
			</div>
		</div>
	</div>
</template>

<script>
	// import router from '../../router'

	export default {
		name: 'header',
		props: ['book', 'period', 'isCollected', 'activity', 'entrance', 'title'],
		data () {
			return {
				shareShow: false
			}
		},
		created () {
		},
		methods: {
			// 返回上一页
			goBack () {
				// 设置 history
				localStorage.setItem('historyLength', localStorage.getItem('historyLength') - 1)
				this.$emit('goBack')
				this.$router.goBack()
			},
			// 返回首页
			goHome () {
				// window.location.reload()
				this.$router.goBack()
			},
			// 切换收藏
			toggleCollect () {
				this.isCollected = !this.isCollected
			},
			// 退出登录
			doLoginOut () {
				localStorage.removeItem('userId')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './header.styl'
</style>