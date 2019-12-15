<template>
  <el-scrollbar class="song-list-detail scroll-page" v-loading="loading">
    <div class="song-list" v-if="!loading">
      <el-row class="row">
        <div class="cover">
          <img :src="playlist.coverImgUrl" />
        </div>
        <div class="songlist-info">
          <div class="title">{{playlist.name}}</div>
          <div class="author">
            <img :src="playlist.creator.avatarUrl" />
            <span>{{playlist.creator.nickname}}</span>
          </div>
          <div class="desc line-1">{{playlist.description}}</div>
          <div class="actions">
            <el-button size="mini" type="primary" icon="el-icon-video-play">播放全部</el-button>
            <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
            <el-button size="mini" icon="el-icon-download">下载</el-button>
            <el-button size="mini" icon="el-icon-menu">批量操作</el-button>
            <el-button size="mini" icon="el-icon-share">分享</el-button>
          </div>
        </div>
      </el-row>
      <!-- style="width: 100%"
        ref="multipleTable"
        tooltip-effect="dark"
      @selection-change="handleSelectionChange"-->
      <el-table :data="playlist.tracks">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="歌曲">
          <template slot-scope="scope">
            <div class="name-row">
              <div class="left">
                <i @click="likeMusic(scope.row)" class="shoucang iconfont icon-shoucang"></i>
                <span>{{scope.row.name}}</span>
                <!-- <img class="tag" src="../../assets/images/sq.png" />
                <img v-if="scope.row.mv>0" class="tag" src="../../assets/images/mv.png" />-->
              </div>
              <div class="btns">
                <i class="iconfont icon-zanting play" @click="play(scope.row)"></i>
                <i class="iconfont icon-gengduo more"></i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="200px">
          <template slot-scope="scope">
            <span style="width: 140px;" class="line-1 hover">{{scope.row.ar[0].name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" width="200px">
          <template slot-scope="scope">
            <span style="width: 190px;" class="line-1 hover">{{scope.row.al.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="140px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 2px">{{ scope.row.dt|formatDuring }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="播放音乐" placement="bottom">
              <el-button
                size="mini"
                type="text"
                @click="playSong(scope.$index, scope.row)"
                circle
              >
                <i class="btn el-icon-video-play" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除历史记录" placement="bottom">
              <el-button
                size="mini"
                type="text"
                @click="playSongHistory(scope.$index, scope.row)"
                circle
              >
                <i class="btn el-icon-delete" />
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="我喜欢" placement="bottom">
              <el-button size="mini" type="text" @click="starSong(scope.$index, scope.row)" circle>
                <i class="btn el-icon-star-off" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
  </el-scrollbar>
</template>

<script>
import { getPlaylistDetail } from "../../../api/index";
export default {
  data() {
    return {
      id: "", // ("" + this.$route.fullPath).replace("/songlist#", ""),
      show: false,
      loading: true,
      playlist: false
    };
  },
  mounted() {
    this.$bus.$on("page-refresh", name => {
      if (name === "songlist-detail") {
        this.getPlaylistDetail();
      }
    });
  },
  // activated() {
  //   let id = this.$route.query.id;
  //   this.loading = true;
  //   if (id !== this.id) {
  //     this.id = id;
  //     this.getPlaylistDetail();
  //   } else {
  //     this.show = true;
  //   }
  // },
  // deactivated() {
  //   this.show = false;
  //   this.playlist = [];
  // },
  watch: {
    $route(to, from) {
      if (to.path == "/songlist") {
        let id = this.$route.query.id;
        this.playlist = [];
        this.loading = true;
        if (id !== this.id) {
          this.show = false;
          this.id = id;
          this.getPlaylistDetail();
        } else {
          this.show = true;
        }
      } else {
        this.show = false;
        this.loading = true;
        this.playlist = [];
      }
    }
  },
  methods: {
    getPlaylistDetail() {
      getPlaylistDetail(this.id).then(res => {
        console.log("getPlaylistDetail res=" + JSON.stringify(res));
        this.playlist = res.playlist;
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    starSong(index, row) {
      this.$message({
        message: "我喜欢 index=" + index + " row=" + row,
        type: "success"
      });
    },
    playSong(index, row) {
      this.$message({
        message: "播放音乐 index=" + index + " row=" + row,
        type: "success"
      });
    },
    playSongHistory(index, row) {
      this.$message({
        message: "删除音乐历史 index=" + index + " row=" + row,
        type: "success"
      });
    }
  }
};
</script>

<style>
.song-list-detail {
  background: #f0f0f0;
  flex: 1;
}
.scroll-page {
  overflow: hidden;
}
.scroll-page .el-scrollbar__wrap {
  overflow-x: hidden;
}

/* .el-table {
  background: none;
} */
.name-row .btns {
  display: flex;
  align-items: center;
}
.name-row .btns .iconfont {
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  color: #999;
  display: none;
}
.el-table tr:hover .btns .iconfont {
  display: block;
}
.el-table tr:hover .btns .iconfont:hover {
  color: #31c27c;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.line-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.row {
  padding: 10px 10px;
  display: flex;
}
.songlist-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover {
  width: 147px;
  height: 147px;
  position: relative;
  flex-shrink: 0;
}
.cover img {
  width: 147px;
  height: 147px;
}
.title {
  font-size: 22px;
  color: #000;
  font-weight: bold;
}
.author {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #555;
}
.author img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
.desc {
  font-size: 13px;
  color: #555;
  line-height: 20px;
}
</style>