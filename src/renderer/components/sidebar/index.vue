<template>
  <div class="side-bar">
    <el-scrollbar class="menu-view scroll-page">
      <div class="user-info">
        <div>
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <div class="avatar no-drag" @click="login">
          <img src="../../assets/max.png" />
        </div>
        <div class="mt-5">
          <el-button
            style="color: #67C23A;"
            type="text"
            class="no-drag"
            size="mini"
            @click="login"
          >立即登录</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">本地音乐</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-download"></i>
          <span slot="title">下载音乐</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-star-off"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-data"></i>
          <span slot="title">最近播放</span>
        </el-menu-item>
        <el-submenu index="6" id="created_song_list">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>创建的歌单</span>
            <!-- <i class="el-icon-plus"></i> -->
          </template>
          <el-menu-item index="6-1" @click="createSongList">
            <i class="el-icon-folder-add"></i>
            新建歌单
          </el-menu-item>
          <el-menu-item index="6-2" style="display: none">
            <el-input placeholder="请输入歌单名" v-model="input" autocomplete="off">
              <i class="el-icon-folder-add"></i>
            </el-input>
          </el-menu-item>
          <el-menu-item v-for="(item, pos) in createdSongList" v-bind:key="item.index" :index="item.index">歌单{{pos}}</el-menu-item>
          <!-- <el-menu-item index="6-2">歌单1</el-menu-item>
          <el-menu-item index="6-3">歌单2</el-menu-item>
          <el-menu-item index="6-4">歌单3</el-menu-item>
          <el-menu-item index="6-5">歌单4</el-menu-item>
          <el-menu-item index="6-6">歌单5</el-menu-item>
          <el-menu-item index="6-7">歌单6</el-menu-item>
          <el-menu-item index="6-8">歌单7</el-menu-item> -->
        </el-submenu>
        <el-submenu index="7" id="starred_song_list">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>收藏的歌单</span>
          </template>
          <el-menu-item index="7-1">歌单0</el-menu-item>
          <el-menu-item index="7-2">歌单1</el-menu-item>
          <el-menu-item index="7-3">歌单2</el-menu-item>
          <el-menu-item index="7-4">歌单3</el-menu-item>
          <el-menu-item index="7-5">歌单4</el-menu-item>
          <el-menu-item index="7-6">歌单5</el-menu-item>
          <el-menu-item index="7-7">歌单6</el-menu-item>
          <el-menu-item index="7-8">歌单7</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "输入",
      createdSongList: [
        { index: "6-3" },
        { index: "6-4" },
        { index: "6-5" },
        { index: "6-6" },
        { index: "6-7" },
        { index: "6-8" },
        { index: "6-9" }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    createSongList() {
      this.$message({
        message: "新建歌单成功！",
        type: "success"
      });
    }
  }
};
</script>

<style>
.scroll-page {
  overflow: hidden;
  margin: 0;
}

.side-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.aside-view {
  flex: 1;
  display: flex;
}

.menu-view {
  flex: 1;
  overflow: hidden;
}

.menu-group {
  margin-bottom: 25px;
  padding: 0 20px;
}

.menu-title {
  margin-bottom: 10px;
  font-size: 12px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  color: #666;
}

.menu-title .left {
  flex: 1;
}

.menu-title .right {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.menu-title .right .iconfont {
  font-size: 14px;
  color: #888;
  margin-left: 10px;
}

.menu-item {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 2px;
  margin-bottom: 5px;
  cursor: pointer;
}

.menu-item .left .iconfont {
  margin-right: 10px;
}

.menu-item .left .iconfont .hot {
  color: #ff4400;
}

.menu-item:hover {
  background: #e6e7e7;
}

.menu-item.active {
  background: #4285f4;
  color: #fff;
}

.user-info {
  -webkit-app-region: drag;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info .avatar {
  width: 50px;
  height: 50px;
}

.user-info .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
}
</style>