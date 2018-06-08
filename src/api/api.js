import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

let Obj = new Vue()

// 判断全局变量 NODE_ENV
// 环境切换
// let environment = process.env.NODE_ENV === 'development' ? 'dev' : 'product'
// let environment = 'product' // 正式环境
let environment = 'dev' // 测试环境


// 线上
let productHost = location.protocol + '//app.51weixiao.com'
// 测试
let devHost = location.protocol + '//192.168.0.231:8080'
// 老接口使用
let serverHost = environment === 'dev' ? devHost : productHost

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.baseURL = environment === 'dev' ? location.protocol + '//192.168.0.231:8080/app-api/api' : location.protocol + '//app.51weixiao.com/app-api/api'
// axios.defaults.baseURL = location.protocol + '//192.168.0.231:8080/app-api/api'
// axios.defaults.baseURL = location.protocol + '//192.168.0.200:8080/app-api/api'

// POST 传参序列化
axios.interceptors.request.use((config) => {
	// 光 post
	if (config.headers['Content-Type'] !== 'application/json') {
		config.data = qs.stringify(config.data)
	}
	return config
}, (error) => {
	Obj.Toast.hide()
	Obj.Toast.fail({
		title: '错误的传参'
	})
	return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
	Obj.Toast.hide()
	if (!res.data.status) {
		return res
	}
	if (res.data.status === '-1' && res.data.msg) {
		// Obj.Toast.fail({
		// 	title: res.data.msg
		// })
		return Promise.reject(res)
	}
	if (res.data.status !== '0') {
		// Obj.Toast.fail({
		// 	title: res.data.data.tip
		// })
		return Promise.reject(res)
	}
	return res
}, (error) => {
	Obj.Toast.hide()
	// Obj.Toast.fail({
	// 	title: '网络异常'
	// })
	return Promise.reject(error)
})

// 配置请求方式
export function fetch (url, params, type, dataType) {
	return new Promise((resolve, reject) => {
		if (dataType) {
			axios({
				headers: {
					'Content-Type': 'application/json'
				},
				method: type,
				data: params,
				url: url
			})
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
		} else if (type) {
			if (type === 'get') {
				axios.get(url).then(response => {
					resolve(response)
				}, err => {
					reject(err)
				})
				.catch((error) => {
					reject(error)
				})
			} else if (type === 'delete') {
				axios({
					method: 'delete',
					data: params,
					url: url
				})
				.then(response => {
					resolve(response)
				}, err => {
					reject(err)
				})
				.catch((error) => {
					reject(error)
				})
			}
		} else {
			axios({
				method: 'post',
				data: params,
				url: url
			})
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
		}
	})
}

