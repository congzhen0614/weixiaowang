<template>
	<div class="index">
		<keep-alive>
			<component :is="tabView" @changeTabIndex="changeTabIndex" ref="view"></component>
		</keep-alive>
		<footer class="footer">
			<div @click="changeTabIndex(0)" class="home">
				<div class="img" :class="{ active: tabIndex === 0 }"></div>
				<p :class="{ active: tabIndex === 0 }">首页</p>
			</div>
			<div @click="changeTabIndex(1)" class="circle">
				<div class="img" v-show="tabIndex !== 1"></div>
				<div v-show="tabIndex === 1" class="icon">
					<div class="inner">
						<img src="./icon.png">
					</div>
				</div>
				<p :class="{ active: tabIndex === 1 }">{{ tabIndex !== 1 ? '圈子' : '发表' }}</p>
			</div>
			<div @click="changeTabIndex(2)" class="shopcat">
				<div class="img" :class="{ active: tabIndex === 2 }"></div>
				<p :class="{ active: tabIndex === 2 }">购物车</p>
			</div>
			<div @click="changeTabIndex(3)" class="mine">
				<div class="img" :class="{ active: tabIndex === 3 }"></div>
				<p :class="{ active: tabIndex === 3 }">我的</p>
			</div>
		</footer>
	</div>
</template>

<script>
	import home from './home/home'
	import circle from './circle/circle'
	import shopcat from './shopcat/shopcat'
	import mine from './mine/mine'
	export default {
		name: 'index',
		data () {
			return {
				// 根据状态显示那个视图
				tabIndex: this.$store.state.homePageTabIndex,
				// 四个视图
				tabList: ['home', 'v-circle', 'shopcat', 'mine']
			}
		},
		created () {
			// 监听去逛逛
			this.$root.Bus.$on('goHangout', (value, event) => {
				this.changeTabIndex(0)
			})
		},
		computed: {
			// 显示内容
			tabView () {
				return this.tabList[this.tabIndex]
			}
		},
		mounted () {
		},
		methods: {
			// 切换tab栏
			changeTabIndex (index) {
				// 广播切换状态
				this.$store.commit('setHomePageIndex', index)
				this.tabIndex = index
			}
		},
		components: {
			home,
			'v-circle': circle,
			shopcat,
			mine
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>