<template>
  <div class="collection-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专辑" name="albums"></el-tab-pane>
      <el-tab-pane label="歌手" name="singers"></el-tab-pane>
      <el-tab-pane label="视频" name="videos"></el-tab-pane>
    </el-tabs>
    <div>
      <!-- <albums-list v-if="activeName===albums"></albums-list> -->
      <transition name="el-zoom-in-top">
        <albums-list v-if="activeName==='albums'"></albums-list>
        <singers-list v-if="activeName==='singers'"></singers-list>
        <videos-list v-if="activeName==='videos'"></videos-list>
      </transition>
    </div>
  </div>
</template>
<script>
import VideosList from "./videos";
import AlbumsList from "./albums";
import SingersList from "./singers";
export default {
  name: "collection",
  components: {
    AlbumsList,
    VideosList,
    SingersList
  },
  data() {
    return {
      activeName: "albums"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.collection-page {
  display: flex;
  flex-direction: column;
}
</style>