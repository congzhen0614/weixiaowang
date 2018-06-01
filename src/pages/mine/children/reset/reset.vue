<template>
	<div class="reset-children">
		<div class="close-icon" @click="closeSelector()">
			<img src="./close_icon.png">
		</div>
		<p class="reset-reminder">
			{{ remindText }}
		</p>
		<!-- 孩子列表 -->
		<ul class="children-list">
			<li v-for="(item, index) in listData" class="children-item">
				<div class="left-part">
					<img v-lazy="item.avatar">
				</div>
				<div class="center-part">
					<span class="name">{{ item.name }}</span>
					<img :src="getGendleSrc(item.gendle)">
				</div>
				<div class="right-part" @click="selectItem(index)">
					<img :src="getSelectBtnSrc(item, index)">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {
				activeIndex: -1
			}
		},
		computed: {
			// 提示文字
			remindText () {
				if (this.activeIndex < 0) {
					return '移除前您需要重新设置一位孩子为“当前孩子”。'
				} else {
					return '您已设置【' + this.listData[this.activeIndex].name + '】为“当前孩子”。'
				}
			}
		},
		methods: {
			// 孩子性别
			getGendleSrc (gendle) {
				if (parseInt(gendle, 10) === 1) {
					return require('../boy.png')
				} else {
					return require('../girl.png')
				}
			},
			// 选中孩子按钮
			getSelectBtnSrc (item, index) {
				if (this.activeIndex === index) {
					return require('./select_btn_active.png')
				} else {
					return require('./select_btn.png')
				}
			},
			// 选中孩子
			selectItem (index) {
				this.activeIndex = index
			},
			// 关闭
			closeSelector () {
				this.$emit('closeSelector', this.activeIndex)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './reset.styl'
</style>