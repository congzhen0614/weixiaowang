import Vue from 'vue'
import md5 from 'crypto-js/md5'

let Obj = new Vue()

export function getMd5 (mobile) {
	let salt = `@te3,d587%fikl;;=23+go666`
	return md5(mobile + salt).toString()
}

export function checkInput () {
	let inputItems = document.querySelectorAll('input[required]')
	for (let i = 0; i < inputItems.length; i++) {
		if (!inputItems[i].value) {
			Obj.Toast.warning({
				title: inputItems[i].placeholder
			})
			inputItems[i].focus()
			return false
		}
		if (isEmojiCharacter(inputItems[i].value)) {
			Obj.Toast.warning({
				title: '请勿输入空格、表情或者特殊字符'
			})
			return false
		}
	}
	return true
}

export function checkMobile (item) {
	if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(item.value)) {
		Obj.Toast.warning({
			title: '请输入正确的手机号'
		})
		item.focus()
		return false
	}
	return true
}

export function addScript (url) {
	let script = document.createElement('script')
	let head = document.getElementsByTagName('head')[0]
	script.src = url
	head.appendChild(script)
}

export function isWeixin () {
	let u = navigator.userAgent.toLowerCase()
	if (u.match(/MicroMessenger/i)) {
		return true
	}
	return false
}

export function getStrLength (str) {
	let len = 0
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
			len += 2
		} else {
			len += 1
		}
	}
	return len
}

export function getPrice (str) {
	return parseFloat(str).toFixed(2)
}

export function extendObj (target, source) {
	for (var obj in source) {
		target[obj] = source[obj]
	}
	return target
}

// 获取需要的字段
export function getNeedData (obj, arr) {
	let returnObj = {}
	arr.forEach(item => {
		returnObj[item] = obj[item]
	})
	return returnObj
}

// 获取整个数组需要的字段
export function getNeedDataList (arr, args) {
	let needArr = []
	arr.forEach(item => {
		let needObj = getNeedData(item, args)
		needArr.push(needObj)
	})
	return needArr
}

// 获取所有不重复的 Set
export function getArraySet (arr, type) {
	let s = new Set()
	let backArr = []
	arr.forEach(item => {
		s.add(item[type])
	})
	for (var i of s) {
		backArr.push(i)
	}
	return backArr
}

// 获取带逗号的 string
export function getWithCommaString (arr, type) {
	let str = ''
	arr.forEach(item => {
		if (type) {
			str += item[type] + ','
		} else {
			str += item + ','
		}
	})
	return str.substr(0, str.length - 1)
}

// 获取去重过的数组
export function getDistinctArray (arr1, arr2, type) {
	if (!arr1.length) {
		return arr2
	}
	if (!arr2.length) {
		return arr1
	}
	arr1.forEach(item1 => {
		if (configObjInArr(arr2, item1, type)) {
			arr2.push(item1)
		}
	})
	return arr2
}

function configObjInArr (arr, obj, type) {
	for (let i = 0; i < arr.length; i++) {
		if (obj[type] === arr[i][type]) {
			return false
		}
	}
	return true
}

// 数组去重
export function uniqueArr (arr) {
	let res = []
	let json = {}
	arr.forEach(item => {
		if (!json[item.name]) {
			res.push(item)
			json[item.name] = 1
		}
	})
	return res
}

// 判断是否有 class
export function hasClass (element, name) {
	return element.className.match(RegExp('(\\s|^)' + name + '(\\s|$)'))
}

// 添加 class
export function addClass (element, name) {
	element.className += ' ' + name
}

// 删除 class
export function deleteClass (element, name) {
	if (hasClass(element, name)) {
		element.className.replace(RegExp('(\\s|^)' + name + '(\\s|$)'), ' ')
	}
}

// 是否输入为 emoji 表情
export function isEmojiCharacter (substring) {
	let reg = /[~#^$@%&!?%*\s+]/gi
	if (reg.test(substring)) {
		return true
	}
	for (let i = 0; i < substring.length; i++) {
		let hs = substring.charCodeAt(i)
		if (hs >= 0xd800 && hs <= 0xdbff) {
			if (substring.length > 1) {
				let ls = substring.charCodeAt(i + 1)
				let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
				if (uc >= 0x1d000 && uc <= 0x1f77f) {
					return true
				}
			}
		} else if (substring.length > 1) {
			let ls = substring.charCodeAt(i + 1)
			if (ls === 0x20e3) {
				return true
			}
		} else {
			if (hs >= 0x2100 && hs <= 0x27ff) {
				return true
			} else if (hs >= 0x2b05 && hs <= 0x2b07) {
				return true
			} else if (hs >= 0x2934 && hs <= 0x2935) {
				return true
			} else if (hs >= 0x3297 && hs <= 0x3299) {
				return true
			} else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 || hs === 0x2b50 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
				return true
			}
		}
	}
}

// 微信配置
export function weiXinConfig (share) {
  Obj.$ajax.weixinConfig({
    url: window.location.href
  }).then(res => {
    let data = res.data
    let urlStr = location.href.split('#')[0]
    wx.config({
      debug: false, // 调试模式
      appId: data.appId, // 公众号标识
      timestamp: data.timestamp, // 签名的时间戳
      nonceStr: data.nonceStr, // 生成签名的随机串
      signature: data.signature, // 签名
      url: urlStr, // 安全域名url
      // 使用的接口列表: 微信支付，分享到朋友圈，分享给微信好友，分享给QQ好友，分享到QQ空间
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
    })
    wx.ready(() => { // config成功后调用
      wx.onMenuShareTimeline({
        title: share.name, // 分享标题
        link: urlStr, // 分享链接
        imgUrl: share.logo, // 分享图标
        success: success => { // 用户确认分享后执行的回调函数
          console.log('您已分享成功!' + success)
        },
        cancel: cancel => { // 用户取消分享后执行的回调函数
          console.log('您已取消分享!' + cancel)
        },
        fail: err => { // 调用接口失败后返回数据
          console.log('返回错误：' + err)
        }
      })
      // 分享给微信好友
      wx.onMenuShareAppMessage({
        title: share.name, // 分享标题
        link: urlStr, // 分享链接
        imgUrl: share.logo, // 分享图标
        success: success => { // 用户确认分享后执行的回调函数
          console.log('您已分享成功!' + success)
        },
        cancel: cancel => { // 用户取消分享后执行的回调函数
          console.log('您已取消分享!' + cancel)
        }
      })
      // 分享到QQ
      wx.onMenuShareQQ({
        title: share.name, // 分享标题
        link: urlStr, // 分享链接
        imgUrl: share.logo, // 分享图标
        success: success => { // 用户确认分享后执行的回调函数
          console.log('您已分享成功!' + success)
        },
        cancel: cancel => { // 用户取消分享后执行的回调函数
          console.log('您已取消分享!' + cancel)
        }
      })
      // 分享到空间
      wx.onMenuShareQZone({
        title: share.name, // 分享标题
        link: urlStr, // 分享链接
        imgUrl: share.logo, // 分享图标
        success: success => { // 用户确认分享后执行的回调函数
          console.log('您已分享成功!' + success)
        },
        cancel: cancel => { // 用户取消分享后执行的回调函数
          console.log('您已取消分享!' + cancel)
        }
      })
    })
    wx.error(err => { // config失败后调用
      console.log(err)
    })
  })
}
