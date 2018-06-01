<template>
  <section class="index-menu">
    <ul class="menu-list">
      <li @click.prevent.stop="openUrl(item.path)" v-for="(item, index) in menuList" class="list-item">
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
          src: require('./qinzi.png'),
          title: '亲子活动'
        }, {
          path: '/actQuery',
          src: require('./xiaoyuan.png'),
          title: '校园活动'
        }, {
          path: '/actQuery',
          src: require('./jiemu.png'),
          title: '活动剧场'
        }, {
          path: '/actQuery',
          src: require('./youle.png'),
          title: '娱乐乐园'
        }, {
          path: '/actQuery',
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
      openUrl (path) {
        this.$router.push({
          path: path,
          query: {
            lat: this.params.lat,
            lng: this.params.lng,
            city_id: this.params.city_id,
            cls: 14
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
