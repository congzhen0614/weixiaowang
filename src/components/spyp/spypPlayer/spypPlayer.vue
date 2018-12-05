<template>
  <main class="player">
    <audio class="my-audio" ref="myAudio" preload="load">
      <source src="https://media.hhdd.com/storys2/share/25666/8587d07d0832b2233f5b4e60005cc649.mp3?auth_key=1543828538-0-0-0b84ef87d5bbfdb2c32e9fe9155d6f7d" type="audio/ogg" />
      <source src="https://media.hhdd.com/storys2/share/25666/8587d07d0832b2233f5b4e60005cc649.mp3?auth_key=1543828538-0-0-0b84ef87d5bbfdb2c32e9fe9155d6f7d" type="audio/mpeg" />
    </audio>
    <h2 class="player-title">音频集数名称音频集数名称音频集数名称音频集数名称音频集数名称音频集数名称</h2>
    <section class="player-details">
      <div class="player-details-sides">
        <img src="./spypIcon/prev-icon.png" />
      </div>
      <div class="player-details-center">
        <img class="disc-icon" src="./spypIcon/disc-icon.png" :class="{rotate: isPlay}" />
        <img class="face-icon" src="./spypIcon/ceshi.jpg"     :class="{rotate: isPlay}" />
        <img class="play-icon" src="./spypIcon/play-icon.png" v-if="!isPlay" @click="clickPlay" />
        <img class="play-icon" src="./spypIcon/paus-icon.png" v-if="isPlay"  @click="clickPaus" />
      </div>
      <div class="player-details-sides">
        <img src="./spypIcon/next-icon.png" />
      </div>
    </section>
    <section class="player-time-box">
      <time class="player-time player-start-time">{{ currentTimeStr }}</time>
      <div class="player-line" ref="playerLine" @touchstart="touchstart">
        <div class="player-back-line"></div>
        <div class="player-plan-line"       :style="{'width': progress}"></div>
        <div class="player-cach-line"       :style="{'width': cache}"></div>
        <img src="./spypIcon/play-pace.png" :style="{'left': progress}" @touchmove="touchmove" />
      </div>
      <time class="player-time player-ended-time">{{ durationStr }}</time>
    </section>
  </main>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      isPlay: false,
      player: '', // 播放器
      cache: '0%', // 缓存进度
      progress: '0%', // 播放进度
      duration: '00:00', // 音频长度
      timeRanges: '', // 缓存进度
      currentTime: '00:00' // 当前播放进度
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    durationStr: {
      get () {
        return this.duration
      },
      set (duration) {
        this.duration = this.keepTwo(parseInt(duration / 60)) + ':' + this.keepTwo(parseInt(duration % 60))
      }
    },
    currentTimeStr: {
      get () {
        return this.currentTime
      },
      set (currentTime) {
        this.currentTime = this.keepTwo(parseInt(currentTime / 60)) + ':' + this.keepTwo(parseInt(currentTime % 60))
      }
    }
  },
  methods: {
    keepTwo (val) {
      if (val.toString().length === 1) {
        return '0' + val
      } else {
        return val
      }
    },
    clickPlay () {
      this.isPlay = !this.isPlay
      const audio = this.$refs.myAudio
      audio.play()
      this.durationStr = audio.duration
      this.player = setInterval(() => {
        this.currentTimeStr = audio.currentTime
        this.progress = audio.currentTime / audio.duration * 100 + '%'
        this.cache = audio.buffered.end(audio.buffered.length - 1) / audio.duration * 100 + '%'
        if (audio.ended) {
          this.clickPaus()
        }
      }, 500)
    },
    clickPaus () {
      this.isPlay = !this.isPlay
      const audio = this.$refs.myAudio
      audio.pause()
      clearInterval(this.player)
    },
    touchstart (event) {
      let e = event || window.event
      const audioBox = this.$refs.playerLine
      const audio = this.$refs.myAudio
      let num = (e.touches[0].clientX - audioBox.offsetLeft) / audioBox.offsetWidth
      if (num > 1) { num = 1 } else if (num < 0) { num = 0 }
      this.cache = num * 100 + '%'
      this.progress = num * 100 + '%'
      audio.currentTime = audio.duration * num
    },
    touchmove (event) {
      let e = event || window.event
      const audioBox = this.$refs.playerLine
      const audio = this.$refs.myAudio
      let num = (e.touches[0].clientX - audioBox.offsetLeft) / audioBox.offsetWidth
      if (num > 1) { num = 1 } else if (num < 0) { num = 0 }
      this.cache = num * 100 + '%'
      this.progress = num * 100 + '%'
      audio.currentTime = audio.duration * num
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './spypPlayer.styl'
</style>
