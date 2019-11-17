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
        <el-button type="primary" size="small" round>播放全部</el-button>
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
      :data="tableData"
      style="width: 100%;"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="song" label="歌曲">
        <!-- <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.song }}</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="120px"></el-table-column>
      <el-table-column prop="album" label="专辑" width="120px"></el-table-column>
      <el-table-column prop="time" label="时长" width="100px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
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
  name: 'recent-play',
  data () {
    return {
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
  methods: {
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
/* .searchClass{
  border: 1px solid #c5c5c5;
  border-radius: 20px;
  background: #f4f4f4;
}
.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}
.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}
.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}
.searchClass .el-icon-search{
  font-size: 16px;
}
.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}
.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}
.searchClass:hover{
  border: 1px solid #D5E3E8;
  background: #fff;
}
.searchClass:hover .line {
  background-color: #D5E3E8;
}
.searchClass:hover .el-icon-search{
  color: #409eff;
  font-size: 16px;
} */
</style>