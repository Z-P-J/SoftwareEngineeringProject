<template>
  <div class="song-list">
    <el-row class="row">
      <div class="cover">
        <img src="../../../assets/default_cover.jpg" />
      </div>
      <div class="info">
        <div class="title">歌单标题：{{input}}</div>
        <div class="author">
          <img src="../../../assets/default_cover.jpg" />
          <span>用户名</span>
        </div>
        <div class="desc line-1">这里是歌单简介这里是歌单简介</div>
        <div class="actions">
          <el-button size="mini" type="primary" icon="el-icon-video-play">播放全部</el-button>
          <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
          <el-button size="mini" icon="el-icon-download">下载</el-button>
          <el-button size="mini" icon="el-icon-menu">批量操作</el-button>
          <el-button size="mini" icon="el-icon-share">分享</el-button>
        </div>
      </div>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="song" label="歌曲">
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="120px"></el-table-column>
      <el-table-column prop="album" label="专辑" width="120px"></el-table-column>
      <el-table-column prop="time" label="时长" width="100px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 2px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="播放音乐" placement="bottom">
            <el-button size="mini" type="primary" @click="playSong(scope.$index, scope.row)" circle>
              <i class="el-icon-video-play" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除历史记录" placement="bottom">
            <el-button size="mini" type="danger"  @click="playSongHistory(scope.$index, scope.row)" circle>
              <i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="我喜欢" placement="bottom">
            <el-button size="mini" type="info" @click="starSong(scope.$index, scope.row)" circle>
              <i class="el-icon-star-off" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ('' + this.$route.fullPath).replace('/songlist#', ''),
      tableData: [
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        },
        {
          song: '歌曲名',
          singer: '歌手名',
          album: '专辑名',
          time: '4:00'
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      var str = '' + to.fullPath
      this.input = str.replace('/songlist#', '')
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    starSong (index, row) {
      this.$message({
        message: '我喜欢 index=' + index + ' row=' + row,
        type: 'success'
      })
    },
    playSong (index, row) {
      this.$message({
        message: '播放音乐 index=' + index + ' row=' + row,
        type: 'success'
      })
    },
    playSongHistory (index, row) {
      this.tableData.splice(index, 1)
      this.$message({
        message: '删除音乐历史 index=' + index + ' row=' + row,
        type: 'success'
      })
    }
  }
}
</script>

<style>
.row {
  padding: 10px 10px;
  display: flex;
}
.info {
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