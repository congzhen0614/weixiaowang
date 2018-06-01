<template>
  <div class="pay">
    <v-header v-if="showHeader" :entrance="'apply'" :title="title"></v-header>
    <div class="amount">
      <div class="desc">付款金额</div>
      <div class="num">￥<span class="big">{{ fee | getInteger }}</span>{{ fee | getDecimal }}</div>
    </div>
    <ul class="type-list">
      <li v-for="(item, index) in payList" class="item alipay" :class="{ underline: (index < payList.length - 1) }">
        <div class="img" :class="item.cls"></div>
        <span class="text">{{ item.text }}</span>
        <div class="checkbox" :class="{ active: index === checkIndex }" @click="changeCheckIndex(index)"></div>
      </li>
      <p v-if="isWeixin" class="desc-text">欲使用支付宝支付请在手机浏览器打开</p>
    </ul>
    <div ref="form" v-html="formHtml"></div>
    <!-- 底部提交按钮 -->
    <footer class="footer" @click="doPay()">
      {{ buttonText }}{{ fee | getInteger }}{{ fee | getFixed1 }}元
    </footer>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import {addScript} from '@/common/js/common.js'
  // const payList = [{
  // 	cls: 'alipay',
  // 	text: '支付宝支付'
  // }, {
  // 	cls: 'scene',
  // 	text: '现场支付'
  // }]
  const weixin = {
    cls: 'weixin',
    text: '微信支付'
  }
  export default {
    name: 'pay',
    data () {
      return {
        noCheckSrc: 'check.png',
        hasCheckSrc: 'check_active.png',
        checkIndex: 0,
        title: '请选择支付方式',
        fee: 0,
        formHtml: '',
        // 是否显示header
        showHeader: true,
        // 订单类型
        cls: this.$route.query.cls,
        payInit: [{
          cls: 'alipay',
          text: '支付宝支付'
        }]
        // }], {
        // 	cls: 'scene',
        // 	text: '现场支付'
        // }]
      }
    },
    computed: {
      // 支付方式列表
      payList () {
        if (this.isWeixin) {
          this.payInit.splice(0, 1, weixin)
        }
        if (this.cls === '2') {
          return this.payInit.splice(0, 1)
        }
        return this.payInit
      },
      // 底部按钮文字
      buttonText () {
        return this.payList[this.checkIndex].text
      }
    },
    created () {
      // 动态引入需要的 script 标签
      addScript(location.protocol + '//pv.sohu.com/cityjson?ie=utf-8')
      addScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js')
    },
    mounted () {
      document.title = this.title
      // 设置 history
      localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
      this.fee = this.$route.query.fee
    },
    methods: {
      changeCheckIndex (index) {
        this.checkIndex = index
      },
      // 支付
      doPay () {
        if (this.checkIndex === 0) {
          if (!this.isWeixin) {
            this.aliPay()
          } else {
            this.weixinPay()
          }
        } else {
          let id = this.$route.query.id
          let _uid = localStorage.getItem('userId')
          let cls = this.$route.query.cls
          let _url = `/activetrade/enter?id=${id}&_uid=${_uid}&cls=${cls}`
          this.Toast.loading({
            title: '提交中...'
          })
          this.$ajax.getAjax(_url)
            .then((res) => {
              this.Dialog.alert({
                title: '报名成功！',
                msg: `费用现场支付`
              }, (ret) => {
                setTimeout(() => {
                  // 回到首页
                  // this.$root.Bus.$emit('backToRoot', '')
                  let historyBack = -parseInt(localStorage.getItem('historyLength'))
                  localStorage.setItem('historyLength', 0)
                  this.$router.go(historyBack)
                }, 300)
              })
            }, err => {
              console.log(err)
            })
        }
      },
      // 支付宝支付
      aliPay () {
        let href = this.$route.query.href
        let protocol = window.location.protocol // 协议
        let host = window.location.host
        let returnUrl = `${protocol}//${host}/result?href=${href}&success=true`
        this.Toast.loading({
          title: '提交中...'
        })
        let _data = {
          cls: this.$route.query.cls,
          return_url: returnUrl,
          outtradeno: this.$route.query.outtradeno
        }
        console.log(_data)
        this.$ajax.getWapOrderInfoByAliPay(_data).then((res) => {
          this.$refs.form.innerHTML = res.data
          if (document.forms && document.forms.length) {
            document.forms[0].submit()
          }
        }, err => {
          console.log(err)
        })
      },
      // 微信支付
      weixinPay () {
        let _data = {
          cls: this.$route.query.cls,
          outtradeno: this.$route.query.outtradeno,
          ip: window.returnCitySN.cip,
          openid: localStorage.getItem('wxOpenId')
        }
        console.log(localStorage.getItem('wxOpenId'))
        this.$ajax.getOfficialAccountPrepayInfo(_data).then(res => {
          console.log(res)
          if (this.isIos) {
            this.weixinConfig(res.data.data)
            return
          }
          // 调起微信支付
          this.upWeixinPay(res.data.data)
        }, err => {
          console.log(err)
        })
      },
      // 微信 config 接口
      weixinConfig (data) {
        window.wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timeStamp,
          nonceStr: data.nonceStr,
          signature: data.sign,
          jsApiList: [
            'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage'
          ]
        })
        window.wx.ready(() => {
          window.wx.onMenuShareTimeline({
            title: '这是title',
            desc: '这是desc',
            link: window.location.href,
            imgUrl: ''
          })
          let success = false
          let vm = this
          window.wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.sign,
            success: function (res) {
              // alert('返回: ' + JSON.stringify(res))
              success = true
              // 设置 history
              vm.$router.push({
                path: '/result',
                query: {
                  total_amount: vm.fee,
                  success: success,
                  href: vm.$route.query.href
                }
              })
            }
          })
        })
      },
      // 调起微信支付
      upWeixinPay (data) {
        // alert('href: ' + window.location.href)
        if (typeof window.WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data))
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data))
          }
        } else {
          this.onBridgeReady(data)
        }
        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
      },
      // 调起微信 bridge
      onBridgeReady (data) {
        // alert('ready: ' + JSON.stringify(data))
        var _sendObj = {
          // 公众号名称
          'appId': data.appId,
          'timeStamp': data.timeStamp,
          // 随机串
          'nonceStr': data.nonceStr,
          'package': data.package,
          // 微信签名方式
          'signType': data.signType,
          // 微信签名
          'paySign': data.sign
        }
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest', _sendObj,
          (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              // 设置 history
              // this.$store.commit('setHistory', this.$store.state.history + 1)
              this.$router.push({
                path: '/result',
                query: {
                  total_amount: this.fee,
                  success: true,
                  href: this.$route.query.href
                }
              })
            } else {
              // 设置 history
              this.$router.push({
                path: '/result',
                query: {
                  total_amount: this.fee,
                  success: false,
                  href: this.$route.query.href
                }
              })
            }
          }
        )
      }
    },
    // beforeRouteLeave (to, from, next) {
    // 	let path = to.path
    // 	if (path === '/pay' || path === '/shopcat/detail') {
    // 		next(true)
    // 		return
    // 	}
    // 	// 弹窗提示
    // 	this.Dialog.alert({
    // 		title: '温馨提示',
    // 		msg: '您确定退出支付页面？',
    // 		buttons: ['确定', '再想想']
    // 	}, (res) => {
    // 		if (res.buttonIndex === 2) {
    // 			next(false)
    // 			return
    // 		}
    // 		// next(true)
    // 		this.$router.goBack()
    // 	})
    // },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './pay.styl'
</style>
