<template>
<transition>
  <div>
    <el-card class="box-card" body-style="padding: 0">
      <el-container class="container">
        <el-aside width="230px" class="aside">
          <side-bar />
        </el-aside>
        <el-container>
          <el-header class="header drag" height="45px">
            <top-bar></top-bar>
          </el-header>
          <el-main class="main">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer height="70px">
            <footer-view></footer-view>
          </el-footer>
        </el-container>
      </el-container>
  
    </el-card>
    </div>
</transition>
</template>

<script>
import SideBar from './sidebar/'
import TopBar from './topbar'
// import FooterView from './footer/'
import FooterView from './footer2/'
export default {
  name: 'MainPage',
  components: {
    SideBar,
    TopBar,
    FooterView
  },
  methods: {
    setting (name) {
      if (name === 'about') {
        this.dialogAbout = true
      } else if (name === 'setting') {
        this.dialogSetting = true
      }
    },
    dataReload () {}
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background: #ffff;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #d9d9d9;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #919191;
}

/* *,
*::after,
*::before {
  box-sizing: border-box;
  max-height: 999999px;
} */

html {
  background: transparent;
}

body {
  margin: 0;
  font-size: 62.5%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
  line-height: 1.15;
  background: transparent;
  
  /* background: #e9e0e0; */
}

/* .box-card {
  height: 100%;
  width: 100%;
  position:absolute;
  padding: 0;
  margin: 0;
} */

.container {
  height: 100%;
  width: 100%;
  position:absolute;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
}

.aside {
  display: flex;
  flex-direction: column;
  background: #fff;
  /* background: linear-gradient(to right, #ff9a9e, #fad0c4); */
}

.main {
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
}
.container .el-header {
  margin: 0;
  padding: 5px 10px;
  /* margin-top: 5px; */
  /* padding-top: 5px; */
  /* background: #bdbaba; */
}
.drag {
  -webkit-app-region: drag;
}
</style>
