// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import VueLazyload from 'vue-lazyload'

// 引入动画库
require('animate.css/animate.min.css')

// 过滤器
import * as custom from './common/js/filter.js'
Object.keys(custom).forEach(key => {
	Vue.filter(key, custom[key])
})

// 懒加载
Vue.use(VueLazyload, {
	preload: 1.3,
	loading: require('../static/imgs/loading.png'),
	listenEvents: ['scroll', 'resize', 'wheel', 'mousewheel', 'touchmove']
})

Vue.use(Vuex)

let u = navigator.userAgent
Vue.prototype.Toast = new window.AuiToast() // 提示组件
Vue.prototype.Dialog = new window.AuiDialog() // 对话框组件
Vue.prototype.Host = location.protocol + '//app.51weixiao.com' // 服务器地址
Vue.prototype.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
Vue.prototype.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
Vue.prototype.isIosQQ = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && /QQ/.test(u)
Vue.prototype.isWeixin = !!u.match(/MicroMessenger/i)
Vue.prototype.isWeibo = !!u.match(/weibo/)
Vue.prototype.isAndroidQQ = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) && /QQ/.test(u)

// 接口
import api from './api/api.js'
Vue.prototype.$ajax = api

Vue.config.productionTip = false

// 操作router
let routerList = []
router.beforeEach((to, from, next) => {
	if (routerList.length && routerList.indexOf(to.name) === routerList.length - 1) {
		// 后退
		routerList.splice(routerList.length - 1, 1)
		to.meta.isBack = true
	} else {
		// 前进
		routerList.push(from.name || '/')
		to.meta.isBack = false
	}
	next()
})


// 暂时将用户id 设为 100095
// localStorage.setItem('usrId', '100095')

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	data: {
		Bus: new Vue()
	},
	components: { App }
})
