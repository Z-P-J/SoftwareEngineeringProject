<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px; color: #000; font-weight: bold;">本地音乐</span>
    </el-divider>
    <el-row type="flex" justify="space-between" style="padding: 20px 10px">
      <el-col>
        <el-button type="primary" size="small" round>播放全部</el-button>
        <el-button size="small" round>批量操作</el-button>
        <el-button type="primary" size="small" @click="selectFolder" round>添加</el-button>
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
    <!-- <div v-else>
      <el-button type="primary" size="small" round>添加</el-button>
    </div> -->
  </div>
</template>

<script>
const fs = require('fs')
const pathModule = require('path')
const audioLoader = require('audio-loader')
const jsmediatags = require('jsmediatags')
export default {
  name: 'recent-play',
  data () {
    return {
      // hasMusic: true,
      tableData: [
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // },
        // {
        //   song: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '4:00'
        // }
      ]
    }
  },
  methods: {
    selectFolder () {
    //   window.electron.remote.dialog.showOpenDialog({
    //   title: 'Import Audio Files',
    //   properties: ['openFile', 'multiSelections'],
    //   filters: [{
    //     name: '.MP3 Files',
    //     extensions: ['mp3']
    //   }]
    // }, (data) => {
    //   this.importLocalFiles(data)
    // })

      var t = this
      this.$electron.ipcRenderer.send('open-directory-dialog', 'openDirectory')
      this.$electron.ipcRenderer.once('selectedItem', function (e, path) {
        if (path != null) {
          fs.readdir(path, (err, files) => {
            if (err) {
              t.$message({
                message: err,
                type: 'error'
              })
              return
            }
            console.log(`${path}`)
            files.forEach((file) => {
              if (pathModule.extname(file).toLowerCase() === '.mp3') {
                console.log(`${path}/${file}`)
                jsmediatags.read(path + '/' + file, {
                  onSuccess: function (tag) {
                    console.log(tag)
                    t.tableData.push({
                      song: tag.tags.title,
                      singer: tag.tags.artist,
                      album: tag.tags.album,
                      time: tag.tags.time
                    })
                  },
                  onError: function (error) {
                    console.log(':(', error.type, error.info)
                  }
                })
                // audioLoader(path + '/' + file).then(function (res) {
                //   console.log(res)
                //   t.tableData.push({
                //   song: '歌曲名',
                //   singer: '歌手名',
                //   album: '专辑名',
                //   time: res.duration
                // })
                // })
              }
            })
          })
        } else {
          t.$message({
            message: '您未选择任何文件夹！',
            type: 'error'
          })
        }
      })
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