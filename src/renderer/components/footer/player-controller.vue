<template>
  <div class="vv-nm-player" :class="`pos-${pos}`">
    <!-- <el-row type="flex" justify="space-between">
      <el-col class="left" span="6">

      </el-col>
      <el-col class="left" span="6">

      </el-col>
      <el-col class="left" span="6">

      </el-col>
    </el-row> -->
    <div class="nm-cover"
      :style="`background-image: url(${currentAudio.cover || defaultCover})`"
      @click="goToPlayer"
    >
      <!--<div class="icon-wrap">
        <nmp-icon icon="fangda" size="36"></nmp-icon>
      </div>-->
    </div>
    <div class="nm-act">
      <div class="a-prev" @click="prev">
        <nmp-icon icon="play-next" size="16"></nmp-icon>
      </div>
      <div class="a-play p-play" v-if="paused" @click="play">
        <nmp-icon icon="play" size="16"></nmp-icon>
      </div>
      <div class="a-play" v-else @click="pause">
        <nmp-icon icon="pause" size="16"></nmp-icon>
      </div>
      <div class="a-next" @click="next">
        <nmp-icon icon="play-next" size="16"></nmp-icon>
      </div>
    </div>
    <div class="nm-content">
      <div class="nm-info">
        <div class="i-l">
          <template v-if="currentAudio.name">
            <span class="i-name">{{currentAudio.name}}</span> -
            <span class="i-author">{{currentAudio.author}}</span>
          </template>
        </div>
        <div class="i-r">
          <span class="i-played">{{playedTime}}</span> /
          <span class="i-length">{{duration}}</span>
        </div>
      </div>
      <div class="nm-audio">
        <audio :src="currentAudio.url" :preload="preload"></audio>
        <nmp-progress
          :played="playedRatio"
          :loaded="loadedRatio"
          decimal
          transition
          @click-bar="clickAudioBar"
        ></nmp-progress>
      </div>
    </div>
    <div class="nm-tools">
      <div class="t-play-mode">
        <nmp-icon :icon="playModeIcon" size="16" @click="changePlayMode"></nmp-icon>
      </div>
      <div class="t-volume">
        <nmp-icon icon="speaker" size="16" @click.native.stop="toggleShowVolume"></nmp-icon>
        <div class="volume-wrap" @click.stop v-show="isShowVolumeSlider">
          <nmp-icon :icon="speakerIcon" size="16" @click="toggleMute"></nmp-icon>
          <nmp-progress
            :played="volume"
            :loaded="0"
            :width="200"
            decimal
            draggable
            @click-bar="clickVolumeBar"
            @drag-bar="clickVolumeBar"
          ></nmp-progress>
        </div>
      </div>
      <div class="t-sheet" @click.stop="toggleShowSheet" v-if="audios.length > 1">
        <nmp-icon icon="menu-fold" size="16"></nmp-icon>
        <span class="t-count">{{audios.length}}</span>
      </div>
    </div>
    <div class="nm-sheet" @click.stop v-show="isShowSheet">
      <div class="s-head">
        <span>播放列表</span>
        <div class="h-act">
          <nmp-icon icon="delete" size="14" @click="clearSheet"></nmp-icon>
          <nmp-icon icon="close" size="14" @click="isShowSheet = false"></nmp-icon>
        </div>
      </div>
      <div class="s-body" :style="`max-height: ${sheetHeight}px`">
        <div
          class="s-row"
          :class="{focus: currentIndex === i}"
          @dblclick="currentIndex = i"
          v-for="(audio, i) of audios"
          :key="i"
        >
          <div class="s-cell">
            <nmp-icon icon="play" size="14" v-if="currentIndex === i"></nmp-icon>
          </div>
          <div class="s-cell cell-name">
            <span>{{audio.name}}</span>
          </div>
          <div class="s-cell cell-author">{{audio.author}}</div>
          <div class="s-cell cell-delete">
            <nmp-icon icon="delete" size="14" @click="remove(i)"></nmp-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../js/iconfont'
import Icon from './Icon.vue'
import Progress from './Progress.vue'
import { secondsToReadable } from '../../js/utils'

