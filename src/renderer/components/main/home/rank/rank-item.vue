<template>
  <el-card class="rank-item" :body-style="{ padding: '0px' }" style="margin: 5px;">
    <img :src="rankData.coverImgUrl" class="image" />
    <div class="right">
      <div v-for="(item,index) in rankData.tracks.slice(0,3)" :key="index">
        <div class="song-item">
          {{index+1}} {{item.name}}
          <span class="gray">- {{item.ar[0].name}}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { toplist } from "../../../../api/index";
export default {
  props: {
    id: Number
  },
  data() {
    return {
      rankData: {}
    };
  },
  mounted() {
    this.getTopList(this.id);
  },
  methods: {
    getTopList(id) {
      toplist(id).then(res => {
        console.log(res);
        this.rankData = res.playlist;
      });
    }
  }
};
</script>

<style>
.rank-item .right {
  padding: 15px;
  line-height: 2;
  font-size: 14px;
  overflow: hidden;
}
.rank-item .right .song-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rank-item .right .song-item:hover {
  cursor: pointer;
}
.rank-item .right .gray {
  color: #666;
}
</style>