<template>
  <div class="mine-order-detail">
    <!-- 头部 -->
    <section class="mine-order-detail-top">
      <div class="back-icon" @click="goBack()">
        <img src="./back_icon.png">
      </div>
      <p class="title">订单详情</p>
    </section>
    <!-- 提醒 -->
    <div v-if="cls === '1'" class="remind-line">
      <img src="./remind_icon.png">
      <span class="text">此次杂志征订为7月~9月杂志（下学期发放）</span>
    </div>
    <div class="wrapper" ref="wrapper" :style="{ height: winHeight }">
      <div class="content" ref="content">
        <!-- 杂志 -->
        <section v-if="cls === '1'" class="main-info">
          <span v-if="info.trade_status === '1'" class="status">待付款</span>
          <span v-if="info.trade_status === '12'" class="status">订单失效</span>
          <p class="time">
            <span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
            <span class="time-text">{{ info.created_at }}</span>
            <!-- <span class="time-text">10:16:26</span> -->
          </p>
          <p class="order-id">
            <span class="label-name">订单号:</span>
            <span class="text">{{ info.no }}</span>
          </p>
          <p class="postage">
            <span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
            <span class="text">+¥{{ info.delivery_fee }}</span>
          </p>
          <p class="pay">
            <span class="label-name">实付款:</span>
            <span class="text">¥{{ info.total_fee | reserveDecimal }}</span>
          </p>
          <div class="bottom-btns">
            <span class="button cancel" @click="cancelOrder()">取消订单</span>
            <span class="button add-evaluate">追加评价</span>
            <span class="button pay" @click="goEvaluate()">去评价</span>
          </div>
        </section>
        <!-- 图书 -->
        <section v-if="cls === '2'" class="main-info" :class="{stamp: info.trade_status === '4', 'refund-icon': info.trade_status === '7'}">
          <span v-if="info.trade_status === '1'" class="status">待付款</span>
          <span v-if="info.trade_status === '2'" class="status">已付款</span>
          <span v-if="info.trade_status === '3'" class="status">发货中</span>
          <span v-if="info.trade_status === '4'" class="status">已收货</span>
          <span v-if="info.trade_status === '7'" class="status">已全部退款</span>
          <span v-if="info.trade_status === '12'" class="status">订单失效</span>
          <p class="time">
            <span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
            <span class="time-text">{{ info.created_at }}</span>
            <!-- <span class="time-text">10:16:26</span> -->
          </p>
          <p class="order-id">
            <span class="label-name">订单号:</span>
            <span class="text">{{ info.no }}</span>
          </p>
          <p class="price">
            <span class="label-name">总金额:</span>
            <span class="text">¥{{ totalFee }}</span>
          </p>
          <p class="postage">
            <span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
            <span class="text">+¥{{ info.delivery_fee }}</span>
          </p>
          <p class="price" v-if="info.couponType==='2'">
            <span class="label-name">满<span class="visi-hidden">隐</span>减:</span>
            <span class="text">-¥{{ info.discount_fee }}</span>
          </p>
          <p class="price" v-if="info.couponType==='1'">
            <span class="label-name">优惠券:</span>
            <span class="text">-¥{{ info.discount_fee }}</span>
          </p>
          <p class="price" v-if="info.couponType==='3'">
            <span class="label-name">全单折:</span>
            <span class="text">-¥{{ info.discount_fee }}</span>
          </p>
          <p class="price" v-if="info.couponType==='4'">
            <span class="label-name">积<span class="visi-hidden">隐</span>分:</span>
            <span class="text">-¥0.00</span>
          </p>
          <p class="pay">
            <span class="label-name">实付款:</span>
            <span class="text">¥{{ parseFloat(info.total_fee) + parseFloat(info.delivery_fee) | reserveDecimal }}</span>
          </p>
          <!-- 待付款 -->
          <div v-if="info.trade_status === '1'" class="bottom-btns">
            <span class="button cancel" @click="cancelOrder()">取消订单</span>
            <span class="button pay" @click="goPay()">去付款</span>
          </div>
          <!-- 失效订单 -->
          <div v-if="info.trade_status === '12'||info.trade_status === '7'" class="bottom-btns">
            <span class="button cancel" @click="cancelDel()">删除订单</span>
          </div>
          <!-- 已付款 -->
          <div v-if="info.trade_status === '2'" class="bottom-btns">
            <!-- 确认收货 -->
            <span class="button refund" @click.prevent.stop="goSingle()">申请退款</span>
          </div>
          <!-- 已发货 -->
          <div v-if="info.trade_status === '3'" class="bottom-btns">
            <!-- 确认收货 -->
            <span class="button refund" @click.prevent.stop="confirmReceipt()">确认收货</span>
          </div>
          <!-- 已收货 -->
          <div v-if="info.trade_status === '4'" class="bottom-btns">
            <!-- 删除订单 -->
            <span class="button cancel" @click="cancelDel()" style="margin-right: 0.2rem">删除订单</span>
            <!-- 追加评价 -->
            <span class="button add-evaluate" v-if="info.addComment==='0'" @click.prevent.stop="goEvaluate()">追加评价</span>
            <!-- 去评价 -->
            <span class="button refund" @click.prevent.stop="goEvaluate()">去评价</span>
          </div>
        </section>
        <!-- 活动 -->
        <section v-if="cls === '14,19'" class="main-info">
          <span class="status" v-if="info.trade.trade_status==='2'">已付款</span>
          <span class="status" v-if="info.trade.trade_status!=='2'&&info.trade.total_fee==0">免费体验票</span>
          <span class="status" v-if="info.trade.trade_status!=='2'&&info.trade.total_fee>0">现场缴费</span>
          <p class="time">
            <span class="label-name">订单日期:</span>
            <span class="time-text">{{ info.trade.updated_at }}</span>
          </p>
          <p class="order-id">
            <span class="label-name">订单号码:</span>
            <span class="text">{{ info.trade.no }}</span>
          </p>
          <p class="postage">
            <span class="label-name">活动名称:</span>
            <span class="text activity">{{ info.trade.title }}</span>
          </p>
          <p class="pay">
            <span class="label-name">活动时间:</span>
            <span class="text">{{ info.active.begin_time }}</span>
          </p>
          <p class="pay">
            <span class="label-name">全部金额:</span>
            <span class="text">¥{{ info.trade.total_fee }}</span>
          </p>
          <!--<p class="pay">-->
          <!--<span class="label-name">满减金额:</span>-->
          <!--<span class="text">¥300.00</span>-->
          <!--</p>-->
          <!--<p class="pay">-->
          <!--<span class="label-name">团购金额:</span>-->
          <!--<span class="text">¥300.00</span>-->
          <!--</p>-->
          <p class="pay">
            <span class="label-name">实付金额:</span>
            <span class="text">¥{{ info.trade.total_fee }}</span>
          </p>
          <div class="bottom-btns">
            <!--<span class="button pay">去评价</span>-->
            <!--<span class="button cancel">取消订单</span>-->
            <!--<span class="button add-evaluate">追加评价</span>-->
          </div>
        </section>
        <div class="margin-top-10"></div>
        <!-- 物流信息 -->
        <section class="logistics" v-if="acceptStation" @click="checkLogistics(info.express)">
          <div class="left-media">
            <img src="./logistics-icon.png" />
          </div>
          <div class="right-text">
            <p class="logistics-content">{{ acceptStation }}</p>
            <p class="logistics-time">{{ info.express.accept_time }}</p>
          </div>
        </section>
        <!-- 地址 -->
        <section class="address-part" v-if="cls !== '14,19'">
          <div class="left-media">
            <img src="./pos_icon.png">
          </div>
          <div class="right-text">
            <p v-if="cls === '1' || cls === '2'" class="name-mobile">
              <span class="name">{{ info.address_name }}</span>
              <span class="mobile">{{ info.address_mobile }}</span>
            </p>
            <p class="address">
              {{ info.address_province_name }}{{ info.address_city_name }}{{ info.address_region_name }}{{ info.address_address }}
            </p>
          </div>
        </section>
        <!-- 地址 -->
        <section class="address-part" v-if="cls === '14,19'">
          <div class="left-media">
            <img src="./pos_icon.png">
          </div>
          <div class="right-text">
            <p class="address">
              {{ info.active.province_id }}{{ info.active.city_id }}{{ info.active.region_id }}{{ info.active.address }}
            </p>
          </div>
        </section>
        <!-- 留言内容 -->
        <section v-if="info.user_remark" class="message-board">{{ info.user_remark }}</section>
        <!-- 列表 -->
        <v-list v-if="cls !== '14,19'" :listData="info.itemList" :cls="cls" @showActivityView="showActivityView"></v-list>
        <!-- 活动报名选票列表 -->
        <div class="activity-ticket">
          <ul>
            <li v-for="(item, index) in info.tradeDetails" :key="index">
              <p class="name"></p>
            </li>
          </ul>
        </div>
        <!-- 联系方式(活动) -->
        <section v-if="cls === '14,19'" class="activity-service">
          <p class="tel">
            <span class="label-name">活动举办方电话</span>
            <span class="text">{{ info.active.tel }}</span>
            <img src="./tel_icon.png">
          </p>
          <p class="time">
            <span class="label-name">工作时间</span>
            <span class="text">周一至周五 09:00~17:00</span>
          </p>
        </section>
        <!-- 猜您喜欢 -->
        <v-recommend :recommendList="recommendList"></v-recommend>
      </div>
    </div>
    <!-- 滑到顶部按钮 -->
    <section v-if="showFixedIcon" class="other-buttons">
      <img src="./to_top_icon.png" @click="scrollToTop()">
      <img src="./service_icon.png" @click="showService()">
    </section>
    <!-- 遮罩层 -->
    <section v-if="maskShow" class="mask" @click="cancelService()">
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-if="showServiceBox" class="bottom-box">
          <p>联系客服</p>
          <p>400-847-0068</p>
          <p>工作时间：周一至周五早10点至晚5点</p>
          <div class="call-bar bar" @click.stop="doCall()">拨打电话<a ref="tel" href="tel:4008470068"></a></div>
          <div class="cancel-bar bar" @click="cancelService()">取消</div>
        </div>
      </transition>
    </section>
    <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
      <v-view v-if="showView" :listData="info.itemList" :viewIndex="viewIndex" @hideView="hideView"></v-view>
    </transition>
  </div>
