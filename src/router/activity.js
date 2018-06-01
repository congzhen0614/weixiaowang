/*
	活动页
*/
// 页面间切换动画
const pageTransition = resolve => require(['@/pages/pageTransition.vue'], resolve)
// const activity = resolve => require(['@/pages/activity/activity.vue'], resolve) // 活动页面路由控制
// const actIndex = resolve => require(['@/pages/activity/actIndex.vue'], resolve) // 活动首页
const actQuery = resolve => require(['@/pages/activity/query/query.vue'], resolve) // 按条件查询

export default { //活动页面
	path: '/activity',
	component: pageTransition,
	children: [{ // 按条件查询
    path: '/actQuery',
    name: 'actQuery',
    component: actQuery
  }]

}
