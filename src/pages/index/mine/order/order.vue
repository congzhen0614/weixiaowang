<template>
	<section class="mine-order">
		<p class="title">我的订单</p>
		<ul class="order-list">
			<li @click.prevent.stop="openUrl(item.path, item.title, item.cls)" v-for="(item, index) in menuList" class="list-item">
				<img v-lazy="item.src">
				<p>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
  name: 'mine-order',
  data () {
    return {
      menuList: [{
        src: require('./periodical_logo.png'),
        title: '刊物',
        cls: '1',
        path: '/mine/order'
      }, {
        src: require('./bookmall_logo.png'),
        title: '微书城',
        cls: '2',
        path: '/mine/order'
      }, {
        src: require('./activity_logo.png'),
        title: '活动培训',
        cls: '13',
        path: '/mine/order'
      }, {
        src: require('./shopmall_logo.png'),
        title: '团购商城',
        cls: '2',
        path: '/mine/order'
      }]
    }
  },
  methods: {
    // 打开单项订单
    openUrl (path, title, cls) {
      if (!path) {
        this.showToast()
        return
      }
      this.$router.push({
        path: path,
        query: {
          title: title,
          cls: cls
        }
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
	@import './order.styl'
</style>
