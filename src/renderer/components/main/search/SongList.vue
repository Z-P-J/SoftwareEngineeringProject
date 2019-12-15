<template>
  <el-table
      :data="data"
      stripe
      style="width: 100%;"
      ref="multipleTable"
      tooltip-effect="dark"
    >
    <!-- @selection-change="handleSelectionChange" -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="歌曲">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="150px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.artists[0].name  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑" width="150px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.album.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="时长" width="150px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.duration|formatDuring }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="播放音乐" placement="bottom">
            <el-button size="mini" type="primary" @click="playSong(scope.$index, scope.row)" circle>
              <i class="el-icon-video-play" />
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
</template>

<script>
export default {
  name: "SongList",
  inject: ["nowPlay", "playMusic"],
  props: {
    data: Array,
    type: String,
    loading: Boolean,
    page: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
      listData: [],
      playListData: {
        creator: {
          userId: ""
        }
      }
    };
  },
  methods: {
    toString(json) {
      console.log('search songs:' + JSON.stringify(json))
      return json
    }
  }
};
</script>