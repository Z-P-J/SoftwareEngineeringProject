<template>
  <div>
    <el-row class="top-bar" type="flex" justify="space-between">
      <el-col class="left" span="6">
        <div>
          <el-button class="no-drag" icon="el-icon-arrow-left" circle size="small" @click="back"></el-button>
          <el-button class="no-drag" icon="el-icon-arrow-right" circle size="small" @click="forward"></el-button>
          <el-button class="no-drag" icon="el-icon-refresh" circle size="small" @click="refresh"></el-button>
        </div>
      </el-col>
      <el-col class="search" span="6">
        <el-input
          class="search no-drag"
          prefix-icon="el-icon-search"
          placeholder="搜索音乐、MV、歌单、用户"
          clearable
          size="small"
        ></el-input>
      </el-col>
      <el-col class="right" span="6">
        <el-row type="flex" justify="end">
          <el-col span="4">
            <el-dropdown>
              <el-button class="no-drag" icon="el-icon-arrow-down" circle size="small" @click="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>1</el-dropdown-item>
                <el-dropdown-item>2</el-dropdown-item>
                <el-dropdown-item>3</el-dropdown-item>
                <el-dropdown-item>4</el-dropdown-item>
                <el-dropdown-item>5</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col span="4">
            <el-button class="no-drag" icon="el-icon-minus" circle size="small" @click="minimize"></el-button>
          </el-col>
          <el-col span="4">
            <el-button class="no-drag" icon="el-icon-copy-document" circle size="small" @click="fullScreen"></el-button>
          </el-col>
          <el-col span="4">
            <el-button class="no-drag" icon="el-icon-close" circle size="small" @click="close"></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    close () {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$electron.ipcRenderer.send('close')
        })
        .catch(() => {})
    },
    minimize () {
      this.$electron.ipcRenderer.send('minimize')
    },
    back () {
      if (this.$route.name !== 'music') {
        this.$router.go(-1)
      }
    },
    forward () {
      this.$router.go(1)
    },
    refresh () {
      this.$bus.$emit('page-refresh', this.$route.name)
    }
  }
}
</script>

<style>
.search {
  border-radius: 30px;
}
.no-drag {
  -webkit-app-region: no-drag;
}
</style>