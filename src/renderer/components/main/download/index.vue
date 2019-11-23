<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px; color: #000; font-weight: bold;">下载管理</span>
    </el-divider>
    <el-row type="flex" justify="space-between" style="padding: 20px 10px">
      <el-col span="12">
        <el-button size="small" round>下载</el-button>
        <el-button size="small" round>暂停</el-button>
        <el-button size="small" round>批量操作</el-button>
        <i class="el-icon-sort" style="padding: 5px;font-size: 14px;">排序</i>
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
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="120px"></el-table-column>
      <el-table-column prop="album" label="专辑" width="120px"></el-table-column>
      <el-table-column prop="time" label="时长" width="100px">
          <el-progress :percentage="50"></el-progress>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载进度">
      <el-progress :percentage="50"></el-progress>
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
    },
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>