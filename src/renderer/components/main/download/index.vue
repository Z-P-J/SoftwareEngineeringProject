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
      <el-table-column prop="song" label="歌曲"></el-table-column>
      <el-table-column prop="singer" label="歌手" width="200px">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.progress }}</span>-->
          <el-progress :percentage="scope.row.progress" :format="format"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="下载音乐" placement="bottom">
            <el-button size="mini" type="primary" @click="download(scope.$index, scope.row)" circle>
              <i class="el-icon-video-play" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const downloader = require("../../../../main/util/StreamDownload");
// import downloader from '../../../../main/util/StreamDownload'
export default {
  name: "recent-play",
  data() {
    return {
      tableData: [
        {
          song: "歌曲名",
          singer: "歌手名",
          album: "专辑名",
          time: "4:00",
          progress: 50,
          url:
            "http://m10.music.126.net/20191215161520/aec9c261958406c459de2834e255fe1a/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
        }
      ]
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    download(index, row) {
      this.$message({
        message: "开始下载 index=" + index + " url=" + row.url,
        type: "success"
      });
      this.$store.dispatch('downloadMusic', {
        url: row.url,
        name: 'song.mp3'
      })
      // let downloadCallback = function downloadFileCallback(arg, percentage) {
      //   row.progress = percentage
      //   if (arg === "progress") {
      //     // 显示进度
      //   } else if (arg === "finished") {
      //     // 通知完成
      //   }
      // };
      // downloader.downloadFile(
      //   row.url,
      //   "D:/",
      //   downloadCallback
      // );
    }
    // format (percentage) {
    //   console.log('percentage=' + percentage)
    //   return percentage == 100 ? '已完成' : `${percentage}%`
    // }
  }
};
</script>