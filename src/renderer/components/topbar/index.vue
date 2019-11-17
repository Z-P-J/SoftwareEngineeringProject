<template>
  <div>
    <el-row class="top-bar" type="flex" justify="space-between">
      <el-col class="left" span="6">
        <div>
          <el-col span="4">
            <el-button
              class="no-drag"
              icon="el-icon-arrow-left"
              circle
              type="text"
              size="medium"
              @click="back"
            ></el-button>
          </el-col>
          <el-col span="4">
            <el-button
              class="no-drag"
              icon="el-icon-arrow-right"
              circle
              type="text"
              size="medium"
              @click="forward"
            ></el-button>
          </el-col>
          <el-col span="4">
            <el-button
              class="no-drag"
              icon="el-icon-refresh"
              circle
              type="text"
              size="medium"
              @click="refresh"
            ></el-button>
          </el-col>
        </div>
      </el-col>
      <el-col class="search" span="8">
        <el-autocomplete
          class="search no-drag"
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
          @keyup.enter.native="search"
          prefix-icon="el-icon-search"
          placeholder="搜索音乐、MV、歌单、用户"
          clearable
          size="mini"
        ></el-autocomplete>
      </el-col>
      <el-col class="right" span="6">
        <el-row type="flex" justify="end">
          <el-col span="4">
            <el-dropdown>
              <el-button
                class="no-drag"
                icon="el-icon-arrow-down"
                circle
                type="text"
                size="medium"
                @click="more"
              ></el-button>
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
            <el-button
              class="no-drag"
              icon="el-icon-minus"
              circle
              type="text"
              size="medium"
              @click="minimize"
            ></el-button>
          </el-col>
          <el-col span="4">
            <el-button
              class="no-drag"
              icon="el-icon-copy-document"
              circle
              type="text"
              size="medium"
              @click="fullScreen"
            ></el-button>
          </el-col>
          <el-col span="4">
            <el-button
              class="no-drag"
              icon="el-icon-close"
              circle
              type="text"
              size="medium"
              @click="close"
            ></el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null
    };
  },
  methods: {
    close() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$electron.ipcRenderer.send("close");
        })
        .catch(() => {});
    },
    minimize() {
      this.$electron.ipcRenderer.send("minimize");
    },
    back() {
      if (this.$route.name !== "music") {
        this.$router.go(-1);
      }
    },
    forward() {
      this.$router.go(1);
    },
    refresh() {
      this.$bus.$emit("page-refresh", this.$route.name);
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return input => {
        return (
          input.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      console.log(1111);
     
    },
    search(){
      this.$router.push({
        path:'/searchResults',
        query:{
          state:this.state,
        }
      })
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style>
.no-drag {
  -webkit-app-region: no-drag;
}
</style>