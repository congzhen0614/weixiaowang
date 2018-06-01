<template>
	<div class="mine-address-index">
		<!-- 头部 -->
		<section class="mine-address-index-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">地址管理</p>
			<div class="add-btn" @click="doAdd()">
				添加
			</div>
		</section>
		<empty v-if="!addressList.length"></empty>
		<ul v-if="addressList.length" class="input-list">
			<li v-for="(address, index) in addressList" class="input-item" @click="openAddressItem(address)"  @touchstart="showDeleteButton(address.id)" @touchend="clearLoop(address.id)">
				<section class="header">
					<div class="main">
						<div class="left-part">
							<div class="box">
								<div class="contract">
									<span class="name">{{ address.name }}</span>
									<span class="mobile">{{ address.mobile }}</span>
								</div>
								<div class="address" :style="getAddressBottom(address.address)">{{ address | getFullAddressName }}</div>
							</div>
						</div>
						<div class="right-arrow">
							<img :src="rightArrowSrc">
						</div>
					</div>
				</section>
			</li>
		</ul>
	</div>
</template>

<script>
	import empty from '@/components/common/empty/empty'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				addressList: []
			}
		},
		computed: {
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.addressList({
					// _uid: localStorage.getItem('userId')
				}).then(res => {
					if (res.data.pageInfo.list && res.data.pageInfo.list.length) {
						this.addressList = res.data.pageInfo.list
					}
				}, err => {
					console.log(err)
				})
			},
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 添加
			doAdd () {
				this.$router.push({
					path: '/mine/address/edit'
				})
			},
			// 获得底部距离
			getAddressBottom (address) {
				return address.length > 23 ? '15px' : '25px'
			},
			// 打开单条地址
			openAddressItem (address) {
				this.$router.push({
					path: '/mine/address/edit',
					query: {
						address: JSON.stringify(address)
					}
				})
			},
			showDeleteButton (id) {
				clearInterval(this.Loop)
				var _this = this
				this.Loop = setTimeout(function() {
					this.Dialog.alert({
						title: '温馨提示',
						msg: '确定删除此地址？',
						buttons: ['取消', '确定']
					}, (res) => {
						if (res.buttonIndex === 2) {
							this.$ajax.addressDelete(id).then(res => {
								this.loadData()
							}, err => {
								console.log(err)
							})
							return
						}
					})
				}.bind(this), 600)
			},
			clearLoop (e) {
				clearInterval(this.Loop)
			}
		},
		components: {
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>