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
export default {
  name: "music-player",
  data() {
    return {
      transitionName: "none",
      show_player: false
    };
  },
  computed: {
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
    //获取当前已播放时间
    getPlayTime() {
      this.interval = setInterval(() => {
        this.$store.state.player.song.time = this.audio.duration;
        this.$store.commit("SET_PLAYER_DATA", {
          currentTime: this.audio.currentTime
          // musicTime: this.audio.duration
        });
      }, 1000);
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
