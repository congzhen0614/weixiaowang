<template>
  <div class="get-packet">
    <img class="packet-top" src="../../../../static/imgs/activity/activity-packet-top-icon.png">
    <div class="packet-content">
      <input v-if="!isWeixin" class="packet-mobile" type="number" placeholder="请在此输入您的手机" v-model="mobile">
      <span v-if="!isWeixin" class="click-get" :class="{'no-phone': !hasPhoneNumber}" @click="clickGet">点击领取</span>
      <span v-if="isWeixin" class="click-get" @click="wxLogin">点击微信登录并领取</span>
      <span class="packet-rule">优惠券规则</span>
      <p class="rule-content">
        1、每个红包内包含30元图书优惠券</br>
        2、新老用户均可领取</br>
        3、领取成功后，使用领取手机号或微信登录微校网APP，即可使用优惠券</br>
        4、红包查看：领券成功后，可在微校网APP“我的-我的优惠券”中查看</br>
        5、其他未尽事宜，请咨询小微4008470068</br>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'get-packet',
  data () {
    return {
      iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
      androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr',
      mobile: '',
      openid: '',
      nickname: ''
    }
  },
  computed: {
    params () {
      let param = {
        logintype: this.isWeixin ? 1 : 0, // 登录类型
        mobile: this.mobile, // 手机号码
        nickname: this.nickname, // 昵称
        otheraccount: this.openid // openId
      }
      return param
    },
    hasPhoneNumber () {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (reg.test(this.mobile)) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (this.isWeixin) {
      if (this.$route.query.hasOwnProperty('status')) {
        if (parseInt(this.$route.query.status) === 0) {
          this.openid = this.$route.query.openid
          this.nickname = this.$route.query.nickname
          this.clickLoginAndGet()
        }
      }
    }
  },
  methods: {
    clickGet () {
      if (!this.hasPhoneNumber) return
      this.$ajax.getPacket(this.params).then(res => {
        if (res.data.result.status === '0') {
          this.Dialog.alert({
            title: '领取成功!',
            msg: '去登录微校网“我的-我的优惠券”查看(若暂未安装微校网APP请先下载安装)',
            buttons: ['暂不', '去看看']
          }, btn => {
            if (btn.buttonIndex === 2) {
              if (this.isIos) {
                window.location.href = this.iosDownload
              } else {
                window.location.href = this.androidDownload
              }
            }
          })
        } else {
          this.Toast.fail({title: res.data.result.msg})
        }
      }, err => {
        this.Toast.fail({title: err.data.data.tip})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    clickLoginAndGet () {
      this.$ajax.getPacket(this.params).then(res => {
        if (res.data.result.status === '0') {
          this.Dialog.alert({
            title: '领取成功!',
            msg: '去登录微校网“我的-我的优惠券”查看(若暂未安装微校网APP请先下载安装)',
            buttons: ['暂不', '去看看']
          }, btn => {
            if (btn.buttonIndex === 2) {
              if (this.isIos) {
                window.location.href = this.iosDownload
              } else {
                window.location.href = this.androidDownload
              }
            }
          })
        } else {
          this.Toast.fail({title: res.data.result.msg})
        }
      }, err => {
        this.Toast.fail({title: err.data.data.tip})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    wxLogin () {
      // 微信登陆返回到当前页面
      let href = window.location.href + '?success=true'
      let _href = encodeURIComponent(`${href}`)
      let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
      let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
      let appId = 'wx701b0e6e6faac47c'
      let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
      window.location.href = _url
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './getPacket.styl'
</style>
