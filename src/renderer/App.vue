<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="content" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <audio v-show="false" ref="audio" v-if="play_url" :src="play_url" preload />

    <!-- <transition :name="transitionName">
      <player :v-show="show_player"/>
    </transition>-->
  </div>
</template>

<script>
import * as path from "path";
import * as fs from "fs";
const request = require("request");
export default {
  name: "music-player",
  data() {
    return {
      transitionName: "none",
      show_player: false
    };
  },
  computed: {
    download_list() {
      return this.$store.state.download.download_list;
    },
    onDownload() {
      return this.$store.state.download.on_download;
    },
    play_list() {
      return this.$store.state.player.list;
    },
    song() {
      return this.$store.state.player.song;
    },
    music_urls() {
      return this.$store.state.player.music_urls;
    },
    cover() {
      try {
        return this.song.al.picUrl;
      } catch (e) {
        return "http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg";
      }
    },
    name() {
      try {
        if (this.song.song) {
          return this.song.song + " - " + this.song.singer;
        }
        return "音乐播放器";
      } catch (e) {
        return "音乐播放器";
      }
    },
    ar_name() {
      try {
        return this.song.ar[0].name;
      } catch (e) {
        return false;
      }
    },
    play_url() {
      // console.log(music_urls());
      // console.log(this.$store.state.player.music_urls.path);
      return this.$store.state.player.song.path || false;
    },
    is_play() {
      return this.$store.state.player.is_play;
    },
    currentTime() {
      return this.$store.state.player.currentTime;
    },
    goToTime() {
      return this.$store.state.player.goToTime;
    },
    play_type() {
      return this.$store.state.player.play_type;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/player") {
        this.show_player = true;
        this.transitionName = "slide-up";
      } else if (from.path == "/player") {
        this.show_player = false;
        this.transitionName = "slide-down";
      } else {
        this.transitionName = "none";
      }
    },
    onDownload(val) {
      console.log("onDownload val=" + JSON.stringify(val));
      if (val.url) {
        this.downloadFile(val.url, "D:/", val.name, function(arg, percentage) {
          if (arg === "progress") {
            // 显示进度
            val.progress = percentage;
            console.log("percent = " + percentage);
          } else if (arg === "finished") {
            // 通知完成
            console.log("finished = " + percentage);
          }
        });
      }
    },
    is_play(val) {
      console.log("is_play val=" + val);
      try {
        this.$nextTick(() => {
          this.audio = this.$refs["audio"];
          console.log("is_play duration=" + this.audio.duration);
          console.log("is_play time=" + this.$store.state.player.song.time);
          // this.$store.commit("SET_PLAYER_DATA", {
          //   musicTime: this.audio.duration
          // });
          if (val) {
            this.audio.play();
            this.max_time = this.audio.duration;
            this.getPlayTime();
            this.audio.addEventListener("ended", () => {
              // this.playEnded();
              console.log("audio ended");
              this.$store.dispatch("playEnded");
            });
          } else {
            this.audio.pause();
            clearInterval(this.interval);
          }
        });
      } catch (e) {
        console.log("play error");
      }
    },
    goToTime(val) {
      this.audio.currentTime = val;
    }
  },
  methods: {
    // 获取当前已播放时间
    getPlayTime() {
      this.interval = setInterval(() => {
        this.$store.state.player.song.time = this.audio.duration;
        this.$store.commit("SET_PLAYER_DATA", {
          currentTime: this.audio.currentTime
          // musicTime: this.audio.duration
        });
      }, 1000);
    },
    downloadFile(patchUrl, baseDir, fileName, callback) {
      // this.downloadCallback = callback; // 注册回调函数

      // const fileName = 'update.7z'; // 下载文件名称，也可以从外部传进来

      let receivedBytes = 0;
      let totalBytes = 0;

      console.log('url=' + patchUrl)
      const req = request({
        method: "GET",
        uri: patchUrl,
        headers: {
          "User-Agent": 'NeteaseMusic/6.1.1.1556012780(140);Dalvik/2.1.0 (Linux; U; Android 8.0.0; MI 5s MIUI/9.8.22)',
          "Referer": "http://music.163.com/api"
        }
      });

      const out = fs.createWriteStream(path.join(baseDir, fileName));
      req.pipe(out);

      req.on("response", data => {
        // 更新总文件字节大小
        totalBytes = parseInt(data.headers["content-length"], 10);
        console.log("total=" + totalBytes);
        console.log(
          'data.headers["content-length"]=' + data.headers["content-length"]
        );
      });

      req.on("data", chunk => {
        // 更新下载的文件块字节大小
        receivedBytes += chunk.length;
        // this.showProgress(receivedBytes, totalBytes);
        const percentage = (receivedBytes * 100) / totalBytes;
        // 用回调显示到界面上
        callback("progress", percentage);
      });

      req.on("end", () => {
        console.log("下载已完成，等待处理");
        // TODO: 检查文件，部署文件，删除文件
        callback("finished", 100);
      });
    }
  }
};
</script>

<style>
@import url(./assets/iconfont/iconfont.css);
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.3s ease-out;
}
.slide-up-enter {
  transform: translate(0, 100%);
}
.slide-up-leave-active {
  transform: translate(0, -50%);
}
.slide-down-enter {
  transform: translate(0, -50%);
}
.slide-down-leave-active {
  transform: translate(0, 100%);
}
</style>
