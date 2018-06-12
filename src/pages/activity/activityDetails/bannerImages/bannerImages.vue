<template>
  <div class="aitivity-banner-images">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
    </header>
    <section>
      <ul class="images-list list-left">
        <li v-for="(item, index) in leftImages" :key="index" @click="clickShowImages(item.url)">
          <img :src="item.url"/>
        </li>
      </ul>
      <ul class="images-list list-right">
        <li v-for="(item, index) in rightImages" :key="index" @click.stop="clickShowImages(item.url)">
          <img :src="item.url"/>
        </li>
      </ul>
    </section>
    <div class="show-images" v-if="showImages">
      <img class="images-close" src="./goBack-icon.png" @click.stop="close()"/>
      <img class="images-show" :src="imgUrl" ref="images" :style="{'margin-top': imagesHeight}" @load="imageLoaded"/>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
      return {
        imagesList: [],
        leftImages: [],
        rightImages: [],
        showImages: false,
        imgUrl: '',
        imagesHeight: ''
      }
  },
  created () {
  },
  mounted () {
    this.loadDate()
    this.imagesHeight
  },
  computed: {},
  methods: {
    loadDate () {
      this.imagesList = JSON.parse(this.$route.query.listImg)
      this.imagesList.forEach((item, index) => {
        if (index % 2===0) {
          this.leftImages.push(item)
        } else {
          this.rightImages.push(item)
        }
      })
    },
    clickShowImages (url) {
      this.imgUrl = url
      this.showImages = true
    },
    imageLoaded () {
      this.imagesHeight = '-' + (this.$refs.images.offsetHeight / 2 + 50) + 'px'
    },
    goBack () {
      this.$router.goBack()
    },
    close () {
      this.showImages = false
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bannerImages.styl'
</style>
