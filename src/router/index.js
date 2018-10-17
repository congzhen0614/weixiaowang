import Vue from 'vue'
import Router from 'vue-router'

// 登录注册
import loginRouter from './login.js'
// 刊物征订
import periodicalOrdingRouter from './periodicalOrding.js'
// 下单
import applyRouter from './apply.js'
// 购物车
import shopcatRouter from './shopcat.js'
// app分享
import shareDetailRouter from './shareDetail.js'
// 微书城
import bookRouter from './book.js'
// 搜索
import searchRouter from './search.js'
// 活动
import activity from './activity'

// 活动 activityRouter
// 分享详情 (部分后期被替代)
const detail = resolve => require(['@/components/detail/detail.vue'], resolve) // 详情
const info = resolve => require(['@/components/detail/info/info.vue'], resolve) // 信息
const address = resolve => require(['@/components/detail/address/address.vue'], resolve) // 地址
const periodicalDetail = resolve => require(['@/components/periodical/periodical_detail.vue'], resolve) // 杂志详情
// 下单相关
const pay = resolve => require(['@/pages/apply/pay/pay.vue'], resolve) // 支付
const result = resolve => require(['@/pages/apply/result/result.vue'], resolve) // 支付结果
// 查看图片
const view = resolve => require(['@/components/common/view/view.vue'], resolve)
// app 首页
const index = resolve => require(['@/pages/index/index.vue'], resolve) // 首页

// 圈子(未做)
// import circle from '@/pages/circle/circle'
// import circleIndex from '@/pages/circle/index'

// 我的
const mineIndex = resolve => require(['@/pages/index/mine/mine.vue'], resolve)
const mineOrder = resolve => require(['@/pages/mine/order/periodical/periodical.vue'], resolve) // 订单列表
const mineOrderDetail = resolve => require(['@/pages/mine/order/detail/detail.vue'], resolve) // 订单详情
const mineOrderEvaluate = resolve => require(['@/pages/mine/order/evaluate/evaluate.vue'], resolve) // 订单评价
const mineOrderEvaluateSingle = resolve => require(['@/pages/mine/order/evaluate/single.vue'], resolve) // 订单单条评价
const mineOrderEvaluateResult = resolve => require(['@/pages/mine/order/evaluate/result.vue'], resolve) // 订单评价结果
const mineOrderRefund = resolve => require(['@/pages/mine/order/refund/refund.vue'], resolve) // 订单申请退款
const mineOrderRefundSingle = resolve => require(['@/pages/mine/order/refund/single.vue'], resolve) // 订单申请退款
const mineOrderActivitySingle = resolve => require(['@/pages/mine/order/refund/activity.vue'], resolve) // 订单申请退款
const minePrivate = resolve => require(['@/pages/mine/private/private.vue'], resolve) // 我的私信
const mineFocus = resolve => require(['@/pages/mine/private/focus.vue'], resolve) // 我的私信
const mineCoupon = resolve => require(['@/pages/mine/private/coupon.vue'], resolve) // 我的领券中心
const mineChildren = resolve => require(['@/pages/mine/children/children.vue'], resolve) // 我的孩子管理
const mineChildrenEdit = resolve => require(['@/pages/mine/children/edit/edit.vue'], resolve) // 我的孩子编辑
const mineAddress = resolve => require(['@/pages/mine/address/index.vue'], resolve) // 我的地址管理
const mineAddressEdit = resolve => require(['@/pages/mine/address/address.vue'], resolve) // 我的地址编辑
const mineCollect = resolve => require(['@/pages/mine/content/collect/collect.vue'], resolve) // 我的收藏
const mineIntegral = resolve => require(['@/pages/mine/content/integral/integral.vue'], resolve) // 我的收藏
const mineActivity = resolve => require(['@/pages/mine/content/activity/activity.vue'], resolve) // 我的活动
const mineActivityEvaluate = resolve => require(['@/pages/mine/content/activity/evaluate.vue'], resolve) // 我的活动评价
const mineTrain = resolve => require(['@/pages/mine/content/train/train.vue'], resolve) // 我的活动
const mineTrainEvaluate = resolve => require(['@/pages/mine/content/train/evaluate.vue'], resolve) // 我的活动评价
const mineGroup = resolve => require(['@/pages/mine/content/group/group.vue'], resolve) // 我的团购
const mineDiscount = resolve => require(['@/pages/mine/content/discount/discount.vue'], resolve) // 我的优惠券
const mineCircle = resolve => require(['@/pages/mine/content/circle/circle.vue'], resolve) // 我的帖子
const mineSetting = resolve => require(['@/pages/mine/setting/index.vue'], resolve) // 我的页面-设置
const mineSettingUsername = resolve => require(['@/pages/mine/setting/username/username.vue'], resolve) // 我的页面-设置
const mineSettingFeedback = resolve => require(['@/pages/mine/setting/feedback/feedback.vue'], resolve) // 我的页面-反馈
const mineSettingAbout = resolve => require(['@/pages/mine/setting/about/about.vue'], resolve) // 我的页面-关于我们
const mineSettingHelp = resolve => require(['@/pages/mine/setting/help/help.vue'], resolve) // 我的页面-使用帮助
const mineSettingHelpDetail = resolve => require(['@/pages/mine/setting/help/detail.vue'], resolve) // 我的页面-使用帮助
const mineMessage = resolve => require(['@/pages/mine/message/index.vue'], resolve) // 我的页面-消息中心
const mineMessageSystem = resolve => require(['@/pages/mine/message/system/system.vue'], resolve) // 我的页面-消息中心
const mineMessageOrder = resolve => require(['@/pages/mine/message/order/order.vue'], resolve) // 我的页面-订单中心
const mineMessageFunction = resolve => require(['@/pages/mine/message/function/function.vue'], resolve) // 我的页面-功能中心
const logisticsList = resolve => require(['@/pages/mine/order/logistics/logistics.vue'], resolve) // 我的页面-物流详情

