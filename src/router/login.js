/*
	登录模块
*/
const login = resolve => require(['@/pages/login/login.vue'], resolve) // 登录
const recovery = resolve => require(['@/pages/login/recovery.vue'], resolve) // 找回密码
const register = resolve => require(['@/pages/login/register.vue'], resolve) // 注册
const reset = resolve => require(['@/pages/login/reset.vue'], resolve) // 重新设置密码
const loginHome = resolve => require(['@/pages/login/home.vue'], resolve) // 登录路由调度页

export default { // 登陆
	path: '/login',
	component: loginHome,
	children: [{ // 登陆
		path: '/',
		name: 'login',
		component: login
	}, {
		path: 'recovery', // 重设密码
		name: 'recovery',
		component: recovery
	}, {
		path: 'register', // 注册
		name: 'register',
		component: register
	}, { // 新密码
		path: 'reset',
		name: 'reset',
		component: reset
	}]
}
