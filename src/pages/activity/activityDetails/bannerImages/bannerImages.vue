<template>
  <div class="aitivity-banner-images">
    <header>
      <img src="../../../../common/icons/back_icon.png" @click.stop="goBack()"/>
    </header>
    <section>
      <ul class="images-list list-left">
        <li v-for="(item, index) in leftImages" :key="index">
          <img :src="item.url"/>
        </li>
      </ul>
      <ul class="images-list list-right">
        <li v-for="(item, index) in rightImages" :key="index">
          <img :src="item.url"/>
        </li>
      </ul>
    </section>
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
        rightImages: []
      }
  },
  created () {
  },
  mounted () {
    this.loadDate()
  },
  computed: {},
  methods: {
    loadDate () {
      this.imagesList = JSON.parse(this.$route.query.listImg)
      this.imagesList.forEach((item, index) => {
        console.log(index % 2)
        if (index % 2===0) {
          this.leftImages.push(item)
        } else {
          this.rightImages.push(item)
        }
      })
    },
    goBack () {
      this.$router.goBack()
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bannerImages.styl'
</style>
