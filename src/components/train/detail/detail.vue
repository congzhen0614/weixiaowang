<template>
	<div class="train-detail">
		<v-header :activity="true" :isCollected="false">
			<p slot="title">{{ title }}</p>
		</v-header>
		<v-link v-if="linkShow" @close-link="closeLink()"></v-link>
		<v-content :info="info" :activity="true" :type="type">
			<div slot="desc" class="desc activity">
				<div class="title">
					<!-- <span class="age">{{ info.age }}</span> -->
					<span v-if="parseInt(info.ishot)" class="hot">热</span>
					<div class="time">
						<img src="./time.png">
						<span class="text">{{ publish }}发布</span>
					</div>
				</div>
				<div class="text">
					{{ info.content }}
				</div>
				<div class="price">
					￥<span class="num">{{ info.min_fee }}</span>元起
				</div>
			</div>
			<label slot="timeText" class="desc">{{ timeText }}</label>
		</v-content>
		<split></split>
		<div class="comment-area">
			<v-comment :entrance="entrance" :cls="cls" :eventId="id"></v-comment>
		</div>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<split></split>
		<v-shopcat :activity="true" :id="id" @go-apply="goApply()"></v-shopcat>
	</div>
</template>

<script>
	import header from '../../header/header'
	import link from '../../common/link/link'
	import shopcat from '../../shopcat/shopcat'
	import content from '../../detail/content/content'
	import comment from '../../detail/comment/comment'
	import split from '../../common/split/split'
	import { getUpdateDay, getQueryString } from '../../../common/js/date.js'
	export default {
		name: 'activityDetail',
		data () {
			return {
				entrance: 'activity',
				id: getQueryString('id'),
				cls: getQueryString('cls') || 19,
				linkShow: true,
				author: this.$store.state.author,
				wxLogin: false,
				type: '培训',
				info: {}
			}
		},
		computed: {
			// 标题
			title () {
				return this.type + '详情'
			},
			publish () {
				return getUpdateDay(this.info.updated_at)
			},
			// 日期描述
			timeText () {
				return this.type + '日期'
			}
		},
		created () {
		},
		mounted () {
			document.title = this.title
			// 获取数据
			this.getData()
		},
		methods: {
			// 获取数据
			getData () {
				// 重置历史
				this.resetHistory()
				this.Toast.loading({
					title: '加载中...'
				})
				let _data = {
					id: this.id,
					cls: this.cls
				}
				this.$ajax.trainDetail(_data)
					.then((res) => {
						let data = res.data.data.detail
						data.begin_time = getUpdateDay(data.begin_time)
						data.end_time = getUpdateDay(data.end_time)
						data.business_list = JSON.parse(res.data.data.business_list)
						if (data.imgs && data.imgs.length) {
							data.imgs = JSON.parse(data.imgs)
						}
						this.info = data
					}, err => {
						console.log(err)
					})
			},
			// 获得更新后的时间
			getUpdateDay (time) {
				return getUpdateDay(time)
			},
			// 关闭link
			closeLink () {
				this.linkShow = false
			},
			// 立即报名
			goApply () {
				// this.$store.commit('setHistory', this.$store.state.history + 1)
				if (!this.configLogin()) {
					return false
				}
				this.$router.push({
					path: '/apply',
					query: {
						id: this.id,
						is_realname: this.info.is_realname,
						href: location.href,
						cls: this.cls
					}
				})
			},
			// 判断登录
			configLogin () {
				// 测试登录
				// localStorage.setItem('userId', '')
				// this.weixinLogin()
				// 判断是否登录
				if (!localStorage.getItem('userId')) {
					// 判断浏览器
					let ua = navigator.userAgent.toLowerCase()
					if (ua.match(/MicroMessenger/i)) {
						this.weixinLogin()
						return false
					}
					// 提示
					this.Toast.warning({
						title: '请先登录！'
					})
					this.$router.push({
						path: '/login',
						query: {
							id: this.id,
							cls: this.cls,
							href: location.href
						}
					})
					return false
				}
				return true
			},
			// 微信登录
			weixinLogin () {
				let id = this.id
				let isRealname = this.info.is_realname
				let cls = this.cls
				let protocol = location.protocol
				let host = location.host
				let href = location.href
				let _href = encodeURIComponent(`${protocol}//${host}/apply:${this.id}?id=${id}&cls=${cls}&is_realname=${isRealname}&href=${href}`)
				let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
				let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
				let appId = 'wx701b0e6e6faac47c'
				let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
				window.location.href = _url
			},
			// 重置历史记录
			resetHistory () {
				localStorage.setItem('historyLength', 0)
			}
		},
		components: {
			'v-header': header,
			'v-link': link,
			'v-content': content,
			'v-comment': comment,
			split,
			'v-shopcat': shopcat
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './detail.styl'
</style>