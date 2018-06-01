<template>
	<div class="mine-children">
		<!-- 头部 -->
		<section class="mine-children-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">孩子管理</p>
			<div class="add-btn" @click="doAddChild()">
				添加
			</div>
		</section>
		<!-- 列表 -->
		<ul v-if="listData.length" class="children-list">
			<li v-for="(item, index) in listData" class="children-item" :class="{ deleteShow: deleteIndex === index }" ref="listItem">
				<div class="content">
					<div class="left-part" :style="{ backgroundImage: 'url(' + item.avatar + ')' }">
						<!-- <img :src="item.avatar || defaultAvatar"> -->
					</div>
					<div class="center-part">
						<div class="box">
							<p class="name">
								<span class="text">{{ item.name }}</span>
								<img :src="getGendleSrc(item.sex)">
								<span class="active" v-if="item.active">当前</span>
							</p>
							<p class="address">{{ item.address }}</p>
						</div>
					</div>
					<div class="right-part" @click.prevent="goEdit(item.id)">
						<img src="./right_arrow.png">
					</div>
				</div>
				<div class="delete-button" @click.prevent.stop="deleteChild(item, index)">删除</div>
			</li>
		</ul>
		<!-- 没有数据 -->
		<empty v-if="!listData.length"></empty>
		<!-- 重新设置当前孩子 -->
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
			<v-reset v-if="resetShow" :listData="listData" @closeSelector="closeSelector"></v-reset>
		</transition>
	</div>
</template>

<script>
	import { hasClass } from '@/common/js/common.js'
	import reset from './reset/reset'
	import empty from '@/components/common/empty/empty'
	export default {
		data () {
			return {
				// 默认头像
				defaultAvatar: require('@/common/icons/avatar.jpg'),
				listData: [],
				startX: 0,
				deleteIndex: -1,
				resetShow: false
			}
		},
		computed: {
		},
		created () {
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
				if(this.listData.length) {
					this.listenDelete()					
				}
			})
 		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.childList().then(res => {
					this.listData = res.data.pageInfo.list
				}, err => {
					console.log(err)
				})
			},
			// 监听删除
			listenDelete () {
				this.$refs.listItem.forEach((item, index) => {
					// 记录起始位置
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					// 监听结束为止
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
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 添加孩子
			doAddChild () {
				this.$router.push({
					path: '/mine/children/edit'
				})
			},
			// 孩子性别
			getGendleSrc (gendle) {
				if (parseInt(gendle, 10) === 1) {
					return require('./boy.png')
				} else {
					return require('./girl.png')
				}
			},
			// 去编辑
			goEdit (id) {
				let child = this.listData.filter(item => {
					return item.id === id
				})[0]
				this.$router.push({
					path: 'children/edit',
					query: {
						item: JSON.stringify(child)
					}
				})
			},
			// 删除孩子
			deleteChild (item, index) {
				// 判断是否为当前孩子
				if (item.active) {
					this.resetShow = true
				}
				this.listData.splice(index, 1)
			},
			// 关闭孩子选择
			closeSelector (index) {
				this.listData[index].active = true
				this.resetShow = false
			}
		},
		components: {
			'v-reset': reset,
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './children.styl'
</style>