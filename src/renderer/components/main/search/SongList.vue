<template>
  <el-table :data="data" stripe>
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="歌曲">
      <template slot-scope="scope">
        <div class="name-row">
          <div class="left">
            <i @click="likeMusic(scope.row)" class="shoucang iconfont icon-shoucang"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
            <!-- <img class="tag" src="../../assets/images/sq.png" />
            <img v-if="scope.row.mv>0" class="tag" src="../../assets/images/mv.png" />-->
          </div>
          <div class="btns">
            <i class="iconfont icon-zanting play" @click="playSong(scope.row)"></i>
            <i class="iconfont icon-gengduo more"></i>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="ar[0].name" label="歌手" width="200px">
      <template slot-scope="scope">
        <span style="width: 140px;" class="line-1 hover">{{scope.row.artists[0].name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" width="200px">
      <template slot-scope="scope">
        <span style="width: 190px;" class="line-1 hover">{{scope.row.album.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="dt" label="时长" width="140px">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 2px">{{ scope.row.duration|formatDuring }}</span>
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
      console.log("search songs:" + JSON.stringify(json));
      return json;
    }
  }
};
</script>