export default {
  name: 'vv-nm-player',
  data () {
    return {
      audioElem: {},
      currentAudio: {},
      currentIndex: 0,
      paused: true,
      duration: '00:00',
      playedTime: '00:00',
      playedRatio: 0,
      loadedRatio: 0,
      volume: 0,
      playModes: ['play-circle-list', 'play-circle-single', 'play-random'],
      playMode: 0,
      speakerIcon: 'speaker',
      isShowVolumeSlider: false,
      isShowSheet: false,
      canPlay: !this.audios.length
    }
  },
  props: {
    preload: Boolean,
    audios: Array,
    asyncPlay: Function,
    defaultCover: String,
    pos: String,
    unique: {
      type: String,
      default: 'id'
    },
    sheetHeight: Number,
    defaultPlayMode: Number,
    defaultVolume: Number
  },
  computed: {
    playModeIcon () {
      return this.playModes[this.playMode]
    }
  },
  watch: {
    currentIndex: 'updateCurrentAudio'
  },
  components: {
    [Icon.name]: Icon,
    [Progress.name]: Progress
  },
  methods: {
    init () {
      const audio = this.$el.querySelector('audio')
      this.defaultVolume && (audio.volume = this.defaultVolume)

      this.audioElem = audio
      this.volume = audio.volume

      /* Bind audio events */
      audio.addEventListener('canplay', this.play)
      audio.addEventListener('canplaythrough', () => {
        this.loadedRatio = 1
      })
      audio.addEventListener('durationchange', () => {
        this.duration = secondsToReadable(audio.duration)
      })
      audio.addEventListener('pause', () => (this.paused = true))
      audio.addEventListener('play', () => (this.paused = false))
      audio.addEventListener('ended', this.playEndHandler)
      audio.addEventListener('timeupdate', () => {
        this.playedTime = secondsToReadable(audio.currentTime)
        this.playedRatio = audio.currentTime / audio.duration
      })
      audio.addEventListener('progress', () => {
        this.loadedRatio = audio.buffered.length
          ? audio.buffered.end(audio.buffered.length - 1) / audio.duration
          : 0
      })
      audio.addEventListener('volumechange', () => {
        this.volume = audio.volume
      })
    },
    goToPlayer () {
      this.$router.push({ path: `/player` })
    },
    async updateCurrentAudio (index) {
      const audio = this.audios[index]

      if (audio === undefined) return (this.paused = true)
      if (audio.url) {
        this.currentAudio = audio
        return
      }

      if (this.asyncPlay) await this.asyncPlay(index)

      this.currentAudio = audio
    },
    addAudio (audio) {
      const { unique } = this
      if (audio[unique] === undefined) return

      if (this.audios.length === 0) {
        this.audios.push(Object.assign({}, audio))
        this.canPlay = false
        this.updateCurrentAudio(0)
      }

      const index = this.audios.findIndex(
        $audio => $audio[unique] === audio[unique]
      )
      if (index > -1) return

      this.audios.push(Object.assign({}, audio))
    },
    async playNewAudio (audio) {
      const { unique } = this
      if (audio[unique] === undefined) return

      const index = this.audios.findIndex(
        $audio => $audio[unique] === audio[unique]
      )
      if (index === -1) {
        this.audios.unshift(Object.assign({}, audio))
        this.playIndex(0)
        return
      }

      this.playIndex(index)
    },
    async playIndex (index) {
      if (this.currentIndex === index) {
        this.updateCurrentAudio(index)
      } else {
        this.currentIndex = index
      }
    },
    play () {
      if (!this.canPlay) return (this.canPlay = true)
      // if (isEmptyObject(this.currentAudio)) return
      if (!this.currentAudio) {
        return
      }

      const promise = this.audioElem.play()
      if (promise) {
        promise.catch(e => {
          if (e.name === 'NotAllowedError') this.pause()
        })
      }
    },
    pause () {
      this.audioElem.pause()
    },
    prev () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.audios.length - 1
      } else {
        this.currentIndex--
      }
    },
    next () {
      if (this.currentIndex === this.audios.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    clickAudioBar (ratio) {
      this.audioElem.currentTime = this.audioElem.duration * ratio
    },
    clickVolumeBar (ratio) {
      this.audioElem.volume = ratio
    },
    changePlayMode () {
      if (this.playMode === 2) return (this.playMode = 0)
      this.playMode++
    },
    playEndHandler () {
      const { playMode } = this
      if (playMode === 0) this.next()
      if (playMode === 1) this.audioElem.load()
      if (playMode === 2) {
        const random = Math.floor(Math.random() * this.audios.length)
        if (random === this.currentIndex) {
          this.next()
        } else {
          this.currentIndex = random
        }
      }
    },
    toggleMute () {
      this.audioElem.muted = !this.audioElem.muted
      this.speakerIcon = this.audioElem.muted ? 'speaker-mute' : 'speaker'
    },
    toggleShowVolume () {
      this.isShowSheet = false
      this.isShowVolumeSlider = !this.isShowVolumeSlider
    },
    toggleShowSheet () {
      this.isShowSheet = !this.isShowSheet
      this.isShowVolumeSlider = false
    },
    remove (i) {
      if (this.currentIndex === i) this.next()
      this.audios.splice(i, 1)
      if (this.audios.length <= 1) this.isShowSheet = false
    },
    clearSheet () {
      this.audios.splice(0, this.audios.length)
      this.currentAudio = {}
      this.paused = true
      this.duration = '00:00'
      this.playedTime = '00:00'
      this.playedRatio = 0
      this.audioElem.load()
      this.isShowSheet = false
    }
  },
  created () {
    this.defaultPlayMode && (this.playMode = this.defaultPlayMode)
  },
  mounted () {
    this.init()

    this.updateCurrentAudio(this.currentIndex)
    window.addEventListener('click', () => {
      this.isShowSheet = false
      this.isShowVolumeSlider = false
    })
  }
}
</script>