// 活动页面
const getPacket = resolve => require(['@/pages/activities/getPacket/getPacket.vue'], resolve)
const doubleTwelve = resolve => require(['@/components/periodical-ording/double-twelve/index.vue'], resolve) // 双十二
const newYear = resolve => require(['@/components/periodical-ording/newyear/index.vue'], resolve) // 双旦活动
const activityIndex = resolve => require(['@/pages/activity/index.vue'], resolve) // 活动页首页
const activityDetails = resolve => require(['@/pages/activity/activityDetails/index.vue'], resolve) // 活动详情页面
const activityComment = resolve => require(['@/components/comment/activityComment.vue'], resolve) // 活动详情页面
const applyActivity = resolve => require(['@/pages/activity/applyActivity/applyActivity.vue'], resolve) // 活动报名
const userinfo = resolve => require(['@/pages/activity/applyActivity/userinfo/userinfo.vue'], resolve) // 活动填写用户信息
const realName = resolve => require(['@/pages/activity/applyActivity/realName/realName.vue'], resolve) // 活动填写用户信息
const edituserInfo = resolve => require(['@/pages/activity/applyActivity/edituserInfo/edituserInfo.vue'], resolve) // 活动填写用户信息
const activityOrder = resolve => require(['@/pages/activity/applyActivity/order/order.vue'], resolve) // 活动订单结算
const applyedQuantity = resolve => require(['@/pages/activity/activityDetails/message/applyedQuantity/applyedQuantity.vue'], resolve) // 差价活动人列表
const ticketList = resolve => require(['@/pages/activity/applyActivity/ticketList/ticketList.vue'], resolve) // 活动活动票列表
const bannerImages = resolve => require(['@/pages/activity/activityDetails/bannerImages/bannerImages.vue'], resolve) // 活动活动票列表
const commentList = resolve => require(['@/pages/activity/activityDetails/comment/commentList/commentList.vue'], resolve) // 活动评论列表
const commentDetail = resolve => require(['@/pages/activity/activityDetails/comment/commentDetail/commentDetail.vue'], resolve) // 活动评论详情

// 页面间切换动画
const pageTransition = resolve => require(['@/pages/pageTransition.vue'], resolve)

// match
const match = resolve => require(['@/pages/match/index.vue'], resolve)

// 路由返回上一页
Router.prototype.goBack = function () {
	this.isBack = true
	this.go(-1)
}

// 初始化为 false
Router.isBack = false

