/*
	刊物征订相关
*/
const periodicalOrding = resolve => require(['@/components/periodical-ording/index.vue'], resolve) // 幼儿园四本图书
const periodicalOrdingOther = resolve => require(['@/components/periodical-ording/other.vue'], resolve) // 单独一本图书
const periodicalOrdingHome = resolve => require(['@/components/periodical-ording/home/home.vue'], resolve) // 刊物征订调度页
const periodicalOrdingOrder = resolve => require(['@/components/periodical-ording/order/order.vue'], resolve) // 下单页
const periodicalOrdingMain = resolve => require(['@/components/periodical-ording/order/main.vue'], resolve) // 下单页内容部分
const periodicalOrdingLeave = resolve => require(['@/components/periodical-ording/leave/leave.vue'], resolve) // 下单留言
const periodicalOrdingAddresslist = resolve => require(['@/components/periodical-ording/address/index.vue'], resolve) // 下单地址
const periodicalOrdingAddress = resolve => require(['@/components/periodical-ording/address/address.vue'], resolve) // 下单地址
const periodicalOrdingDetail = resolve => require(['@/components/periodical-ording/detail/detail.vue'], resolve) // 刊物详情
// 广东深圳
const periodicalOrdingOther1 = resolve => require(['@/components/periodical-ording/other1.vue'], resolve) // 广东深圳学校专用(主要为运费区别)

export default {
	ording: { // 刊物征订
		path: '/peridoical/ording',
		component: periodicalOrding,
		children: [{
			path: '/',
			component: periodicalOrdingHome,
			meta: {
				keepAlive: true // 需要缓存
			}
		}, {
			path: 'detail',
			component: periodicalOrdingDetail,
			meta: {
				keepAlive: false // 需要缓存
			}
		}]
	},
	other: { // 刊物征订新加
		path: '/peridoical/other',
		component: periodicalOrdingOther,
		children: [{
			path: '/',
			component: periodicalOrdingHome,
			meta: {
				keepAlive: true // 需要缓存
			}
		}, {
			path: 'detail',
			component: periodicalOrdingDetail,
			meta: {
				keepAlive: false // 需要缓存
			}
		}]
	},
	otherShenZhen: { // 刊物征订新加广东深圳
		path: '/periodical/other1',
		component: periodicalOrdingOther1,
		children: [{
			path: '/',
			component: periodicalOrdingHome,
			meta: {
				keepAlive: true // 需要缓存
			}
		}, {
			path: 'detail',
			component: periodicalOrdingDetail,
			meta: {
				keepAlive: false // 需要缓存
			}
		}]
	},
	order: { // 刊物下单
		path: '/periodical/order',
		component: periodicalOrdingOrder,
		children: [{
			path: '/',
			component: periodicalOrdingMain,
			meta: {
				keepAlive: true
			}
		}, { // 留言
			path: 'leave',
			component: periodicalOrdingLeave,
			meta: {
				keepAlive: true
			}
		}, { // 地址
      path: 'addresslist',
      component: periodicalOrdingAddresslist,
      meta: {
        keepAlive: true
      }
    }, { // 地址
      path: 'address',
      component: periodicalOrdingAddress,
      meta: {
        keepAlive: true
      }
    }]
	}
}