</template>

<script>
  import view from './view/view'
  import list from './list/list'
  import recommend from '@/pages/book/recommend/recommend'
  import BScroll from 'better-scroll'
  import QRCode from 'qrcodejs2'
  export default {
    data () {
      return {
        // 屏幕高度
        winHeight: window.innerHeight - 52 + 'px',
        // 猜您喜欢
        recommendList: [],
        // 类型
        cls: this.$route.query.cls || '1',
        // 遮罩
        maskShow: false,
        // 显示服务内容
        showServiceBox: false,
        // 显示视图
        showView: false,
        // 序号
        viewIndex: 0,
        // 信息
        info: {},
        reload: true,
        scrollHeight: '',
        acceptStation: '' // 物流信息
      }
    },
    computed: {
      // 请求参数
      params () {
        let params = {}
        params.cls = this.$route.query.cls === '14,19' ? '14' : this.$route.query.cls
        params.id = this.$route.query.id
        return params
      },
      paramsDel () {
        let params = {}
        params.cls = this.$route.query.cls === '14,19' ? '14' : this.$route.query.cls
        params.id = this.$route.query.id
        params.uid = localStorage.getItem('userId')
        return params
      },
      showFixedIcon () {
        return this.scrollHeight > window.innerHeight
      },
      totalFee () {
        let total = 0
        if (this.info.itemList) {
          this.info.itemList.forEach(item => {
            total += item.fee * item.quantity
          })
        }
        return total
      }
    },
    created () {
      // 加载数据
      this.$nextTick(() => {
        this.loadData()
      })
    },
    mounted () {
    },
    methods: {
      // 加载数据
      loadData () {
        this.$ajax.tradeDetail(this.params).then(res => {
          if (this.cls === '14,19') {
            this.info = res.data.activeTrainView
          } else {
            this.info = res.data.bookMagazineView
            this.acceptStation = this.info.express.accept_station
          }
          this.recommendList = res.data.recommendList
          this.reload = true
          this.$nextTick(() => {
            setTimeout(() => {
              this.initBetterScroll()
            }, 500)
          })
        }, err => {
          console.log(err)
        })
      },
      // 初始化 scroller
      initBetterScroll () {
        if (!this.scroller) {
          this.scroller = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true
          })
          // 监听滚动条
          this.listenScroll()
        } else {
          this.scroller.refresh()
        }
      },
      listenScroll () {
        this.scroller.on('scroll', pos => {
          if (pos.y >= 100 && this.reload) {
            this.loadData()
            this.reload = false
          }
          this.scrollHeight = -pos.y
        })
      },
      scrollToTop () {
        this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
      },
      // 返回上一页
      goBack () {
        this.$router.goBack()
      },
      // 申请退款
      goSingle () {
        this.$router.push({
          path: '/mine/order/refund',
          query: {cls: this.cls, id: this.$route.query.id, no: this.$route.query.id}
        })
      },
      // 联系客服
      showService () {
        this.maskShow = true
        setTimeout(() => {
          this.showServiceBox = true
        }, 10)
      },
      // 取消
      cancelService () {
        this.showServiceBox = false
        setTimeout(() => {
          this.maskShow = false
        }, 150)
      },
      // 拨打电话
      doCall () {
        this.$refs.tel.click()
      },
      // 显示活动二维码
      showActivityView (index) {
        this.viewIndex = index
        this.showView = true
      },
      // 隐藏活动二维码
      hideView () {
        this.showView = false
      },
      // 去付款
      goPay () {
        this.$router.push({
          path: '/pay',
          query: {
            outtradeno: this.info.no,
            fee: parseFloat(this.info.total_fee) + parseFloat(this.info.delivery_fee),
            cls: this.info.cls
          }
        })
      },
      // 取消订单
      cancelOrder () {
        this.$ajax.tradeCancel(this.paramsDel).then(res => {
          this.Toast.success({
            title: '取消成功'
          })
          this.$router.goBack()
        }, err => {
          console.log(err)
        })
      },
      // 删除订单
      cancelDel() {
        this.$ajax.tradeDel(this.paramsDel).then(res => {
          this.Toast.success({
            title: '删除成功'
          })
          this.$router.goBack()
        }, err => {
          console.log(err)
        })
      },
      // 确认收货
      confirmReceipt () {
        this.$ajax.confirmRec(this.info.id).then(res => {
          this.loadData()
        }, err => {
          console.log(err)
        })
      },
      // 去评价
      goEvaluate () {
        this.$router.push({
          path: 'evaluate',
          query: this.$route.query
        })
      },
      checkLogistics (item) {
        this.$router.push({
          path: '/logisticsList',
          query: {
            logistic_code: item.logistic_code,
            shipper_code: item.shipper_code
          }
        })
      }
    },
    components: {
      'v-list': list,
      'v-recommend': recommend,
      'v-view': view
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './detail.styl'
</style>
