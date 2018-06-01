<template>
	<div class="mine-setting">
		<!-- 头部 -->
		<section class="mine-setting-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">设置</p>
		</section>
		<ul class="input-list">
			<li class="input-item topLine">
				<div class="left-part">
					<img v-lazy="item.avatar || defaultAvatar">
				</div>
				<div class="center-part">
					<div class="block"></div>
					<span class="setting-btn">设置头像</span>
				</div>
			</li>
			<li class="input-item topLine" @click.prevent.stop="openItem('/mine/setting/username')">
				<div class="left-part">
					<span class="text">用户名</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="请输入您的用户名称" readonly>
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item topLine">
				<div class="left-part">
					<span class="text">修改密码</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">忘记密码</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">绑定手机</span>
				</div>
				<div class="center-part" @click="changeBundleMobile()">
					<input v-if="!mobile" type="text" placeholder="点击绑定您的手机号码" readonly>
					<span class="block"></span>
					<span v-if="mobile" class="text">{{ mobile | hideMobile }}</span>
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item topLine">
				<div class="left-part">
					<span class="text">消息通知</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item topLine" @click.prevent.stop="openItem('/mine/setting/feedback')">
				<div class="left-part">
					<span class="text">意见反馈</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item" @click.prevent.stop="openItem('/mine/setting/about')">
				<div class="left-part">
					<span class="text">关于我们</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">当前版本号</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="5.0" readonly>
				</div>
			</li>
			<li class="input-item">
				<div class="left-part">
					<span class="text">去评分</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item" @click.prevent.stop="openItem('/mine/setting/help/index')">
				<div class="left-part">
					<span class="text">使用帮助</span>
				</div>
				<div class="center-part">
				</div>
				<div class="right-part">
					<img :src="rightArrowSrc">
				</div>
			</li>
			<li class="input-item topLine">
				<div class="left-part">
					<span class="text">联系客服</span>
				</div>
				<div class="center-part">
					<input type="text" placeholder="400-847-0068" readonly>
				</div>
				<div class="right-part mobile">
					<img class="mobile-icon" src="./mobile_icon.png">
				</div>
			</li>
		</ul>
		<div class="exit-login" @click="loginOut()">
			退出登录
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				// 默认头像
				defaultAvatar: require('@/common/icons/avatar.jpg'),
				// 数据
				item: {
					gendle: 1
				},
				// 已选中
				isSelected: false,
				// 手机号
				mobile: '13777818859'
			}
		},
		computed: {
		},
		mounted () {
		},
		methods: {
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 保存
			doSave () {
				this.goBack()
			},
			// 更换绑定手机号
			changeBundleMobile () {
				this.Dialog.alert({
					title: '提示',
					msg: '小主，微校网暂不支持解绑或更换绑定手机号码！'
				})
			},
			// 打开单项页面
			openItem (path) {
				this.$router.push({
					path: path
				})
			},
			// 退出登录
			loginOut () {
				this.Dialog.alert({
					title: '温馨提示',
					msg: '您确定要退出吗'
				}, res => {
					if (res.buttonIndex === 2) {
						localStorage.clear()
						this.goBack()
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>