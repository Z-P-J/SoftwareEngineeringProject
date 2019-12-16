<template>
  <transition name="viewSlideTop">
    <section>
      <div class="wrap">
        <el-container class="player-container">
          <el-header class="header drag">
            <el-row class="top-bar" type="flex" justify="space-between">
              <el-col class="left" span="6">
                <div>
                  <el-col span="4">
                    <el-button
                      class="no-drag"
                      icon="el-icon-arrow-down"
                      circle
                      type="text"
                      size="medium"
                      @click="down"
                    ></el-button>
                  </el-col>
                </div>
              </el-col>
              <el-col class="right" span="6">
                <el-row type="flex" justify="end">
                  <el-col span="4">
                    <el-button
                      class="no-drag"
                      icon="el-icon-minus"
                      circle
                      type="text"
                      size="medium"
                      @click="minimize"
                    ></el-button>
                  </el-col>
                  <el-col span="4">
                    <el-button
                      class="no-drag"
                      icon="el-icon-copy-document"
                      circle
                      type="text"
                      size="medium"
                      @click="fullScreen"
                    ></el-button>
                  </el-col>
                  <el-col span="4">
                    <el-button
                      class="no-drag"
                      icon="el-icon-close"
                      circle
                      type="text"
                      size="medium"
                      @click="close"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="player-main">
            <el-row type="flex" justify="space-between" style="height: 100%;">
              <el-col class="player-main-left" span="12">
                <el-row class="song-cover" type="flex" justify="center">
                  <img :src="cover" />
                  <el-row type="flex" justify="center" style="margin: 20px;">
                    <el-button icon="el-icon-star-off" size="small" type="text">喜欢</el-button>
                    <el-button icon="el-icon-folder-add" size="small" type="text">收藏</el-button>
                    <el-button icon="el-icon-download" size="small" type="text">下载</el-button>
                    <el-button icon="el-icon-share" size="small" type="text">分享</el-button>
                  </el-row>
                </el-row>
              </el-col>
              <el-col class="player-main-right" span="12">
                <span
                  style="font-size: 24px; color: #fff;padding: 10px;"
                  justify="center"
                >{{song_name}}</span>
                <el-row type="flex">
                  <span style="font-size: 16px; color: #fff;padding: 10px;" justify="center">
                    歌手：
                    <router-link tag="span" :to="'/player'" style="color: #409EFF;">{{singer}}</router-link>
                  </span>
                  <span style="font-size: 16px; color: #fff;padding: 10px;" justify="center">
                    专辑：
                    <router-link tag="span" :to="'/player'" style="color: #409EFF;">{{album}}</router-link>
                  </span>
                </el-row>
                <!-- <ul class="lyrics" @wheel="scrollBarWheel" v-if="lyrics.length">
                  <li v-for="(item,index) in lyrics" class="item" :key="index">
                    <p>{{item}}</p>
                  </li>
                </ul>-->

                <scroll
                  class="middle-r"
                  ref="lyricList"
                  :data="currentLyric && currentLyric.lines"
                  v-if="currentLyric && currentLyric.lines"
                >
                  <div class="lyric-wrapper">
                    <div v-if="currentLyric">
                      <p
                        ref="lyricLine"
                        class="text"
                        :class="{'current': currentLineNum === index}"
                        v-for="(line, index) in currentLyric.lines"
                        :key="line.time"
                      >{{line.txt}}</p>
                    </div>
                  </div>
                </scroll>
                <div
                  class="a"
                  :style="mainStyle"
                  v-loading="loading"
                  element-loading-background="rgba(0, 0, 0, 0)"
                  style="padding: 10px;"
                  v-else
                >
                  <span class="nolyric" style="font-size: 12px; color: #fff;">暂无歌词信息...</span>
                  <p
                    class="reloadLyric"
                    @click="init"
                    style="font-size: 12px; color: #fff;"
                  >点此尝试重新加载</p>
                </div>
              </el-col>
            </el-row>
          </el-main>
          <el-footer height="70px">
            <player-controller></player-controller>
          </el-footer>
        </el-container>
      </div>
      <blur-background :url="cover" style="height: 100%"></blur-background>
    </section>
  </transition>
