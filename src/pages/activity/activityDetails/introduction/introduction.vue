<template>
  <div class="activity-details-introduction">
    <p class="title">活动介绍</p>
    <div class="content" v-html="listData.webhtml"></div>
    <div class="interval"></div>
    <p class="title">注意事项</p>
    <div class="content">
      {{ listData.attention }}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {}
  },
  props: {
    listData: {
      type: Object
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './introduction.styl'
</style>
