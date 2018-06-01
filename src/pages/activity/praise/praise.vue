<template>
  <div class="active-praise-page">
    <div class="interval"></div>
    <div class="title">
      <span>最佳口碑榜</span>
    </div>
    <div class="content">
      <ul class="media-list">
        <li v-for="(item, index) in starList" class="img-item" @click="clickLink(item.link)">
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
      clickLink (linkStr) {
        window.location.href = linkStr;
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './praise.styl'
</style>