<style>
svg {
  color: inherit;
  vertical-align: middle;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
     normalize.css 中也包含这行 */
  overflow: hidden;
}
.vv-nm-player {
  --main-color: #223;
  --theme-color: #df3b3b;
  --second-color: #919191;
  --bg-color: #f5f5f5;
  --border-color: #e9e9e9;
  --border-radius: 4px;
  --white: #fff;
  --unit: 8px;
  position: fixed;
  bottom: 0;
  /* width: 100%; */
  height: 60px;
  padding: 5px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border-color);
}
.vv-nm-player .nm-cover {
  position: relative;
  width: 60px;
  height: 100%;
  background-color: var(--bg-color);
  background-size: cover;
  margin-right: 24px;
}
.vv-nm-player .nm-cover .icon-wrap {
  display: none;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px;
}
.vv-nm-player .nm-cover .icon-wrap .icon-fangda {
  color: var(--white);
}
.vv-nm-player .nm-cover:hover .icon-wrap {
  display: block;
  position: absolute;
}
.vv-nm-player .nm-act {
  display: flex;
  align-items: center;
  margin-right: 24px;
}
.vv-nm-player .nm-act .icon {
  color: var(--white);
}
.vv-nm-player .nm-act .a-prev,
.vv-nm-player .nm-act .a-play,
.vv-nm-player .nm-act .a-next {
  background-color: var(--theme-color);
  border-radius: 50%;
  padding: 6px;
}
.vv-nm-player .nm-act .a-prev .icon-play-next {
  transform: rotateY(180deg);
}
.vv-nm-player .nm-act .a-play {
  padding: 8px;
  margin: 0 24px;
}
.vv-nm-player .nm-act .p-play {
  padding-left: 9px;
  padding-right: 7px;
}
.vv-nm-player .nm-content {
  flex: 1;
  margin-right: 24px;
}
.vv-nm-player .nm-content .nm-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--unit);
  font-size: 1.2rem;
}
.vv-nm-player .nm-content .nm-info .i-author {
  color: var(--second-color);
}
.vv-nm-player .nm-content .nm-progress {
  padding: 4px 0;
}
.vv-nm-player .nm-tools {
  display: flex;
  align-items: center;
  padding-right: 24px;
}
.vv-nm-player .nm-tools .t-volume {
  position: relative;
  margin-left: 24px;
}
.vv-nm-player .nm-tools .t-volume .volume-wrap {
  position: absolute;
  top: -70px;
  right: 0;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
}
.vv-nm-player .nm-tools .t-volume .volume-wrap .nm-progress {
  width: 200px;
  padding: 4px 0;
  margin-left: var(--unit);
}
.vv-nm-player .nm-tools .t-sheet {
  margin-left: 24px;
  display: flex;
  align-items: center;
  cursor: default;
}
.vv-nm-player .nm-tools .t-sheet .t-count {
  padding: 2px 6px;
  background-color: var(--second-color);
  color: var(--white);
  font-size: 1.2rem;
  margin-left: 4px;
  border-radius: 8px;
}
.vv-nm-player .icon-refresh.loading {
  animation: rotate-reverse 2s linear infinite;
}
.vv-nm-player .nm-progress .p-line {
  position: relative;
  height: 2px;
  border-radius: var(--border-radius);
}
.vv-nm-player .nm-progress .layer-1 {
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
}
.vv-nm-player .nm-progress .layer-2,
.vv-nm-player .nm-progress .layer-3 {
  transition: width 0.2s;
  position: absolute;
  top: 0;
  width: 0;
  height: 100%;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}
