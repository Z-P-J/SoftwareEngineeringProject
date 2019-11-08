<template>
  <div>
    <el-container class="container" id="main">
      <el-aside width="230px" class="aside">
        <side-bar />
      </el-aside>
      <el-container>
        <el-dropdown @command="setting" style="float: right">
          <span class="el-dropdown-link">
            <i style="font-size: 22px" class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="about">关于</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog @closed="dataReload" title="设置" :visible.sync="dialogAbout" width="40%">
          <div>关于弹窗</div>
        </el-dialog>
        <el-dialog @closed="dataReload" title="设置" :visible.sync="dialogSetting" width="40%">
          <div>设置弹窗</div>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "../components/sidebar/";
export default {
  name: "MainPage",
  components: {
    SideBar
  },
  data() {
    return {
      dialogSetting: false,
      dialogAbout: false
    };
  },
  methods: {
    setting(name) {
      if (name === "about") {
        this.dialogAbout = true;
      } else if (name === "setting") {
        this.dialogSetting = true;
      }
    }
  }
};
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

*,
*::after,
*::before {
  box-sizing: border-box;
  max-height: 999999px;
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
</style>
