<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px;">发现音乐</span>
    </el-divider>
    <!-- <p style="font-size: 25px; color: #333">发现音乐</p> -->
    <div class="div-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="a">
          <el-scrollbar>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
            <div class="test">
              <el-row>
                <el-button class="nav-button" icon="el-icon-search" circle></el-button>
                <el-button class="nav-button" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button class="nav-button" type="success" icon="el-icon-check" circle></el-button>
                <el-button class="nav-button" type="info" icon="el-icon-message" circle></el-button>
                <el-button class="nav-button" type="warning" icon="el-icon-star-off" circle></el-button>
                <el-button class="nav-button" type="danger" icon="el-icon-delete" circle></el-button>
              </el-row>
            </div>
            <div class="new">
              <el-divider content-position="left">
                <span style="font-size: 25px;">最新音乐</span>
              </el-divider>
              <div class="class-list mt-5" style="padding: 10px">
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
                <el-tag type="danger">标签五</el-tag>
                <el-tag type="danger">标签五</el-tag>
                <el-tag type="danger">标签五</el-tag>
              </div>
              <el-row :gutter="15" class="mt-10">
                <el-col :span="6" v-for="(item,index) in newMusics" :key="index">
                  <el-card style="margin: 5px; padding: 30px">{{item}}</el-card>
                </el-col>
              </el-row>
            </div>
            <div class="recommand-songlist" style="padding-top: 20px;">
              <el-divider content-position="left">
                <span style="font-size: 25px;">推荐歌单</span>
              </el-divider>
              <el-row :gutter="15" class="mt-10">
                <el-col :span="6" v-for="(item,index) in songlist" :key="index">
                  <el-card style="margin: 5px; padding: 30px">{{item}}</el-card>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="排行" name="b">
          <song-ranking></song-ranking>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="c">歌手</el-tab-pane>
        <el-tab-pane label="歌单" name="d">歌单</el-tab-pane>
        <el-tab-pane label="电台" name="e">电台</el-tab-pane>
        <el-tab-pane label="MV" name="f">MV</el-tab-pane>
        <el-tab-pane label="数字专辑" name="g">数字专辑</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SongRanking from "./SongRanking";
export default {
  name: "home",
  components: {
    SongRanking
  },
  data() {
    return {
      
      activeName: "a",
      newMusics: [
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语"
      ],
      songlist: [
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语"
      ],
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
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test.nav-button {
  margin: 15px;
}

.div-tabs {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: column;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
  padding: 0;
}
.el-tabs__nav-wrap::after {
  display: none;
}
.el-tabs__item {
  font-size: 14px;
}
</style>