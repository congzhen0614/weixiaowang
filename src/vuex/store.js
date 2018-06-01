import Vue from 'vue'
import Vuex from 'vuex'

// 开发环境用
// if (process.env.NODE_ENV === 'development') {
Vue.use(Vuex)
// }

const store = new Vuex.Store({
	// 定义状态
	state: {
		author: 'zqczx00',
		history: 0,
		homePageTabIndex: 0,
		lastScrollTop: 0
	},
	// 设置方法
	mutations: {
		newAuthod (state, msg) {
			state.author = msg
		},
		// 设置历史
		setHistory (state, num) {
			state.history = num
		},
		// 首页切换
		setHomePageIndex (state, num) {
			state.homePageTabIndex = num
		}
	}
})

export default store
