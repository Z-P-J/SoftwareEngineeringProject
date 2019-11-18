<template>
  <div>
    <el-tabs class="temp" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="songs"></el-tab-pane>
      <el-tab-pane label="歌手" name="singers"></el-tab-pane>
      <el-tab-pane label="专辑" name="albums"></el-tab-pane>
      <el-tab-pane label="歌单" name="sheets"></el-tab-pane>
    </el-tabs>
    <div>
      <transition name="el-zoom-in-top">
      <songs-results v-if="activeName==='songs'"></songs-results>
      <singers-results v-if="activeName==='singers'"></singers-results>
      <albums-results v-if="activeName==='albums'"></albums-results>
      <sheets-results v-if="activeName==='sheets'"></sheets-results>
      </transition>
    </div>
  </div>
</template>

<script>
import SongsResults from "./songs";
import AlbumsResults from "./albums";
import SingersResults from "./singers";
import SheetsResults from "./sheets";
export default {
  name: "search-results",
  components: {
    SongsResults,
    AlbumsResults,
    SingersResults,
    SheetsResults
  },
  data() {
    return {
      activeName: "songs"
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
</style>