.vv-nm-player .nm-progress .layer-2 {
  background-color: #d9d9d9;
}
.vv-nm-player .nm-progress .layer-3 {
  background-color: var(--theme-color);
}
.vv-nm-player .nm-progress .p-ring {
  position: absolute;
  left: -8px;
  top: -7px;
  width: 16px;
  height: 16px;
  background-color: var(--white);
  border-radius: 50%;
  border: 1px solid var(--border-color);
  display: flex;
}
.vv-nm-player .nm-progress .p-ring .r-center {
  width: 4px;
  height: 4px;
  background-color: var(--theme-color);
  border-radius: 50%;
  margin: auto;
}
.vv-nm-player .nm-sheet {
  position: absolute;
  right: 0;
  bottom: 50px;
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-right: none;
}
.vv-nm-player .nm-sheet .s-head {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--border-color);
  padding: 0 16px 0 calc(var(--unit) + 24px);
}
.vv-nm-player .nm-sheet .s-head .h-act {
  display: flex;
  align-items: center;
}
.vv-nm-player .nm-sheet .s-head .h-act .icon-delete {
  margin-right: 16px;
}
.vv-nm-player .nm-sheet .s-body {
  overflow-y: auto;
}
.vv-nm-player .nm-sheet .s-body .s-row {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 var(--unit);
}
.vv-nm-player .nm-sheet .s-body .s-row.focus {
  color: var(--theme-color);
}
.vv-nm-player .nm-sheet .s-body .s-row:nth-child(even) {
  background-color: var(--bg-color);
}
.vv-nm-player .nm-sheet .s-body .s-row:hover .cell-delete .icon-delete {
  display: inline;
}
.vv-nm-player .nm-sheet .s-body .s-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vv-nm-player .nm-sheet .s-body .s-cell:nth-child(1) {
  width: 24px;
}
.vv-nm-player .nm-sheet .s-body .s-cell:nth-child(2) {
  width: 200px;
}
.vv-nm-player .nm-sheet .s-body .s-cell:nth-child(3) {
  width: 100px;
}
.vv-nm-player .nm-sheet .s-body .s-cell.cell-name {
  padding-right: 8px;
  font-size: 1.4rem;
}
.vv-nm-player .nm-sheet .s-body .s-cell.cell-author {
  font-size: 1.2rem;
}
.vv-nm-player .nm-sheet .s-body .s-cell.cell-delete {
  width: 14px;
}
.vv-nm-player .nm-sheet .s-body .s-cell.cell-delete .icon-delete {
  display: none;
}
.vv-nm-player.pos-top {
  top: 0;
  bottom: unset;
  border-top: none;
  border-bottom: 1px solid var(--border-color);
}
.vv-nm-player.pos-top .nm-tools .t-volume .volume-wrap {
  top: 18px;
}
.vv-nm-player.pos-top .nm-sheet {
  bottom: unset;
  top: 40px;
}
</style>