// 接口列表
export default {
	// 判断登录
	configLogin (obj) {
		if (!localStorage.getItem('userId')) {
			// obj.Toast.warning({
			// 	title: '请先登录'
			// })
			// 将当前页传给登录页
			setTimeout(() => {
				obj.$router.push({
					path: '/login',
					query: {
						backRoute: obj.$route.path,
						backQuery: JSON.stringify(obj.$route.query),
						href: window.location.href
					}
				})
				return false
			}, 300)
		} else {
			return true
		}
	},
	/*
		get 方法
	*/
	getAjax (url) {
		return fetch(url, {}, 'get')
	},
	/*
		post 方法
	*/
	postAjax (url, params) {
		return fetch(url, params)
	},
	/*
		用户登录
	*/
	Login (params) {
		return fetch('/user/login', params)
	},
	/*
		活动详情
	*/
	activityDetail (params) {
		return fetch('/activity/activityDetil', params)
	},
	/*
		票务列表
	*/
	// listActivityTicket (params) {
	// 	return fetch('/activityTicket/listActivityTicket', params)
	// },
	/*
		生成订单
	*/
	activetradeConfirm (params) {
		return fetch('/activetrade/confirm', params)
	},
	/*
		实名制
	*/
	applyUserSave (params) {
		return fetch('/activetrade/applyUserSave', params)
	},
	/*
		支付宝支付
	*/
	getWapOrderInfoByAliPay (params) {
		return fetch('/alipay/getWapOrderInfoByAliPay', params)
	},
	/*
		微信支付
	*/
	getOfficialAccountPrepayInfo (params) {
		return fetch('/wxpay/getOfficialAccountPrepayInfo', params)
	},
	/*
		评论列表
	*/
	listComment (params) {
		return fetch('/activecomment/listComment', params)
	},
	/*
		删除评论
	*/
	activecommentDel (params) {
		return fetch('/activecomment/del', params)
	},
	/*
		找回密码时获取验证码
	*/
	userGetPass (params) {
		return fetch('/user/get_pass', params)
	},
	/*
		提交验证码
	*/
	validateVerifyCode (params) {
		return fetch('/user/validate_verify_code', params)
	},
	/*
		注册获取验证码
	*/
	sendVerifyCode (params) {
		return fetch('/user/send_verify_code', params)
	},
	/*
		重新设置密码
	*/
	userUpdatePass (params) {
		return fetch('/user/update_pass', params)
	},
	/*
		培训详情
	*/
	trainDetail (params) {
		return fetch('/train/trainDetail', params)
	},
	/*
		注册
	*/
	register (params) {
		return fetch('/user/register', params)
	},
	/*
		添加购物车
	*/
	saveShopcat (params) {
		return fetch('/shop_cart/save', params, 'post', 'json')
	},
	/*
		修改购物车
	*/
	updateShopcat(params) {
		return fetch('/shop_cart/update', params, 'post', 'json')
	},
	/*
		清空购物车
	*/
	shopcatDel(params) {
		return fetch('shop_cart/del', params, 'post', 'json')
	},
	/*
		购物车列表
	*/
	shopcatList () {
		let user_id = localStorage.getItem('userId')
		return fetch(`/shop_cart/uid/${user_id}`, {}, 'get')
	},

	/*
		设置收货地址
	*/
	addressUpdate (params) {
		// return fetch(`${serverHost}/api/address/update`, params)
		let user_id = localStorage.getItem('userId')
		return fetch(`/address/${user_id}/update`, params, 'post', 'json')
	},
	/*
		删除收货地址
	*/
	addressDelete (id) {
		// return fetch(`${serverHost}/api/address/del`, params)
		let user_id = localStorage.getItem('userId')
		return fetch(`/address/${user_id}/del/${id}`, {}, 'delete')
	},
	/*
		地址列表
	*/
	addressList () {
		let user_id = localStorage.getItem('userId')
		return fetch(`/address/${user_id}`, {}, 'get')
	},
	/*
		取消订单
	*/
	tradeCancel (params) {
		return fetch('/trade/cancel', params, 'post', 'json')
	},
	/*
		删除订单
	*/
	tradeDel (params) {
		return fetch('/trade/del', params, 'post', 'json')
	},
	/*
		获取首页数据
	*/
	getHomePage () {
		return fetch('/homepage/open', {}, 'get')
	},
	/*
		圈子列表
	*/
	getCircleList (params) {
		return fetch('/circle/circleList', params)
	},
	/*
		首页热门搜索
	*/
	hotSearch () {
		return fetch('/homepage/hotSearch/open', {}, 'get')
	},
	/*
		首页搜索字典表类型
	*/
	searchType () {
		return fetch('/homepage/searchtype/open', {}, 'get')
	},
	/*
		模糊搜索
	*/
	doSearch (params) {
		return fetch('/homepage/search/open', params)
	},
	/*
		微书城首页
	*/
	bookHomepage () {
		return fetch('/book/homepage/open', {}, 'get')
	},
	/*
		图书种类列表
	*/
	bookConstant () {
		return fetch('/book/constant/open', {}, 'get')
	},
	/*
		图书列表
	*/
	bookList (params) {
		let query = qs.stringify(params)
		return fetch(`/book/open?${query}`, {}, 'get')
	},
	/*
		今日优惠、新品上市列表
	*/
	bookFixedColumn (type) {
		return fetch(`/book/fixedColumn/${type}/open`, {}, 'get')
	},
	/*
		图书详情
	*/
	// bookDetail (id) {
	// 	return fetch(`/book/${id}/open`, {}, 'get')
	// },
	bookDetail (id, params) {
		let query = qs.stringify(params)
		return fetch(`/book/${id}/open?${query}`, {}, 'get')
	},
	/*
		图片评论列表
	*/
	bookComment (id, level) {
		return level ? fetch(`/book/${id}/comment/open?level=${level}`, {}, 'get') : fetch(`/book/${id}/comment/open`, {}, 'get')
	},
	/*
		圈子 - 0: 社区, 1: 频道
	*/
	circleChannelList (params) {
		return fetch('/circle/channelList', params)
	},
	/*
		加入收藏
	*/
	addCollect (params) {
		return fetch('/fav/save', params, 'post', 'json')
	},
	/*
		取消收藏
	*/
	delCollect (params) {
		// let query = qs.stringify(params)
		// return fetch(`/fav/del?${query}`, {} , 'get')
		return fetch('/fav/del', params, 'post', 'json')
	},
	/*
		获取收藏列表
	*/
	getCollect (params) {
		let query = qs.stringify(params)
		return fetch(`/fav/list?${query}`, {} , 'get')
	},
	/*
		我的首页
	*/
	userHomePage () {
		return fetch('/user/HomePage', {
			user_id: localStorage.getItem('userId')
			// user_id: '100095'
		})
	},
	/*
		双十一订单
	*/
	doubleEleven (params) {
		return fetch('/trade/confirm/book/doubleEleven', params, 'post', 'json')
	},
	/*
		微信配置信息
	*/
	weixinConfig (params) {
		return fetch('/weixin/config', params, 'post', 'json')
	},
	/*
		杂志下单
	*/
	tradeConfirmMagazine (params) {
		return fetch('/trade/confirm/magzine', params, 'post', 'json')
	},
	/*
		商品（图书）下单
	*/
	tradeConfirmBook (params) {
		return fetch('/trade/confirm/book', params, 'post', 'json')
	},
	/*
		孩子管理列表
	*/
	childList () {
		let uid = localStorage.getItem('userId') || '100095'
		return fetch(`/child/${uid}`, {}, 'get')
	},
	/*
		孩子管理编辑
	*/
	childUpdate (params) {
		let uid = localStorage.getItem('userId')
		return fetch(`/child/${uid}/update`, params , 'post', 'json')
	},
	/*
		我的订单列表
	*/
	tradeList (params) {
		let uid = localStorage.getItem('userId')
		let query = qs.stringify(params)
		return fetch(`/trade/uid/${uid}?${query}`, {}, 'get', 'json')
	},
	/*
		订单详情
	*/
	tradeDetail (params) {
		let query = qs.stringify(params)
		return fetch(`/trade/detail?${query}`, {}, 'get', 'json')
	},
	/*
		订单评价
	*/
	tradeComment (params) {
		return fetch('/trade/comment', params, 'post', 'json')
	},
	/*
		领券中心列表
	*/
	couponList (params) {
		let query = qs.stringify(params)
		return fetch(`/coupon?${query}`, {}, 'get', 'json')
	},
	/*
		领取优惠券
	*/
	couponReceive (id) {
		let userId = localStorage.getItem('userId')
		return fetch(`/coupon/${id}/receive?_uid=${userId}`, {}, 'get', 'json')
	},
	/*
		我的优惠券, 用于查看我的全部优惠券
	*/
	mineCoupon () {
		let userId = localStorage.getItem('userId')
		return fetch(`/user/coupon?_uid=${userId}`,{},'get','json')
	},
	/*
		我的可用优惠券, 用于订单页面
	*/
	mineCouponOrder (params) {
		return fetch('/user/coupon/order', params, 'post', 'json')
	},
  /*
   申请退款
   */
  applyRefund (params) {
    return fetch(`/trade/apply_refund`, params, 'post', 'json')
  },
  /*
   取消退款
   */
  cancleApplyRefund (detailId) {
    return fetch(`/trade/cancel_apply_refund/${detailId}`, {}, 'post', 'json')
  },
  /*
   上传图片
   */
  upLiadImages (file) {
    return fetch(`/upload`, file, 'post', 'json')
  },
  /*
   确认收货
   */
  confirmRec (detailId) {
    return fetch(`/trade/${detailId}/confirmRec`, {}, 'post', 'json')
  },
  /*
   物流信息
   */
  logistics (params) {
    let query = qs.stringify(params)
    return fetch(`/trade/express?${query}`, {}, 'get', 'json')
  },
  /*
   活动页首页数据
   */
  actHomeJson (params) {
    let query = qs.stringify(params)
    return fetch(`/activity/activityHome?${query}`, {}, 'get', 'json')
  },
  /*
   活动页首页banner
   */
  itemPage (params) {
    let query = qs.stringify(params)
    return fetch(`/advert/itemPage?${query}`, {}, 'get', 'json')
  },
  /*
   活动列表页数据
   */
  listActivity (params) {
    let query = qs.stringify(params)
    return fetch(`/activity/listActivity?${query}`, {}, 'get', 'json')
  },
  /*
   活动列表页数据
   */
  enumVelue (params) {
    let query = qs.stringify(params)
    return fetch(`/activity/enumVelue.do?${query}`, {}, 'get', 'json')
  },
  // 活动详情
  activityDetil (params) {
    let query = qs.stringify(params)
    return fetch(`/activity/activityDetil.do?${query}`, {}, 'get', 'json')
  },
  // 评价-保存
  commentSave (params) {
    return fetch(`/comment/save`, params, 'post', 'json')
  },
  // 评价-列表
  commentList (params) {
    let query = qs.stringify(params)
    return fetch(`/comment/list?${query}`, {}, 'get', 'json')
  },
  // 评价-详情
  commentDetail (params) {
    let query = qs.stringify(params)
    return fetch(`/comment/detail?${query}`, {}, 'get', 'json')
  },
  // 评价-删除
  commentDel (params) {
    let query = qs.stringify(params)
    return fetch(`/comment/del?${query}`, {}, 'get', 'json')
  },
  // 票务管理列表
  listActivityTicket (params) {
    let query = qs.stringify(params)
    return fetch(`/activityTicket/listActivityTicket?${query}`, {}, 'get', 'json')
  },
  // 提交活动报名订单接口
  confirmOrder (params) {
    // let query = qs.stringify(params)
    return fetch(`/activetrade/confirm/order`, params, 'post', 'json')
  }
}
