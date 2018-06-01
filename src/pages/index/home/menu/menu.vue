<template>
	<section class="index-menu">
		<ul class="menu-list">
			<li @click.prevent.stop="openUrl(item.path)" v-for="(item, index) in menuList" class="list-item">
				<img v-lazy="item.src">
				<p>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
	let menuList = [{
		src: require('./periodical_logo.png'),
		title: '刊物',
		path: 'http://192.168.0.231:8080/www/index'
	}, {
		src: require('./bookmall_logo.png'),
		title: '微书城',
		path: '/book'
	}, {
		src: require('./shopmall_logo.png'),
		title: '微商城',
		path: '/book'
	}, {
		src: require('./activity_logo.png'),
		title: '活动',
		path: '/activityIndex'
	}, {
		src: require('./train_logo.png'),
		title: '培训',
		path: '/book'
	}]
	export default {
		name: 'index-menu',
		data () {
			return {
				// 按钮数组
				menuList: menuList
			}
		},
		methods: {
			// 打开单项内容
			openUrl (path) {
				if (!path) {
					this.showToast()
					return
				}
				if (path === 'http://192.168.0.231:8080/www/index') {
          window.location.href = 'http://192.168.0.231:8080/www/index'
          return
        }
				this.$router.push({
					path: path
				})
			},
			// 提示
			showToast () {
				this.Toast.warning({
					title: '<p>该功能正在开发中</p><p>敬请期待...</p>'
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './menu.styl'
</style>
