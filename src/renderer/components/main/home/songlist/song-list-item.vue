<template>
  <el-card class="song-list-item" :body-style="{ padding: '0px' }">
    <div class="cover-wrapper">
      <img :src="this.data.coverImgUrl" class="song-list-cover"/>
      <div class="song-list-cover-hover">
        <i class="iconfont icon-iconset0481" onClick="event.cancelBubble = true"></i>
      </div>
      <div class="play-count">
        <i class="el-icon-service"></i>
        <span>{{this.data.playCount}}</span>
      </div>
    </div>
    <div class="song-list-name">
      <span>{{this.data.name}}</span>
    </div>
    <div class="song-list-creator">
      <i class="el-icon-user">{{this.data.creator.nickname}}</i>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    data: {}
  }
};
</script>

<style>
.song-list-item {
  margin: 5px;
}
.cover-wrapper {
  position: relative;
}
.cover-wrapper .song-list-cover-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.cover-wrapper .song-list-cover-hover .iconfont {
  font-size: 30px;
  color: white;
  opacity: 0;
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  transition: color 0.8s linear;
}
.song-list-cover-hover:hover {
  background: rgba(0, 0, 0, 0.3);
}
.song-list-cover-hover:hover .iconfont {
  transition: color 0.3s linear;
  opacity: 1;
  color: white;
}
.song-list-cover-hover:hover .iconfont:hover {
  color: #409eff;
}
.play-count {
  position: absolute;
  left: 8px;
  bottom: 5px;
  color: white;
  font-size: 13px;
}
.song-list-item .song-list-cover {
  width: 100%;
}
.song-list-item .song-list-name {
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: inherit;
}
.song-list-item .song-list-creator {
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 8px;
}
</style>