// 开发环境用
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/', // 外壳
		component: pageTransition,
		children: [
			loginRouter, // 登录模块
			periodicalOrdingRouter.ording, // 幼儿园杂志征订
			periodicalOrdingRouter.other, // 其他
			periodicalOrdingRouter.otherShenZhen, // 深圳
			periodicalOrdingRouter.order, // 杂志征订下单
			shopcatRouter.index, // 购物车首页
			shopcatRouter.order, // 购物车下单
			applyRouter, // 分享详情-下单
			shareDetailRouter.activity, // 活动分享
			shareDetailRouter.train, // 培训分享
			bookRouter, // 微书城
			// 活动activityRouter
			searchRouter, // 搜索
      activity, // 活动
			{ // 支付
				path: '/pay',
				component: pay
			}, { // 支付结果
				path: '/result',
				component: result
			}, { // 图书信息
				path: '/info',
				name: 'info',
				component: info
			}, { // 详情
				path: '/detail',
				name: 'detail',
				component: detail
			}, { // 书刊详情
				path: 'periodicalDetail',
				component: periodicalDetail
			}, { // 地址
				path: '/address',
				component: address
			}, {
				path: '/view',
				component: view
			}, { // app首页
				path: '/',
				component: index,
				meta: {
					before: true
				}
			}, {
				path: '/mine',
				component: mineIndex
			}, {
				path: '/mine/order',
				component: mineOrder
			}, {
				path: '/mine/order/detail',
				component: mineOrderDetail
			}, {
				path: '/mine/order/evaluate',
				component: mineOrderEvaluate
			}, {
				path: '/mine/order/evaluate/single',
				component: mineOrderEvaluateSingle
			}, {
				path: '/mine/order/evaluate/result',
				component: mineOrderEvaluateResult
			}, {
				path: '/mine/order/refund',
				component: mineOrderRefund
			}, {
				path: '/mine/order/refund/single',
				component: mineOrderRefundSingle
			}, {
				path: '/mine/order/refund/activity',
				component: mineOrderActivitySingle
			}, {
				path: '/mine/private',
				component: minePrivate
			}, {
				path: '/mine/focus',
				component: mineFocus
			}, {
				path: '/mine/coupon',
				component: mineCoupon
			}, {
				path: '/mine/children',
				component: mineChildren
			}, {
				path: '/mine/children/edit',
				component: mineChildrenEdit
			}, {
				path: '/mine/address',
				component: mineAddress
			}, {
				path: '/mine/address/edit',
				component: mineAddressEdit
			}, {
				path: '/mine/collect',
				component: mineCollect
			}, {
				path: '/mine/integral',
				component: mineIntegral
			}, {
				path: '/mine/activity',
				component: mineActivity
			}, {
				path: '/mine/activity/evaluate',
				component: mineActivityEvaluate
			}, {
				path: '/mine/train',
				component: mineTrain
			}, {
				path: '/mine/train/evaluate',
				component: mineTrainEvaluate
			}, {
				path: '/mine/group',
				component: mineGroup
			}, {
				path: '/mine/discount',
				component: mineDiscount
			}, {
				path: '/mine/circle',
				component: mineCircle
			}, {
				path: '/double-twelve',
				component: doubleTwelve
			}, {
				path: '/newyear',
				component: newYear
			}, {
				path: '/mine/setting',
				component: mineSetting
			}, {
				path: '/mine/setting/username',
				component: mineSettingUsername
			}, {
				path: '/mine/setting/feedback',
				component: mineSettingFeedback
			}, {
				path: '/mine/setting/about',
				component: mineSettingAbout
			}, {
				path: '/mine/setting/help/index',
				component: mineSettingHelp
			}, {
				path: '/mine/setting/help/detail',
				component: mineSettingHelpDetail
			}, {
				path: '/mine/message/index',
				component: mineMessage
			}, {
				path: '/mine/message/system',
				component: mineMessageSystem
			}, {
				path: '/mine/message/order',
				component: mineMessageOrder
			}, {
        path: '/mine/message/function',
        component: mineMessageFunction
      }, { // 物流详情
        path: '/logisticsList',
        component: logisticsList
      }, { // 贝乐活动页
				path: '/match',
				component: match
			}, { // 活动首页
        path: '/activityIndex',
        component: activityIndex
      }, { // 活动首页
        path: '/activityDetails',
        component: activityDetails
      }, { // 活动评论
        path: '/activityComment',
        component: activityComment
      }, { // 活动报名
        path: '/applyActivity',
        component: applyActivity
      }, { // 活动填写用户信息
        path: '/userinfo',
        component: userinfo
      }, { // 实名认证
        path: '/realName',
        component: realName
      }, { // 编辑活动票实名制信息
        path: '/edituserInfo',
        component: edituserInfo
      }, { // 活动订单结算
		    path: '/activityOrder',
        component: activityOrder
      }, { // 活动参加人
		    path: '/applyedQuantity',
        component: applyedQuantity
      }, { // 活动票列表
        path: '/ticketList',
        component: ticketList
      }, { // 活动详情页banner图片
		    path: '/bannerImages',
        component: bannerImages
      }, { // 活动评论列表页面
        path: '/commentList',
        component: commentList
      }, { // 活动评论详情页
		    path: '/commentDetail',
        component: commentDetail
      }, {
		    path: '/getPacket',
        component: getPacket
      }
		]
	}]
})
