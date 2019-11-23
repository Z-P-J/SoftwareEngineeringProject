<template>
  <transition name="viewSlideTop">
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
        <el-main class="main">
          <el-row type="flex" justify="space-between">
            <el-col class="left" span="12">
              <el-row type="flex" justify="center">
                <img :src="cover_url" style="width: 300px; height: 300px;" />
              </el-row>
              <el-row type="flex" justify="center" style="margin: 20px;">
                <el-button icon="el-icon-star-off" size="small">喜欢</el-button>
                <el-button icon="el-icon-folder-add" size="small">收藏</el-button>
                <el-button icon="el-icon-download" size="small">下载</el-button>
                <el-button icon="el-icon-share" size="small">分享</el-button>
              </el-row>
            </el-col>
            <el-col class="right" span="12">
              <span style="font-size: 24px; color: #fff;padding: 10px;" justify="center">{{song}}</span>
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
              <ul class="lyrics" @wheel="scrollBarWheel" v-if="lyrics.length">
                <li v-for="(item,index) in lyrics" class="item" :key="index">
                  <p>{{item}}</p>
                  <!-- <template v-if="showTranslate && translate[index] && translate[index][1]">
                        <p v-html="translate[index][1]"></p>
                  </template>-->
                </li>
              </ul>
              <div
                class="a"
                :style="mainStyle"
                v-loading="loading"
                element-loading-background="rgba(0, 0, 0, 0)"
                style="padding: 10px;"
                v-else
              >
                <span class="nolyric" style="font-size: 12px; color: #fff;">暂无歌词信息...</span>
                <p class="reloadLyric" @click="init" style="font-size: 12px; color: #fff;">点此尝试重新加载</p>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-footer height="100px">
          <footer-view></footer-view>
        </el-footer>
      </el-container>
    </div>
  </transition>
</template>

<script>
import FooterView from '../footer/'
export default {
  data () {
    return {
      cover_url:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      song: '音乐标题',
      singer: 'xxx',
      album: 'xxx',
      lyrics: [
        '111111111111111111111111111111111',
        '222222222222222222222222222222222',
        '333333333333333333333333333333333',
        '444444444444444444444444444444444',
        '555555555555555555555555555555555'
      ]
    }
  },
  components: {
    FooterView
  },
  methods: {
    down () {
      this.$router.go(-1)
    },
    close () {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$electron.ipcRenderer.send('close')
        })
        .catch(() => {})
    },
    minimize () {
      this.$electron.ipcRenderer.send('minimize')
    }
  }
}
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
  background: url("https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png")
    no-repeat center center fixed;
  background-size: cover;
}

.player-container::before {
  filter: blur(20px);
}

.player-container {
  background: rgba(0, 0, 0, 0.6);
}

.lyrics {
  z-index: 6;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  overflow: auto;
  transition: all 0.4s;
  /* -webkit-mask: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0),
    #fff 25%,
    #fff 75%,
    rgba(0, 0, 0, 0)
  ); */
}

.item {
  margin: 22px 0;
  min-height: 18px;
}

/* .player-container {
  position:absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
} */
</style>