/**
 * Created by yi on 2016-12-27.
 */

export function formatDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	return fmt
}

export function getUpdateDay (time) {
	if (!time) {
		return ''
	}
	time = time.replace(/-/g, '/')
	let _year, _month, _date
	if (time instanceof Date) {
		let newDate = new Date(time)
		_year = newDate.getFullYear()
		_month = newDate.getMonth() + 1
		_date = newDate.getDate()
	} else {
		_year = time.substr(0, 4)
		_month = time.substr(5, 2)
		_date = time.substr(8, 2)
	}
	return _year + '年' + _month + '月' + _date + '日'
}

export function getPastTimeText (time) {
	if (!time) {
		return ''
	}
	time = time.replace(/-/g, '/')
	// 如果有小数点，则去掉
	if (time.indexOf('.') > -1) {
		time = time.split('.')[0]
	}
	let nowTime = new Date().getTime()
	let createTime = new Date(time).getTime()
	let pastTime = nowTime - createTime
	let baseSecond = 1000
	let baseMin = 1000 * 60
	let baseHour = 1000 * 60 * 60
	let baseDay = 1000 * 60 * 60 * 24
	let baseMon = 1000 * 60 * 60 * 24 * 30
	let baseYear = 1000 * 60 * 60 * 24 * 365
	if (pastTime < baseMin) {
		return Math.floor(pastTime / baseSecond) + '秒'
	} else if (pastTime < baseHour) {
		return Math.floor(pastTime / baseMin) + '分'
	} else if (pastTime < baseDay) {
		return Math.floor(pastTime / baseHour) + '小时'
	} else if (pastTime < baseMon) {
		return Math.floor(pastTime / baseDay) + '天'
	} else if (pastTime < baseYear) {
		return Math.floor(pastTime / baseMon) + '月'
	} else {
		return Math.floor(pastTime / baseYear) + '年'
	}
}

function padLeftZero (str) {
	return ('00' + str).substr(str.length)
}

export function getQueryString (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var queryIndex = window.location.href.indexOf('?')
	var queryStr = window.location.href.substr(queryIndex).substr(1)
	var r = queryStr.match(reg)
	if (r != null) {
		return unescape(r[2])
	}
	return null
}

// JS操作cookies方法!
export function setCookie (name, value) {
	var Days = 30
	var exp = new Date()
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
	document.cookie = name + '=' + escape(value) + 'expires=' + exp.toGMTString()
}

export function getCookie (name) {
	let reg = new RegExp('(^| )' + name + '=([^]*)(|$)')
	if (document.cookie.match(reg)) {
		let arr = document.cookie.match(reg)
		return unescape(arr[2])
	}
	return null
}

export function delCookie (name) {
	var exp = new Date()
	exp.setTime(exp.getTime() - 1)
	var cval = getCookie(name)
	if (cval !== null) {
		document.cookie = name + '=' + cval + 'expires=' + exp.toGMTString()
	}
}

export function callbackFun (res) {
}
