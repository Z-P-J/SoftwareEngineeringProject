<template>
  <el-card class="rank-item" :body-style="{ padding: '0px' }" style="margin: 5px;">
    <div class="cover-wrapper">
      <img :src="rankData.coverImgUrl" class="rank-item-cover" />
      <div class="rank-item-cover-hover">
        <i class="iconfont icon-iconset0481" @click="playClick" onClick="event.cancelBubble = true"></i>
      </div>
      <div class="play-count">
        <i class="el-icon-service"></i>
        <span>{{parseInt(rankData.playCount / 10000)}}万</span>
      </div>
    </div>
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
.cover-wrapper {
  position: relative;
}
.cover-wrapper .rank-item-cover-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.cover-wrapper .rank-item-cover-hover .iconfont {
  font-size: 30px;
  color: white;
  opacity: 0;
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  transition: color 0.8s linear;
}
.rank-item-cover-hover:hover {
  background: rgba(0, 0, 0, 0.3);
}
.rank-item-cover-hover:hover .iconfont {
  transition: color 0.3s linear;
  opacity: 1;
  color: white;
}
.rank-item-cover-hover:hover .iconfont:hover {
  color: #409eff;
}
.play-count {
  position: absolute;
  left: 8px;
  bottom: 5px;
  color: white;
  font-size: 13px;
}
.rank-item .rank-item-cover {
  width: 100%;
}
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