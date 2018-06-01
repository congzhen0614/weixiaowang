/**
 * Created by abc on 2018/5/10.
 */
let latitude = '' // 纬度
let longitude = '' // 经度
let cityName = '' // 城市名称

function getLocation () {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

function showPosition () {
  latitude = position.coords.latitude
  longitude = position.coords.longitude
  let point = new BMap.Point(longitude, latitude); // 创建点坐标
  let gc = new BMap.Geocoder();
  gc.getLocation(point, function(rs) {
    var addComp = rs.addressComponents;
    cityName = addComp.city
    if (cityName) {
      alert(cityName)
    }
  });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      // console.log('用户不允许地理定位!')
      break;
    case error.POSITION_UNAVAILABLE:
      // console.log('无法获取当前位置!')
      break;
    case error.TIMEOUT:
      // console.log('获取地址请求超时!')
      break;
    case error.UNKNOWN_ERROR:
      // console.log('未知的错误!')
      break;
  }
}

export {getLocation, latitude, longitude, cityName}
