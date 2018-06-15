<template>
  <div class="active-praise-page">
    <div class="interval"></div>
    <div class="title">
      <span>最佳口碑榜</span>
    </div>
    <div class="content">
      <ul class="media-list">
        <li v-for="(item, index) in starList" class="img-item" @click="clickLink(item)">
          <img :src="item.logo">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'active-praise-page',
    data () {
      return {}
    },
    props: {
      starList: {
        type: Array
      }
    },
    mounted () {
    },
    methods: {
      clickLink (item) {
        if (item.link) {
          window.location.href = item.link
        } else {
          this.$router.push({
            path: '/activityDetails',
            query: {
              id: item.id,
              cls: item.cls,
              lat: item.lat,
              lng: item.lng,
              _uid: localStorage.getItem('userId')
            }
          })
        }
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './praise.styl'
</style>
