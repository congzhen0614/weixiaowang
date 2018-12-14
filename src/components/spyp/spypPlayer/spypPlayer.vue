<template>
  <main class="player">
    <audio class="my-audio" ref="myAudio" preload="load"></audio>
    <h2 class="player-title">{{ title }}</h2>
    <section class="player-details">
      <div class="player-details-sides" @click="onPrev">
        <img src="./spypIcon/prev-icon.png" />
      </div>
      <div class="player-details-center">
        <img class="disc-icon" src="./spypIcon/disc-icon.png" :class="{rotate: isPlay}" />
        <img class="face-icon" :src="logo"     :class="{rotate: isPlay}" />
        <img class="play-icon" src="./spypIcon/play-icon.png" v-if="!isPlay" @click="clickPlay" />
        <img class="play-icon" src="./spypIcon/paus-icon.png" v-if="isPlay"  @click="clickPaus" />
      </div>
      <div class="player-details-sides" @click="onNext">
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
      currentTime: '00:00', // 当前播放进度
      playerList: [],
      index: 0,
      title: '',
      logo: ''
    }
  },
  created () {
  },
  mounted () {
  },
  props: ['spypEpisodesList'],
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
      this.isPlay = true
      const audio = this.$refs.myAudio
      audio.src = this.playerList[this.index].url
      audio.play()
      this.player = setInterval(() => {
        this.durationStr = audio.duration
        this.currentTimeStr = audio.currentTime
        this.progress = audio.currentTime / audio.duration * 100 + '%'
        this.cache = audio.buffered.end(audio.buffered.length - 1) / audio.duration * 100 + '%'
        if (audio.ended) {
          this.clickPaus()
        }
      }, 500)
    },
    clickPaus () {
      this.isPlay = false
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
    },
    onPrev () {
      if (this.index > 0) {
        this.index -= 1
        this.title = this.playerList[this.index].name
        if (this.isPlay) {
          this.clickPlay()
        } else {
          this.clickPaus()
        }
      }
    },
    onNext () {
      if (this.index < this.playerList.length) {
        this.index += 1
        this.title = this.playerList[this.index].name
        if (this.isPlay) {
          this.clickPlay()
        } else {
          this.clickPaus()
        }
      }
    }
  },
  watch: {
    spypEpisodesList (val) {
      this.playerList = val.pageInfo.list
      this.title = this.playerList[this.index].name
      this.logo = val.logo
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './spypPlayer.styl'
</style>
