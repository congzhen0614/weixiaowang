/*
	分享详情
*/
const activityDetail = resolve => require(['@/components/activity/detail/detail.vue'], resolve) // 活动详情(保留在用)
const trainDetail = resolve => require(['@/components/train/detail/detail.vue'], resolve) // 培训详情(保留在用)

export default {
	activity: { // 活动详情
		path: '/activity/detail',
		component: activityDetail
	},
	train: { // 培训详情
		path: '/train/detail',
		component: trainDetail
	}
}
