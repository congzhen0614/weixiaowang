<template>
	<header ref="top" class="home-header" :style="headerStyle">
		<div class="position">
			<span ref="cityText" class="text">杭州</span>
			<img ref="cityIcon" src="./down_arrow.png">
		</div>
		<div ref="searchArea" class="search-area" :style="searchStyle" @click="openSearch()">
			<div class="left-part">
				<img ref="searchIcon" src="./search_icon.png">
			</div>
			<div class="right-part">
				<img ref="scanIcon" src="./scan_icon.png">
			</div>
		</div>
		<div class="message" @click="openMessage()">
			<img ref="messageIcon" src="./message_icon.png">
		</div>
	</header>
</template>

<script>
	export default {
		name: 'home-top',
		props: {
			scrollTop: {
				type: Number
			}
		},
		data () {
			return {}
		},
		computed: {
			// 顶部样式
			headerStyle () {
				if (this.scrollTop < 10) {
					this.$nextTick(() => {
						this.$refs.cityText.style.color = '#ffffff'
					})
					return {
						paddingBottom: '0.55rem',
						background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))'
					}
				} else {
					let opacity = (this.scrollTop - 10) / 100 + 0.5
					if (opacity < 0.75) {
						this.$refs.cityIcon.src = require('./down_arrow.png')
						this.$refs.searchIcon.src = require('./search_icon.png')
						this.$refs.scanIcon.src = require('./scan_icon.png')
						this.$refs.messageIcon.src = require('./message_icon.png')
					} else {
						this.$refs.cityIcon.src = require('./down_arrow_black.png')
						this.$refs.searchIcon.src = require('./search_icon_black.png')
						this.$refs.scanIcon.src = require('./scan_icon_black.png')
						this.$refs.messageIcon.src = require('./message_icon_black.png')
					}
					// 搜索框透明度
					if (opacity >= 1) {
						this.$refs.cityText.style.color = `rgba(82, 63, 26, 1)`
						return {
							paddingBottom: '0.15rem',
							background: 'rgba(248, 189, 72, 1)'
						}
					} else {
						this.$refs.cityText.style.color = `rgba(82, 63, 26, ${opacity})`
						return {
							paddingBottom: '0.15rem',
							background: `rgba(248, 189, 72, ${opacity})`
						}
					}
				}
			},
			// 搜索框样式
			searchStyle () {
				if (this.scrollTop < 10) {
					return {
						background: `rgba(255, 255, 255, 0.5)`
					}
				} else {
					let opacity = (this.scrollTop - 10) / 300 + 0.5
					// 搜索框透明度
					if (opacity >= 1) {
						return {
							background: `rgba(255, 255, 255, 0.95)`
						}
					} else {
						let searchOpa = opacity - 0.05
						return {
							background: `rgba(255, 255, 255, ${searchOpa})`
						}
					}
				}
			}
		},
		created () {
		},
		methods: {
			// 打开搜索页
			openSearch () {
				this.$router.push({
					path: '/search'
				})
			},
			openMessage () {
				this.$router.push({
					path: '/mine/message/index'
				})
			} 
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>