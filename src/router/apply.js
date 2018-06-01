/*
	下单
*/
const realname = resolve => require(['@/pages/apply/contracts/realname.vue'], resolve) // 联系人实名信息
const apply = resolve => require(['@/pages/apply/apply.vue'], resolve) // 下单路由调度页
const choose = resolve => require(['@/pages/apply/choose/choose.vue'], resolve) // 选择套餐
const contracts = resolve => require(['@/pages/apply/contracts/contracts.vue'], resolve) // 联系人(非实名制)

export default {
	path: '/apply',
	component: apply,
	children: [{ // 选择套餐
		path: '/',
		name: 'apply',
		component: choose,
		meta: {
			keepAlive: true // 需要缓存
		}
	}, { // 联系人
		path: 'contracts',
		component: contracts,
		meta: {
			keepAlive: true // 需要缓存
		}
	}, { // 实名
		path: 'realname',
		component: realname
	}]
}
