<template>
  <el-table :data="data" stripe style="width: 100%;" ref="multipleTable" tooltip-effect="dark">
    <el-table-column label="歌手">
      <template slot-scope="scope" class="searchArtist">
        <img :src="scope.row.picUrl || scope.row.img1v1Url" alt="" draggable="false" class="artistPic"/>
        <span class="artistName">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "SingersResults",
  props: {
    data: Array,
    type: String,
    loading: Boolean
  }
};
</script>
<style>
.searchArtist{
  display: flex;
  align-items: center;
}
.artistPic{
  width: 40px;
  height: 40px;
}
.artistName{
  margin-left: 10px;
}
</style>