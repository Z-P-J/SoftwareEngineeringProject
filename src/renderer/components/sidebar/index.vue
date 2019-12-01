<template>
  <!-- TODO 新建歌单，导入本地歌曲 -->
  <div class="side-bar" style="padding: 10dp">
    <div class="user-info drag">
      <div class="avatar no-drag" @click="login" style="margin: 10px">
        <img src="../../assets/max.png" />
      </div>
      <el-row>
        <el-tooltip class="item no-drag" effect="dark" content="编辑用户信息" placement="bottom">
          <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item no-drag" effect="dark" content="用户消息" placement="bottom">
          <el-button type="info" icon="el-icon-message" size="small" circle></el-button>
        </el-tooltip>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/local">
        <i class="el-icon-document"></i>
        <span slot="title">本地音乐</span>
      </el-menu-item>
      <el-menu-item index="/download">
        <i class="el-icon-download"></i>
        <span slot="title">下载音乐</span>
      </el-menu-item>
      <el-menu-item index="/collection">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="/recentPlay">
        <i class="el-icon-s-data"></i>
        <span slot="title">最近播放</span>
      </el-menu-item>
      <el-submenu index="6" id="created_song_list">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>创建的歌单</span>
        </template>
        <el-menu-item @click="createSongList()">
          <span>
            <i class="el-icon-folder-add"></i>新建歌单
          </span>
        </el-menu-item>

        <el-menu-item v-for="(item, pos) in mySongList" :key="pos" :index="'my-' + pos" @click="showSongListDetail(pos)">
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="7" id="starred_song_list">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>收藏的歌单</span>
        </template>
        <el-menu-item
          v-for="(item, pos) in starSongList"
          :key="pos"
          :index="'star-' + pos"
          @click="showStarSongListDetail(pos)"
        >{{item.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      mySongList: [
        { name: '歌单1' },
        { name: '歌单2' },
        { name: '歌单3' },
        { name: '歌单4' },
        { name: '歌单5' },
        { name: '歌单6' },
        { name: '歌单7' }
      ],
      starSongList: [
        { name: '歌单1' },
        { name: '歌单2' },
        { name: '歌单3' },
        { name: '歌单4' },
        { name: '歌单5' },
        { name: '歌单6' },
        { name: '歌单7' }
      ]
    }
  },
  methods: {
    login () {},
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    createSongList () {
      this.$prompt('请输入歌单名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.mySongList.push({ name: value })
          this.$message({
            type: 'success',
            message: '新建歌单成功'
          })
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "取消输入"
          // });
        })
    },
    showSongListDetail (pos) {
      // this.$router.push({ path: '/songlist' + pos, query: { userId: 123 }});
      // this.$router.push({ name: 'songlist', params: { index: this.songList[pos], position: pos }})
      // this.$message({
      //   message: "成功！" + this.$route.name + " " + this.$route.path + " " + this.$route.params,
      //   type: "success"
      // });
      // this.$router.push({ path: `/songlist#` + this.mySongList[pos].name })
      this.$router.push({name: 'songlist', query: {id: pos}})
    },
    showStarSongListDetail (pos) {
      // this.$router.push({ path: `/songlist#` + this.starSongList[pos].name })
      this.$router.push({name: 'songlist', query: {id: pos}})
    },
    deleteSongList (i) {
      this.mySongList.splice(i, 1)
    }
  }
}
</script>

<style>
.user-info {
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