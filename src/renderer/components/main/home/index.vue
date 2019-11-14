<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px;">发现音乐</span>
    </el-divider>
    <!-- <p style="font-size: 25px; color: #333">发现音乐</p> -->
    <div class="div-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="a">
          <recommend-page/>
        </el-tab-pane>
        <el-tab-pane label="排行" name="b">排行</el-tab-pane>
        <el-tab-pane label="歌手" name="c">歌手</el-tab-pane>
        <el-tab-pane label="歌单" name="d">
          <song-list />
        </el-tab-pane>
        <el-tab-pane label="电台" name="e">电台</el-tab-pane>
        <el-tab-pane label="MV" name="f">MV</el-tab-pane>
        <el-tab-pane label="数字专辑" name="g">数字专辑</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import RecommendPage from "./Recommend";
import SongList from "./songlist/SongList";
export default {
  name: "home",
  components: {
    SongList,
    RecommendPage
  },
  data() {
    return {
      activeName: "a",
      tab_labels: [
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