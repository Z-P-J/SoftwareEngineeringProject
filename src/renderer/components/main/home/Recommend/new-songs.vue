<template>
  <div class="new">
    <el-divider content-position="left">
      <span style="font-size: 25px;">最新音乐</span>
    </el-divider>
    <div class="tag-list mt-5" style="padding: 10px">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
      <el-tag type="danger">标签五</el-tag>
      <el-tag type="danger">标签五</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </div>
    <el-row :gutter="20" class="mt-10">
      <el-col :span="6" v-for="(item,index) in newSongs" :key="index" >
        <el-card :body-style="{ padding: '0px' }" style="margin-top: 10px;">
          <img :src="item.song.album.picUrl" class="image" />
          <div style="padding: 14px;">
            <!-- <span class="iconfont icon-yinle2 line1">{{item.name}}</span> -->
            <i class="iconfont icon-yinle2 line-1">{{item.name}}</i>
          </div>
          <div style="padding-right: 14px; padding-left: 14px; padding-bottom: 14px;">
            <i class="iconfont icon-yinleren line-1">{{getArtists(item)}}</i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {newSong} from "../../../../api/index";
export default {
  data() {
    return {
      id: "",
      newSongs: [],
      class_list: [
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语",
        "全部分类"
      ]
    };
  },
  mounted() {
    this.getNewSong();
  },
  activated() {
    this.getNewSong();
  },
  methods: {
    getNewSong() {
      newSong().then(res => {
        console.log(res);
        this.newSongs = res.result;
      });
    },
    getArtists(item) {
      let artists = "";
      let arr = item.song.artists;
      for (let i = 0; i < arr.length; i++) {
        if (artists != "") {
          artists += ",";
        }
        artists += arr[i].name;
      }
      return artists;
    },
    itemClick() {}
  }
};
</script>

<style>
.new .image {
    width: 100%;
}
.new .line-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
}
</style>