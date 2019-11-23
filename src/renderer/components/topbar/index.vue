<template>
  <div class="header-view">
    <div class="left-icon">
      <el-row type="flex" justify="start">
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="back">
            <i class="btn el-icon-arrow-left"></i>
          </el-button>
        </el-col>
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="forward">
            <i class="btn el-icon-arrow-right"></i>
          </el-button>
        </el-col>
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="refresh">
            <i class="btn el-icon-refresh"></i>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle-icon">
      <el-autocomplete
        class="search no-drag"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        @keyup.enter.native="search"
        prefix-icon="el-icon-search"
        placeholder="搜索音乐、MV、歌单、用户"
        clearable
        :trigger-on-focus="false"
        size="mini"
      ></el-autocomplete>
    </div>
    <div class="right-icon">
      <el-row type="flex" justify="end" offset="2">
        <el-col>
          <el-dropdown>
            <el-button class="no-drag" type="text" size="mini" @click="more">
              <i class="btn el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>2</el-dropdown-item>
              <el-dropdown-item>3</el-dropdown-item>
              <el-dropdown-item>4</el-dropdown-item>
              <el-dropdown-item>5</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="minimize">
            <i class="btn el-icon-minus"></i>
          </el-button>
        </el-col>
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="fullScreen">
            <i class="btn el-icon-copy-document"></i>
          </el-button>
        </el-col>
        <el-col offset="2">
          <el-button class="no-drag" type="text" size="mini" @click="close">
            <i class="btn el-icon-close"></i>
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      restaurants: [],
      state: '',
      timeout: null
    }
  },
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
    },
    loadAll () {
      return [
        { value: '1111111111111111111', address: 'xxxxxxxxxxxxxxxxxx' },
        {
          value: '222222222222222222222',
          address: 'yyyyyyyyyyyyyyyyyyyyyyy'
        },
        {
          value: '333333333333333333333',
          address: 'zzzzzzzzzzzzzzzzzzzzzzz'
        }
      ]
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return input => {
        return (
          input.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        )
      }
    },
    handleSelect (item) {
      console.log(item)
      console.log(1111)
    },
    search () {
      this.$router.push({
        path: '/searchResults',
        query: {
          state: this.state
        }
      })
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>

<style>
.no-drag {
  -webkit-app-region: no-drag;
}
.search .el-input__inner {
  /* border: 1px solid #c5c5c5; */
  border: none;
  border-radius: 20px;
  background: #f4f4f4;
  color: #8c8c8c;
}
.btn {
  font-size: 17px;
  color: #333;
}
.btn:hover {
  color: #31c27c;
}
.header-view {
  height: 45;
  padding: 0;
  margin: 0;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* flex: auto; */
}
.middle-icon {
  /* display: flex;
  align-self: middle; */
  margin-top: 5px;
}
</style>