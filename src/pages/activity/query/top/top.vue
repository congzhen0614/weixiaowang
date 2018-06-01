<template>
  <header ref="top" class="book-header" :style="headerStyle">
    <div class="back-icon" @click="goBack()">
      <img ref="homeIcon" src="./home_icon.png">
    </div>
    <div ref="searchArea" class="search-area" :style="searchStyle" @click="openSearch()">
      <div class="left-part">
        在此输入搜索内容
      </div>
      <div class="right-part">
        <img ref="searchIcon" src="./search_icon_black.png">
      </div>
    </div>
    <div class="message" @click="openShopcat()">
      <img ref="messageIcon" src="./mes-logo.png">
      <span class="dot" v-if="shopNum>0">{{ shopNum }}</span>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'book-top',
    props: {
      scrollTop: {
        type: Number
      }
    },
    data () {
      return {
        shopcatList: [],
        shopNum: 0
      }
    },
    computed: {
      // 头部样式
      headerStyle () {
        if (this.scrollTop < 10) {
          return {
            paddingBottom: '0.35rem',
            background: '#fff'
          }
        } else {
          let opacity = (this.scrollTop - 10) / 100 + 0.5
          if (opacity < 0.75) {
            this.$refs.homeIcon.src = require('./home_icon.png')
          } else {
            this.$refs.homeIcon.src = require('./home_icon_black.png')
          }
          // 搜索框透明度
          if (opacity >= 1) {
            return {
              paddingBottom: '0.15rem',
              background: 'rgba(248, 189, 72, 1)'
            }
          } else {
            return {
              paddingBottom: '0.15rem',
              background: `rgba(248, 189, 72, ${opacity})`
            }
          }
        }
      },
      // 搜索框样式
      searchStyle () {
        if (this.scrollTop < 10) {
          return {
            background: `rgba(248, 247, 246, 1)`
          }
        } else {
          let opacity = (this.scrollTop - 10) / 300 + 0.5
          // 搜索框透明度
          if (opacity >= 1) {
            return {
              background: `rgba(255, 255, 255, 1)`
            }
          } else {
            let searchOpa = opacity
            return {
              background: `rgba(255, 255, 255, ${searchOpa})`
            }
          }
        }
      }
    },
    created () {
      this.getShopcat()
    },
    methods: {
      // 获取购物车
      getShopcat () {
        if (localStorage.getItem("userId") === null) {
          console.log('您还没有登录，无法获取购物车!')
          return false
        }
        this.$ajax.shopcatList(localStorage.getItem("userId")).then(res => {
          this.shopcatList = res.data.list
          // let shopNum = 0
          this.shopcatList.forEach(item => {
            this.shopNum += Number(item.quantity)
          })
        }, err => {
          console.log(err)
        })
      },
      // 打开搜索页
      openSearch () {
        this.$router.push({
          path: '/search'
        })
      },
      // 跳转购物车
      openShopcat () {
        this.$router.push({
          path: '/mine/message/index'
        })
      },
      // 返回
      goBack () {
        this.$router.goBack()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './top.styl'
</style>
