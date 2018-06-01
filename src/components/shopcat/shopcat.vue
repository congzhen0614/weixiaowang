<template>
	<div class="v-shopcat">
		<!-- 遮罩 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="fold" @click="changeListShow()" class="mask">
			</section>
		</transition>
    <!-- 底部购物车 -->
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div v-show="fold" class="list-box">
				<div class="list-header underline">
					<div class="title">购物车</div>
					<div class="clear-button" @click="clearShopcat()">
						<img src="./clear_button.png">
						<span>清空</span>
					</div>
				</div>
				<ul class="list-body" :style="{ maxHeight: listHeight + 'px' }" @click.prevent.stop="">
					<li v-for="(item, index) in listData" v-if="item.number > 0" class="list-item underline">
						<div class="left-part">
							<img v-lazy="item.logo">
							<span class="title">{{ item.name }}</span>
						</div>
						<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}元</p>
						<div class="list-buttons">
							<img @click="reduceNum(index)" src="./reduce_icon.png">
							<span>{{ item.number }}</span>
							<img @click="addNum(index)" src="./add_icon.png">
						</div>
					</li>
				</ul>
			</div>
		</transition>
		<!-- 杂志征订底部 -->
		<div v-if="entrance === 'ording'" class="ording-bottom">
			<div class="left-part">
				<div class="shopcat-icon" @click="showShopcatList()">
					<span v-if="total" class="dot">{{ total }}</span>
				</div>
				<span v-if="total" @click="clearStorage()" class="now-sum">￥<span class="big">{{ nowSum | getInteger }}</span>{{ nowSum | getFixed1 }}</span>
				<!-- <span class="old-sum">￥{{ oldSum }}</span> -->
			</div>
			<div class="right-button" @click="orderPay()">
				去结算({{ total }})
			</div>
		</div>
		<!-- 其他 -->
		<div v-else class="v-shopcat">
			<div class="item buttons">
				<div class="collect button">
					<div class="img" :class="{ active: collectOn }" @click="toggleCollect()"></div>
					<div class="text">{{ collectText }}</div>
				</div>
				<div class="shop button">
					<div class="dot">
						3
					</div>
					<img src="./shopcat.png">
					<div class="text">购物车</div>
				</div>
			</div>
			<div class="item buy">
				立即购买
			</div>
			<div class="item add">
				放入购物车
			</div>
		</div>
		<!-- 立即购买 -->
		<div v-if="onlyBuy" class="v-shopcat">
			<div class="item buy">
				立即购买
			</div>
		</div>
		<!-- 活动培训详情 -->
		<div v-if="activity" class="v-shopcat" @click="goApply()">
			<div class="item buy activity">
				<img src="./apply.png">
				<span>我要报名</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopcat',
		props: [
			'entrance',
			'onlyBuy',
			'activity',
			'id',
			'nowSum',
			'oldSum',
			'total',
			'selectedListData',
			'listData'
		],
		data () {
			return {
				collect: `collect.png`,
				collectActive: `collect_active.png`,
				collectOn: false,
				// 报名图标
				applyIconSrc: `apply.png`,
				// 展开购物车
				fold: false,
				listHeight: window.innerHeight - 50 - 60
			}
		},
		computed: {
			collectSrc () {
				return this.collectOn ? this.collectActive : this.collect
			},
			collectText () {
				return this.collectOn ? '已收藏' : '收藏'
			}
		},
		methods: {
			// 切换收藏
			toggleCollect () {
				this.collectOn = !this.collectOn
			},
			// 我要报名
			goApply () {
				this.$emit('go-apply')
			},
			// 切换购物车列表显示
			changeListShow () {
				this.fold = !this.fold
			},
			// 展开购物车列表
			showShopcatList () {
				if (!this.total) {
					return
				}
				this.changeListShow()
			},
			// 添加
			addNum (index) {
				this.$emit('addNum', index)
			},
			// 减少
			reduceNum (index) {
				if (this.total <= 1) {
					this.changeListShow()
				}
				this.$emit('reduceNum', index)
			},
			// 清空购物车
			clearShopcat () {
				this.changeListShow()
				this.$emit('clearShopcat')
			},
			// 去结算
			orderPay () {
				this.$emit('orderPay')
			},
			// 清空缓存
			clearStorage () {
				localStorage.clear()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>