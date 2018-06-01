/*
	购物车
*/
const shopcatIndex = resolve => require(['@/pages/shopcat/home.vue'], resolve) // 购物车首页
const shopcatOrder = resolve => require(['@/pages/shopcat/order/order.vue'], resolve) // 购物车首页
const shopcatOrderMain = resolve => require(['@/pages/shopcat/order/main.vue'], resolve) // 购物车首页
const shopcatCoupon = resolve => require(['@/pages/shopcat/coupon/coupon.vue'], resolve) // 购物车优惠券
const shopcatAddress = resolve => require(['@/pages/shopcat/address/index.vue'], resolve) // 购物车地址列表
const shopcatAddressEdit = resolve => require(['@/pages/shopcat/address/address.vue'], resolve) // 购物车地址添加
const shopcatOrderLeave = resolve => require(['@/pages/shopcat/leave/leave.vue'], resolve) // 购物车留言

export default {
	index: { // 首页
		path: '/shopcat/index',
		component: shopcatIndex
	},
	order: { // 下单
		path: '/shopcat/order',
		component: shopcatOrder,
		children: [{
			path: '/',
			component: shopcatOrderMain,
			meta: {
				keepAlive: true
			}
		}, {
			path: 'coupon',
			component: shopcatCoupon
		}, {
			path: 'address',
			component: shopcatAddress
		}, {
			path: 'address/edit',
			component: shopcatAddressEdit
		}, {
			path: 'leave',
			component: shopcatOrderLeave
		}]
	}
}
