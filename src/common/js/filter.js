let getInteger = value => {
	return Math.floor(parseFloat(value))
}

let getFixed1 = value => {
  let float = parseFloat(parseFloat(value) - Math.floor(parseFloat(value))).toFixed(2).substr(1)
  if (float.length === 2) {
    float += '0'
  }
	return float
}

let getDecimal = value => {
	return parseFloat(parseFloat(value) - Math.floor(parseFloat(value))).toFixed(2).substr(1)
}
// 保留两位小数
let reserveDecimal = value => {
  return value.toFixed(2)
}

// 老，杂志单独用
let getFullAddress = obj => {
	if (!obj.hasOwnProperty('cityArea')) {
		return '未设置地址'
	}
	return obj.cityArea.split(',').join('') + obj.address
}

// 新
let getFullAddressName = obj => {
	if (!obj.hasOwnProperty('provinceName')) {
		return '未设置地址'
	}
	return obj.provinceName + obj.cityName + obj.regionName + obj.address
}

let getUpdateDay = (time) => {
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

let getEndData = (time) => {
  if (!time) {
    return ''
  }
  time = time.replace(/-/g, '/')
  let _year, _month, _date
  _year = time.substr(20, 4)
  _month = time.substr(25, 2)
  _date = time.substr(28, 2)
  return _year + '年' + _month + '月' + _date + '日'
}

let getPastTimeText = (time) => {
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

let getDate = (val) => {
  let date = new Date(val)
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

// 隐藏部分手机号
let hideMobile = (mobile) => {
	if (mobile.length < 7) {
		return mobile
	}
	return mobile.substr(0, 3) + '****' + mobile.substr(7)
}

// 是否输入为 emoji 表情
let isEmojiCharacter = (substring) => {
	let reg = /[~#^$@%&!?%*]/gi
	if (reg.test(substring)) {
		alert(2)
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
// 除以1000
let conversion = value => parseInt(value/1000)

export {
	getInteger,
	getFixed1,
  reserveDecimal,
	getDecimal,
	getFullAddress,
	getFullAddressName,
	getUpdateDay,
  getEndData,
	getPastTimeText,
	hideMobile,
	isEmojiCharacter,
  conversion,
  getDate
}
