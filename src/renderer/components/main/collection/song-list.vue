<template>
    <el-table
      :data="collectedSongs"
      style="width: 100%;"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="song" label="歌曲"></el-table-column>
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
          <el-tooltip class="item" effect="dark" content="删除音乐" placement="bottom">
            <el-button
              size="mini"
              type="danger"
              @click="deleteCollection(scope.$index, scope.row)"
              circle
            >
              <i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    computed: {
        collectedSongs() {
            return this.$store.state.collection.collection_songs;
        },
    },
    methods: {
        playSong(index, row) {
            this.$store.dispatch('addToPlayList', this.collectedSongs[index])
        },
        deleteCollection(index, row) {
            this.collectedSongs.splice(index, 1)
            this.$message({
                message: '取消收藏 index=' + index + ' row=' + row,
                type: 'success'
            })
        }
    }
}
</script>