<template>
  <div class="musicbox">
    <div id="img-div" class="img-div">
      <img v-bind:src="imgsrc" class="myimg" id="myimg" />
    </div>
    <div id="word" class="word">
      <div id="cont" class="cont" :style="{marginTop:scroll+'px'}">
        <div
          v-html="lrc.text"
          v-for="(lrc,index) in prd"
          v-bind:id="'lyc-'+ index"
          :class="{lrchi: index===vindex }"
          :key="index"
        >
          {{ lrc.text }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      vindex: 0,
      prd: prd,
      imgsrc: imgurl,
      audiosrc: audurl,
      scroll: 100,
      play: 0,
      currenttime: 0
    }
  },
  mounted: function () {
            	this.vmakedata()
       		 },
  methods: {
    vmakedata: function () {
      var vm = this
      setTimeout(function () {
        vm.makedata()
      }, 100)
    },
    playaudio: function () {
      this.vindex--
      this.go()
    },
    pauseaudio: function () {
      clearTimeout(this.play)
    },
    makedata: function () {
      var content = document.getElementById('cont')
      prd[0].scrolltop = 0
      prd[0].time = prd[0].end * 1000

      /* console.log("ido"); */
      console.log(prd.length)
      for (i = 1; i < prd.length - 1; i++) {
        prd[i].time = (prd[i].end - prd[i - 1].end) * 1000
        prd[i].scrolltop =
          prd[i - 1].scrolltop + content.children[i - 1].scrollHeight + 16
      }
    },
    go: function () {
      this.vindex++
      var audio = document.getElementById('myaudio')
      this.currenttime = audio.currentTime
      if (this.currenttime < prd[this.vindex].start) {
        this.vindex = this.binarySearch(prd, this.currenttime)
      }
      this.scroll = -prd[this.vindex].scrolltop
      var needtime = prd[this.vindex].end - this.currenttime
      this.play = setTimeout(this.go.bind(this), needtime * 1000)
    },
    binarySearch: function (data, dest) {
      var r = data.length - 1,
        l = 0
      while (l <= r) {
        var m = Math.floor((l + r) / 2)
        if (data[m].end == dest) {
          return m
        }
        if (dest > data[m].end) {
          l = m + 1
        } else {
          r = m - 1
        }
      }
      return l
    }
  }
}
</script>