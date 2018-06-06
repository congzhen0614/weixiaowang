<template>
  <div class="activity-details">
    <v-head></v-head>
    <div class="wrapper" ref="wrapper">
      <section class="content" ref="content">
        <v-banner :style="{ height: bannerHeight }" :listImg="listImg" @chooseItem="chooseItem"></v-banner>
        <v-title></v-title>
        <div class="interval"></div>
        <v-message></v-message>
        <div class="interval"></div>
        <v-introduction></v-introduction>
        <div class="interval"></div>
        <v-comment></v-comment>
        <v-footer></v-footer>
      </section>
    </div>
  </div>
</template>

<script>
import head from './top/top.vue'
import banner from '@/components/common/banner/banner'
import title from './title/title.vue'
import message from './message/message.vue'
import introduction from './introduction/introduction.vue'
import comment from './comment/comment.vue'
import footer from './footer/footer.vue'
export default {
  name: '',
  components: {
    'v-head': head,
    'v-banner': banner,
    'v-title': title,
    'v-message': message,
    'v-introduction': introduction,
    'v-comment': comment,
    'v-footer': footer
  },
  data () {
    return {
      // banner高度
      bannerHeight: window.innerWidth * 0.6 + 'px',
      // banner图片数组
      bannerImages: []
    }
  },
  created () {},
  mounted () {},
  computed: {
    listImg () {
      let list = []
      if (this.bannerImages.length) {
        this.bannerImages.forEach(item => {
          list.push({
            url: item.logo,
            link: item.link_url
          })
        })
      } else {
        list.push({
          url: require('./banner.jpg'),
          link: ''
        })
      }
      return list
    }
  },
  methods: {
    chooseItem (param) {
      console.log(param)
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './index.styl'
</style>
