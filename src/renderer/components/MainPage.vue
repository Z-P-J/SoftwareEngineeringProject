<template>
  <div>
    <el-card class="box-card" body-style="padding: 0">
      <el-container class="container">
        <el-aside width="230px" class="aside">
          <side-bar />
        </el-aside>
        <el-container>
          <el-header class="header">
            <top-bar class="top-bar"></top-bar>
          </el-header>
          <el-main class="main">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-divider></el-divider>
          <el-footer>
            <footer-view></footer-view>
          </el-footer>
        </el-container>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import SideBar from './sidebar/'
import TopBar from './topbar'
import FooterView from './sidebar/'
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
}

.container {
  height: 100vh;
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
.header {
  /* height: 30px; */
  /* padding: 10px; */
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
}
.top-bar {
  /* margin: 10px; */
  margin-top: 10px;
  padding-bottom: 10px;
  /* height: 30px; */
}
el-header {
  -webkit-app-region: drag;
}
</style>
