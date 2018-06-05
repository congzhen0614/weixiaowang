<template>
  <section class="index-menu">
    <ul class="menu-list">
      <li @click.prevent.stop="openUrl(item)" v-for="(item, index) in menuList" class="list-item">
        <img v-lazy="item.src">
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'active-menu-page',
    data () {
      return {
        menuList: [{
          path: '/actQuery',
          code: 1,
          src: require('./qinzi.png'),
          title: '亲子活动'
        }, {
          path: '/actQuery',
          code: 2,
          src: require('./xiaoyuan.png'),
          title: '校园活动'
        }, {
          path: '/actQuery',
          code: 3,
          src: require('./jiemu.png'),
          title: '节目剧场'
        }, {
          path: '/actQuery',
          code: 4,
          src: require('./youle.png'),
          title: '游玩乐园'
        }, {
          path: '/actQuery',
          code: 5,
          src: require('./qita.png'),
          title: '其他'
        }]
      }
    },
    props: {
      params: {
        type: Object
      }
    },
    mounted () {},
    methods: {
      openUrl (item) {
        this.$router.push({
          path: item.path,
          query: {
            cls: 14,
            code: item.code,
            lat: this.params.lat,
            lng: this.params.lng,
            city_id: this.params.city_id
          }
        })
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './menu.styl'
</style>
