<template>
  <div>
    <el-divider content-position="left">
      <span style="font-size: 25px;">发现音乐</span>
    </el-divider>
    <!-- <p style="font-size: 25px; color: #333">发现音乐</p> -->
    <div class="div-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="推荐" name="a">
          <recommend-page/>
        </el-tab-pane>
        <el-tab-pane label="排行" name="b">
          <song-rank></song-rank>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="c">
          <singer/>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="d">
          <song-list />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
import RecommendPage from './Recommend/index'
import Singer from './singer/'
import SongList from './songlist/song-list'
import SongRank from './rank/song-rank'
export default {
  name: 'home',
  components: {
    SongList,
    Singer,
    RecommendPage,
    SongRank
  },
  data () {
    return {
      activeName: 'a'
    }
  }
}
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