<template>
  <el-table :data="data" stripe @row-click="clickToSelect" style="width: 100%;cursor: pointer;">
    <el-table-column>
      <template slot-scope="scope">
        <img :src="scope.row.coverImgUrl || scope.row.picUrl" draggable="false" class="playListPic" />
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <div class="count">{{ scope.row.trackCount }}首</div>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <div class="creator">by {{ scope.row.creator.nickname }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "SheetsResults",
  props: {
    data: Array,
    type: String,
    loading: Boolean
  },
  methods:{
    clickToSelect(row, column, event) {
      this.$router.push({ name: "songlist", query: { id: row.id } });
    },
  }
};
</script>
<style>
.playListPic {
  width: 50px;
  height: 50px;
}
</style>