<template>
  <div class="footer-view">
     <aplayer :audio="audio" :lrcType="3" />
    
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      audio: {
        name: 'The Party We Have Never Seen',
        artist: 'Nana Takahashi',
        url: 'https://cdn.moefe.org/music/mp3/thepartywehaveneverseen.mp3',
        cover: 'https://p1.music.126.net/IwclpJu4gaqhSZrKunEFWg==/3297435379408525.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thepartywehaveneverseen.lrc',
      },
    };
  },
};
</script>


<script>
export default {
  methods: {
    toggleLyrics () {
      this.$router.push({path: `/player`});
    }
  }
}
</script>

<style>
/* .cover {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover .cover-image {
  width: 50px;
  height: 50px;
  border-radius: 2px;
}

.footer-view .control {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}
.footer-view .control button {
  margin: 0 15px;
  color: #31c27c;
}
.footer-view .control button i {
  font-size: 32px;
}
.footer-view .control button:hover {
  color: #2fab67;
}

.footer-view .control .play-btn i {
  font-size: 38px;
}
.footer-view .cover {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-view .cover .cover-image {
  width: 50px;
  height: 50px;
  border-radius: 2px;
}
.footer-view .tone {
  width: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.footer-view .tone.el-dropdown {
  width: 35px;
  border: 1px solid #999;
  font-size: 10px;
  color: #333;
  padding: 1px 5px;
  border-radius: 2px;
}
.footer-view .tone.el-dropdown cursor i {
  font-size: 10px;
}
.footer-view .tone.el-dropdown:hover {
  color: #31c27c;
  border: 1px solid #31c27c;
}
.footer-view.info {
  flex: 1;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}
.footer-view.info.top {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
}
.footer-view.info.top.names {
  font-size: 13px;
  color: #444;
}
.footer-view.info.top.time {
  font-size: 12px;
  color: #999;
}
.footer-view.info.progress {
  margin-top: 10px;
}

.footer-view.info.progress.el-progress.el-progress-bar__outer {
  border-radius: 0;
}
.footer-view.info.progress.el-progress.el-progress-bar__inner {
  border-radius: 0;
}
.footer-view.info.progress.el-slider.el-slider__runway {
  height: 2px;
  margin: 2px 0;
}
.footer-view.info.progress.el-slider.el-slider__bar {
  height: 2px;
}
.footer-view.info.progress.el-slider.el-slider__button-wrapper {
  width: 6px;
  height: 6px;
  top: -10px;
}
.footer-view.info.progress.el-slider.el-slider__button {
  width: 2px;
  height: 2px;
}
.footer-view.actions {
  width: 200px;
  padding: 0 20px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
}
.footer-view.actions button {
  color: #333;
  flex: 1;
  flex-shrink: 0;
}
.footer-view.actions button:hover {
  color: #31be7a;
}
.footer-view {
  display: flex;
  align-items: center;
}
.el-slider__runway {
  height: 2px;
  margin: 2px 0;
}
.el-slider__bar {
  height: 2px;
}
.el-slider__button-wrapper {
  width: 6px;
  height: 6px;
  top: -10px;
}
.el-slider__button {
  width: 2px;
  height: 2px;
} */
</style>