<template>
  <div>
    <div class="cm-search-head">
      搜索
      <span>{{ $route.params.keywords }}</span>
      {{ nowSearchType[2] }},找到{{
      searchParams[nowSearchType[0]].count
      }}条记录
    </div>
    <el-tabs class="temp" v-model="activeName" @tab-click="tabPaneClicked">
      <el-tab-pane label="单曲" name="songs"></el-tab-pane>
      <el-tab-pane label="歌手" name="artists"></el-tab-pane>
      <el-tab-pane label="歌单" name="playlists"></el-tab-pane>
      <el-tab-pane label="专辑" name="albums"></el-tab-pane>
    </el-tabs>
    <div>
      <transition name="el-zoom-in-top">
        <songs-results
          v-if="activeName==='songs'"
          :data="searchResult.songs"
          :loading="loading"
          :page="false"
          @scroll-end="loadMore"
        ></songs-results>
        <singers-results
          v-if="activeName==='artists'"
          :data="searchResult.artists"
          :loading="loading"
        ></singers-results>
        <sheets-results
          v-if="activeName==='playlists'"
          :data="searchResult.playlists"
          :loading="loading"
        ></sheets-results>
        <albums-results v-if="activeName==='albums'" :data="searchResult.albums" :loading="loading"></albums-results>
      </transition>
    </div>
  </div>
</template>

<script>
import SongsResults from "./SongList";
import AlbumsResults from "./albums";
import SingersResults from "./singers";
import SheetsResults from "./sheets";
import { search } from "../../../api";
export default {
  name: "search-results",
  components: {
    SongsResults,
    AlbumsResults,
    SingersResults,
    SheetsResults
  },
  data() {
    return {
      activeName: "songs",
      searchType: [
        {
          name: "单曲",
          type: "songs",
          value: 1,
          active: "active"
        },
        {
          name: "歌手",
          type: "artists",
          value: 100,
          active: ""
        },
        {
          name: "歌单",
          type: "playlists",
          value: 1000,
          active: ""
        },
        {
          name: "专辑",
          type: "albums",
          value: 10,
          active: ""
        },
        {
          name: "视频",
          type: "videos",
          value: 1014,
          active: ""
        },
        {
          name: "电台",
          type: "djRadios",
          value: 1009,
          active: ""
        },
        {
          name: "用户",
          type: "userprofiles",
          value: 1002,
          active: ""
        }
      ],
      loading: false,
      nowSearchType: ["songs", 1],
      searchResult: {
        songs: [],
        artists: [],
        playlists: [],
        albums: [],
        videos: [],
        djRadios: [],
        userprofiles: []
      },
      searchParams: {
        songs: {
          page: 0,
          count: 0
        }
      }
    };
  },
  watch: {
    "$route.params.keywords": function() {
      for (let i in this.searchResult) {
        this.searchResult[i] = [];
      }
      this.searchPost(0);
    }
  },
  created() {
    this.searchType.forEach(item => {
      this.searchResult[item.type] = [];
      this.searchParams[item.type] = { page: 0, count: 0 };
    });
  },
  mounted() {
    if (this.$route.params.keywords) {
      this.changeType(this.searchType[0], 0);
      this.searchPost(0);
    }
  },
  methods: {
    tabBarSelect(item, index) {
      this.changeType(item, index, true);
    },
    tabPaneClicked(tab,event){
      console.log(this.searchType[tab.index]);
      this.changeType(this.searchType[tab.index], tab.index, true);
    },
    changeType(type, index, flag) {
      this.nowSearchType = [type.type, type.value, type.name];
      if (flag) {
        if (this.searchResult[type.type].length === 0) {
          this.searchPost(this.searchParams[type.type].page);
        }
      }
    },
    searchPost(page) {
      let type = this.nowSearchType[0];
      this.loading = page === 0;
      search(this.$route.params.keywords,this.nowSearchType[1]).then(rs => {
        console.log("rs=" + JSON.stringify(rs));
        this.loading = false;
        let data = rs.result[type] || [];
        let countType = type.substring(0, type.length - 1) + "Count"; //拼接记录总数的key
        this.searchParams[type].page = page; //记录页数
        if (page === 0) {
          this.searchParams[type].count =
            rs.result[countType] || rs.result[type + "Count"]; //获取有搜索结果长度
          this.searchResult[type] = data;
        } else {
          this.searchResult[type] = [...this.searchResult[type], ...data];
        }
      });
    },
    loadMore() {
      let type = this.nowSearchType[0];
      if (this.searchParams[type].count > this.searchResult[type].length) {
        this.searchParams[type].page++;
        this.searchPost(this.searchParams[type].page);
      }
    }
  }
};
</script>
<style>
.cm-search-head{
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
.cm-search-head span{
  color:rgb(11, 191, 236);
  padding: 0 5px;
}
</style>