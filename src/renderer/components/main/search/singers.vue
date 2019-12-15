<template>
  <el-table :data="data" stripe style="width: 100%;" ref="multipleTable" tooltip-effect="dark">
    <el-table-column class="searchArtist">
      <template slot-scope="scope">
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
  width: 50px;
  height: 50px;
}
.artistName{
  margin-left: 10px;
}
</style>