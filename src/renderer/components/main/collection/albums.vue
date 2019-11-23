<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      prop="name">
    </el-table-column>
    <el-table-column
      prop="singer">
    </el-table-column>
    <el-table-column
      prop="num"
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'AlbumsList',
  data () {
    return {
      tableData: [
        {name: '范特西', singer: '周杰伦', num: 10},
        {name: '依然范特西', singer: '周杰伦', num: 10}
      ],
      search: ''
    }
  }
}
</script>
<style>
.album-page {
  display: flex;
  flex-direction: column;
}
</style>