/*
	搜索相关
*/
const search = resolve => require(['@/pages/search/search.vue'], resolve) // 搜索路由调度页
const searchIndex = resolve => require(['@/pages/search/index.vue'], resolve) // 搜索首页
const searchResult = resolve => require(['@/pages/search/result/result.vue'], resolve) // 搜索结果

export default { // 搜索
	path: '/search',
	component: search,
	children: [{
		path: '/',
		component: searchIndex,
		meta: {
			keepAlive: true
		}
	}, {
		path: 'result:data',
		component: searchResult,
		meta: {
			keepAlive: false
		}
	}]
}
