/*
	图书相关
*/
const book = resolve => require(['@/pages/book/book.vue'], resolve) // 路由控制页面
const bookIndex = resolve => require(['@/pages/book/index.vue'], resolve) // 微书城首页
const bookSearch = resolve => require(['@/pages/book/search/search.vue'], resolve) // 微书城条件筛选页
const bookSingle = resolve => require(['@/pages/book/single/single.vue'], resolve) // 微书城单项页
const bookDetail = resolve => require(['@/pages/book/detail/index.vue'], resolve) // 图书详情

export default { // 微书城
	path: '/book',
	component: book,
	children: [{
		path: '/',
		component: bookIndex,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 0
		}
	}, {
		path: 'search',
		component: bookSearch,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 1
		}
	}, {
		path: 'single',
		component: bookSingle,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 2
		}
	}, {
		path: 'detail',
		component: bookDetail,
		meta: {
			keepAlive: false,
			isBack: false,
			index: 3
		}
	}]
}
