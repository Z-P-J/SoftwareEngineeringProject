<template>
  <div class="player-page-controller">
    <el-col>
      <div class="player-page-progress">
        <el-slider
          :show-tooltipss="true"
          v-model="play_time"
          input-size="mini"
          :min="1"
          :max="song.time"
          @change="playTimeChange"
        ></el-slider>
      </div>
      <div class="player-page-bottom-bar">
        <div class="info">
          <div class="player-actions">
            <el-button type="text">
              <i class="iconfont icon-xiai"></i>
            </el-button>
            <el-button type="text">
              <i class="iconfont icon-xiazai2"></i>
            </el-button>
          </div>
        </div>
        <div class="control">
          <div class="control_container">
            <el-button class="action-button-small" type="text">
              <i class="iconfont icon-liebiaoxunhuan"></i>
            </el-button>
            <el-button
              class="action-button-mid"
              type="text"
              @click="playBefore"
              :disabled="!before_song"
            >
              <i class="iconfont icon-kuaitui"></i>
            </el-button>
            <el-button class="play-btn" type="text" @click="playClick">
              <i class="iconfont icon-zanting" v-if="!is_play"></i>
              <i class="iconfont icon-bofang" v-else></i>
            </el-button>
            <el-button
              class="action-button-mid"
              type="text"
              @click="playAfter"
              :disabled="!after_song"
            >
              <i class="iconfont icon-kuaijin"></i>
            </el-button>
            <el-button class="action-button-small" type="text">
              <i class="iconfont icon-shengyin"></i>
            </el-button>
          </div>
        </div>
        <div class="time" style="width: 110px;">{{play_time*1000|formatDuring}} / {{song.time*1000|formatDuring}}</div>
        <div class="actions">
          <el-popover
            placement="top-start"
            width="300"
            popper-class="ls"
            trigger="click"
            style="padding: 0 10px;"
          >
            <playlist/>
            <el-button type="text" @click.native="showPlaylist" slot="reference">
              <i class="iconfont icon-liebiao"></i>
            </el-button>
          </el-popover>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import playlist from './play-list.vue'
export default {
  components: {
      playlist
  },
  data() {
    return {
      audio: null,
      play_time: 0,
      max_time: 0,
      interval: null,
      play_type: 1 //播放次序 0单曲循环 1列表循环 2随机播放
    };
  },
  mounted() {},
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
      console.log(this.$store.state.player.music_urls.path);
      return this.$store.state.player.music_urls.path || false;
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
        if (this.song.path === item.path && index > 0) {
          s_index = index - 1;
        }
      });
      return s_index >= 0 ? this.play_list[s_index] : false;
    },
    after_song() {
      let s_index = -1;
      this.play_list.map((item, index) => {
        if (this.song.path === item.path && index < this.play_list.length - 1) {
          s_index = index + 1;
        }
      });
      return s_index >= 0 ? this.play_list[s_index] : false;
    }
  },
  methods: {
    //播放/暂停按钮点击
    playClick() {
      if (this.song.song) {
        this.$store.commit("SET_PLAYER_DATA", { is_play: !this.is_play });
      }
    },
    //改变播放时间
    playTimeChange(val) {
      this.$store.commit("SET_PLAYER_DATA", { goToTime: val });
    },
    playBefore() {
      this.$store.dispatch("playBefore");
    },
    playAfter() {
      this.$store.dispatch("playAfter");
    },
    // 弹出播放列表
    showPlaylist() {
      this.$bus.$emit("showPlaylist");
    }
  },
  watch: {
    currentTime(val) {
      // console.log("currentTime=" + val);
      this.play_time = val;
    }
  },
};
</script>

<style>
.player-page-progress .el-progress .el-progress-bar__outer {
  border-radius: 0;
}

.player-page-progress .el-progress .el-progress-bar__inner {
  border-radius: 0;
}

.player-page-progress .el-slider .el-slider__runway {
  height: 2px;
  margin: 2px 0;
}

.player-page-progress .el-slider .el-slider__bar {
  height: 2px;
}

.player-page-progress .el-slider .el-slider__button-wrapper {
  width: 2px;
  height: 2px;
  top: -6px;
}

.player-page-progress .el-slider .el-slider__button {
  width: 2px;
  height: 2px;
}

.player-page-bottom-bar {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.player-page-bottom-bar .control {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}

.player-page-bottom-bar .control_container {
  /* width: 230px; */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.player-page-bottom-bar .control_container button {
  margin: 0 10px;
  color: #409eff;
}

.player-page-bottom-bar .control_container button i {
  font-size: 28px;
}

.player-page-bottom-bar .control_container button:hover {
  color: #409eff;
}

.player-page-bottom-bar .control_container .play-btn i {
  font-size: 38px;
}

.player-page-bottom-bar .control_container .action-button-mid {
  color: #fff;
}

.player-page-bottom-bar .control_container .action-button-small {
  color: #fff;
  margin: 0;
}

.player-page-bottom-bar .control_container .action-button-small i {
  font-size: 16px;
}

.player-page-bottom-bar .cover {
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-page-bottom-bar .cover .cover-image {
  width: 42px;
  height: 42px;
  border-radius: 5px;
}

.player-page-bottom-bar .info {
  /* flex: 1; */
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}

.player-page-bottom-bar .info button {
  color: #fff;
  padding-top: 2px;
  padding-bottom: 2px;
}

.player-page-bottom-bar .actions {
  width: 40px;
  padding: 0 10px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
}

.player-page-bottom-bar .actions button {
  color: #fff;
  flex: 1;
  flex-shrink: 0;
}

.player-page-bottom-bar .actions button:hover {
  color: #409eff;
}

.player-page-bottom-bar .actions el-popover {
  padding: 0 10px;
  color: #333;
  flex: 1;
  flex-shrink: 0;
}
</style>
