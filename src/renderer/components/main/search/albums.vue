<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column>
      <template slot-scope="scope">
        <img :src="scope.row.picUrl" draggable="false" class="albumPic" />
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <div class="creator">{{ scope.row.artists[0].name }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AlbumsResults',
  props: {
    data: Array,
    type: String,
    loading: Boolean
  }
}
</script>
<style>
.albumPic {
  width: 50px;
  height: 50px;
}
</style>