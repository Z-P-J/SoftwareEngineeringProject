<template>
  <el-col>
    <div class="progress">
      <el-slider
        :show-tooltipss="true"
        v-model="play_time"
        input-size="mini"
        :min="1"
        :max="song.time"
        @change="playTimeChange"
      ></el-slider>
    </div>
    <div class="player">
      <div class="cover" @click="goToPlayer">
        <img class="cover-image" :src="cover" />
      </div>
      <div class="info">
        <div class="top">
          <div class="names">
            <div>
              <span class="name">{{name}}</span>
              <!-- <span class="ar_name" v-if="ar_name">- {{ar_name}}</span> -->
            </div>
          </div>
        </div>
        <div class="actions1">
          <el-button type="text">
            <i class="iconfont icon-xiai"></i>
          </el-button>
          <el-button type="text">
            <i class="iconfont icon-xiazai2"></i>
          </el-button>
        </div>
      </div>

      <!-- <div class="tone">
        <el-dropdown trigger="click" placement="top">
          <span class="tone-dropdown">
            标准
            <i class="el-icon-arrow-up el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 220px">
            <el-dropdown-item>
              <div class="flex-c-l">
                <div class="check" style="width: 30px">
                  <i class="el-icon-check" style="color: #31c27c;"></i>
                </div>
                <span>标准品质</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="flex-c-l">
                <div class="check" style="width: 30px"></div>
                <span>HQ高品质</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="flex-c-l">
                <div class="check" style="width: 30px"></div>
                <span>SQ无损品质</span>
                <img src="../../assets/svip.png" style="margin-left: 5px; width: 22px" />
                <img src="../../assets/sui.png" style="margin-left: 5px; width: 22px" />
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="mt-10" trigger="click" placement="top" size="medium">
          <span class="tone-dropdown">
            音效
            <i class="el-icon-arrow-up el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width: 200px">
            <el-dropdown-item>关闭</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>-->

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
      <!-- <div class="time">02:10 / 04:00</div> -->
      <div class="time">{{play_time*1000|formatDuring}} / {{song.time*1000|formatDuring}}</div>
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
</template>

<script>
import playlist from './play-list.vue'
// const btoa = require('btoa');
let Base64 = require('js-base64').Base64
export default {
  components: {
      playlist
  },
  data() {
    return {
      audio: null,
      play_time: 0,
      music_time: 0,
      interval: null,
      play_type: 1 //播放次序 0单曲循环 1列表循环 2随机播放
    };
  },
  mounted() {},
  watch: {
    currentTime(val) {
      console.log("currentTime=" + val);
      this.play_time = val;
    }
    // musicTime(val) {
    //   console.log("musicTime" + val);
    //   this.music_time = val;
    // }
  },
  computed: {
    play_list() {
      return this.$store.state.player.list;
    },
    song() {
      return this.$store.state.player.song;
    },
    // music_urls() {
    //   return this.$store.state.player.music_urls;
    // },
    cover() {
      // try {
      //   let base64String = "";
      //   this.song.picture.data.map((d, j) => {
      //     base64String += String.fromCharCode(d);
      //   });
      //   // return this.song.picture.picUrl;
      //   return Base64.encode(base64String);
      // } catch (e) {
      //   return "http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg";
      // }
      return "http://p1.music.126.net/dPn_6T9d5VUuCDvhJdZ_8A==/109951163399691488.jpg";
    },
    name() {
      try {
        if (this.song.song) {
          return this.song.song + " - " + this.song.singer;
        }
      } catch (e) {}
      return "音乐播放器";
    },
    ar_name() {
      try {
        return this.song.ar[0].name;
      } catch (e) {
        return false;
      }
    },
    is_play() {
      return this.$store.state.player.is_play;
    },
    currentTime() {
      return this.$store.state.player.currentTime;
    },
    // musicTime() {
    //   return this.$store.state.player.musicTime;
    // },
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
    goToPlayer() {
      this.$router.push({ path: `/player` });
    },
    //播放/暂停按钮点击
    playClick() {
      if (this.song.song) {
        this.$store.commit("SET_PLAYER_DATA", { is_play: !this.is_play });
      } else {
        this.$store.commit("SET_PLAYER_DATA", { is_play: false });
        this.$message({
          type: "error",
          message: "播放列表为空"
        });
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
  }
};
</script>

<style>
/* .progress {
  margin-top: 0px;
} */

.progress .el-progress .el-progress-bar__outer {
  border-radius: 0;
}

.progress .el-progress .el-progress-bar__inner {
  border-radius: 0;
}

.progress .el-slider .el-slider__runway {
  height: 2px;
  margin: 2px 0;
}

.progress .el-slider .el-slider__bar {
  height: 2px;
}

.progress .el-slider .el-slider__button-wrapper {
  width: 2px;
  height: 2px;
  top: -6px;
}

.progress .el-slider .el-slider__button {
  width: 2px;
  height: 2px;
}

.player {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.player .control {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}

.player .control_container {
  /* width: 230px; */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.player .control_container button {
  margin: 0 10px;
  color: #409eff;
}

.player .control_container button i {
  font-size: 28px;
}

.player .control_container button:hover {
  color: #409eff;
}

.player .control_container .play-btn i {
  font-size: 38px;
}

.player .control_container .action-button-mid {
  color: #333;
}

.player .control_container .action-button-small {
  color: #999;
  margin: 0;
}

.player .control_container .action-button-small i {
  font-size: 16px;
}

.player .cover {
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player .cover .cover-image {
  width: 42px;
  height: 42px;
  border-radius: 5px;
}

.player .tone {
  /* width: 75px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.player .tone .el-dropdown {
  width: 35px;
  border: 1px solid #999;
  font-size: 10px;
  color: #333;
  padding: 1px 5px;
  border-radius: 2px;
  cursor: pointer;
}

.player .tone .el-dropdown i {
  font-size: 10px;
}

.player .tone .el-dropdown:hover {
  color: #409eff;
  border: 1px solid #409eff;
}

.player .info {
  /* flex: 1; */
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}

.player .info .top {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.player .info .top .names {
  font-size: 13px;
  color: #444;
}

/* .player .info .top .time {
  font-size: 12px;
  color: #999;
} */

.player .info button {
  color: #999;
  padding-top: 2px;
  padding-bottom: 2px;
}

.player .actions {
  /* width: 200px; */
  padding: 0 10px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
}

.player .actions button {
  color: #333;
  flex: 1;
  flex-shrink: 0;
}

.player .actions button:hover {
  color: #409eff;
}

.player .actions el-popover {
  padding: 0 10px;
  color: #333;
  flex: 1;
  flex-shrink: 0;
}
</style>
