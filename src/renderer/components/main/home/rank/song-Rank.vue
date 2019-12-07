<template>
  <div class="song-rank" style="border-radius: 2px">
    <el-divider content-position="left">
      <span style="font-size: 15px;">官方榜</span>
    </el-divider>
    <el-row>
      <el-col :span="6" v-for="(item, index) in list1" :key="index" @click.native="showDetail(item)">
        <rank-item :id="item"></rank-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      <span style="font-size: 15px;">全球榜</span>
    </el-divider>
    <el-row :gutter="15" class="mt-10">
      <el-col :span="6" v-for="(item,index) in list2" :key="index" @click.native="showDetail(item)">
        <rank-item :id="item"></rank-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RankItem from "./song-rank-item";
export default {
  data() {
    return {
      list1: [0, 1, 2, 3, 4, 5, 6, 7],
      list2: [8, 9, 16, 17, 18, 20, 21, 22]
    };
  },
  components: {
    RankItem
  },
  methods: {
    showDetail(id) {
      this.$router.push({ name: "songlist", query: { id: id } });
    }
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
