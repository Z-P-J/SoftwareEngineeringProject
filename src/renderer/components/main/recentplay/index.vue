<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px; color: #000; font-weight: bold;">播放历史</span>
    </el-divider>

    <!-- <el-row>
      <span>共9首</span>
    </el-row>-->
    <el-row type="flex" justify="space-between" style="padding: 20px 10px">
      <el-col span="12">
        <el-button type="primary" size="small" round @click="playAll()">播放全部</el-button>
        <el-button size="small" round>下载</el-button>

        <el-button size="small" round>批量操作</el-button>
        <i class="el-icon-sort" style="padding: 5px;font-size: 14px;">排序</i>
      </el-col>
      <el-col span="6">
        <el-row type="flex" justify="end">
          <el-input
            class="searchClass"
            suffix-icon="el-icon-search"
            placeholder="搜索播放历史"
            size="mini"
          ></el-input>
        </el-row>
      </el-col>
    </el-row>
    <el-table
      :data="recentPlaySongs"
      style="width: 100%;"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="歌曲">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.song.song.song }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="120px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.song.song.singer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑" width="120px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.song.song.album }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="播放时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatTime(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="播放音乐" placement="bottom">
            <el-button size="mini" type="primary" @click="playSong(scope.$index, scope.row)" circle>
              <i class="el-icon-video-play" />
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除音乐" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              @click="deleteRecent(scope.$index, scope.row)"
              circle
            >
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
var moment = require('moment');
export default {
  name: 'recent-play',
  computed: {
    recentPlaySongs() {
      // console.log('recentPlaySongs=' + JSON.stringify(this.$store.state.player.recent_play))
      return this.$store.state.player.recent_play;
    },
  },
  activated() {
    console.log('recentPlaySongs=' + JSON.stringify(this.recentPlaySongs))
  },
  methods: {
    formatTime(timeStamp) {
      return moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    starSong (index, row) {
      this.$message({
        message: '我喜欢 index=' + index + ' row=' + row,
        type: 'success'
      })
    },
    playAll () {
      console.log('recentPlaySongs=' + JSON.stringify(this.recentPlaySongs))
      this.$message({
        message: '播放全部',
        type: 'success'
      })
    },
    playSong (index, row) {
      console.log('this.recentPlaySongs[index].song.song=' + JSON.stringify(this.recentPlaySongs[index].song.song))
      this.$store.dispatch('addToPlayList', this.recentPlaySongs[index].song.song)
      // this.$store.dispatch("playMusic", this.localSongs[index]);
    },
    deleteRecent (index, row) {
      this.recentPlaySongs.splice(index, 1)
      this.$message({
        message: '删除播放历史 index=' + index + ' row=' + row,
        type: 'success'
      })
    }
  }
}
</script>