</template>

<script>
import PlayerController from "./player-page-controller";
import BlurBackground from "./BlurBackground";
import { lyric } from "../../api";
export default {
  data() {
    return {
      lyrics: [
        "111111111111111111111111111111111",
        "222222222222222222222222222222222",
        "333333333333333333333333333333333",
        "444444444444444444444444444444444",
        "555555555555555555555555555555555"
      ],
      currentLineNum: 0,
      currentLyric: null
    };
  },
  components: {
    PlayerController,
    BlurBackground
  },
  mounted() {
    this.getLyric();
  },
  activated() {
    this.getLyric();
  },
  methods: {
    getLyric() {
      if (this.song.path.indexOf('https' != -1)) {
        console.log('getLyric id=' + this.song.path.replace('https://music.163.com/song/media/outer/url?id=', '').replace('.mp3', ''))
        lyric(this.song.path.replace('https://music.163.com/song/media/outer/url?id=', '').replace('.mp3', '')).then(json => {
          console.log('lyric=' + JSON.stringify(json))
          //利用第三方库: js-lyric ，解析我们的歌词，生成方便操作的对象
          this.currentLyric = new Lyric(json, this.handleLyric)
        });
      } else {
        this.currentLyric = null
      }
      
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        //v-for循环，所以this.$refs.lyricLine是一个数组，从而获取相应DOM
        let lyricEl = this.$refs.lyricLine[lineNum - 5]
        //调用scroll组件API
        this.$refs.lyricList.scrollToElement(lyricEl, 1000)
      } else {
        //如果小于5，则滚动制顶部
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    down() {
      this.$router.go(-1);
    },
    close() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$electron.ipcRenderer.send("close");
        })
        .catch(() => {});
    },
    minimize() {
      this.$electron.ipcRenderer.send("minimize");
    }
  },
  computed: {
    play_list() {
      return this.$store.state.player.list;
    },
    song() {
      return this.$store.state.player.song;
    },
    cover() {
      if (this.song.picture) {
        return this.song.picture;
      }
      return "http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg";
      // try {
      //   return this.song.picture;
      // } catch (e) {
      //   ;
      // }
    },
    song_name() {
      try {
        if (this.song.song) {
          return this.song.song;
        }
      } catch (e) {}
      return "音乐播放器";
    },
    singer() {
      try {
        return this.song.singer;
      } catch (e) {
        return "未知";
      }
    },
    album() {
      try {
        return this.song.album;
      } catch (e) {
        return "未知";
      }
    },
    is_play() {
      return this.$store.state.player.is_play;
    },
    currentTime() {
      return this.$store.state.player.currentTime;
    },
    before_song() {
      let s_index = -1;
      this.play_list.map((item, index) => {
        if (this.song.id === item.id && index > 0) {
          s_index = index - 1;
        }
      });
      return s_index >= 0 ? this.play_list[s_index] : false;
    },
    after_song() {
      let s_index = -1;
      this.play_list.map((item, index) => {
        if (this.song.id === item.id && index < this.play_list.length - 1) {
          s_index = index + 1;
        }
      });
      return s_index >= 0 ? this.play_list[s_index] : false;
    }
  }
};
</script>

<style>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  z-index: 1;
}

.lyrics {
  z-index: 6;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  transition: all 0.4s;
}

.item {
  margin: 22px 0;
  min-height: 18px;
}

.player-main {
  display: flex;
  align-items: center;
  height: 100%;
}

.player-main .player-main-left .song-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  height: 100%;
}

.player-main .player-main-left .song-cover img {
  width: 235px;
  height: 235px;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  left: 32px;
  top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>