<template>
  <div class="song-list">
    <el-select v-model="value" placeholder="全部歌单" size="mini" @change="onSelect()">
      <el-option v-for="(item, index) in tags" :key="index" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-col style="margin: 5px;">
      热门标签：
      <el-tag
        v-for="(item, pos) in tags"
        :key="pos"
        type="info"
        size="mini"
        style="margin: 5px;"
        @click="onTagClick(item.name)"
      >{{item.name}}</el-tag>
    </el-col>
    <el-dropdown>
      <!-- <span class="el-dropdown-link" slot="reference">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>-->

      <!-- <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-button slot="reference" class="el-icon-arrow-down el-icon--right" size="mini">hover 激活</el-button>
      </el-popover>-->
    </el-dropdown>
    <el-row :gutter="15" class="mt-10">
      <el-col :span="6" v-for="(item,index) in songlist" :key="index" @click.native="showSongListDetail(item.id)">
        <song-list-item :data="item"></song-list-item>
      </el-col>
    </el-row>
    <el-col class="pagination">
      <el-pagination  :page-size="30" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
    </el-col>
  </div>
</template>

<script>
import {
  getPlaylistHot,
  getTopPlaylistHighquality
} from "../../../../api/index";
import SongListItem from "./song-list-item";
export default {
  components: {
    SongListItem
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      tags: [],
      songlist: [],
      value: "全部"
    };
  },
  mounted() {
    this.getTags();
    this.getList();
  },
  methods: {
    getTags() {
      getPlaylistHot().then(res => {
        console.log("getPlaylistHot res=" + JSON.stringify(res));
        this.tags = res.tags;
      });
    },
    getList() {
      var that = this;
      getTopPlaylistHighquality(that.value, 40).then(res => {
        console.log("getTopPlaylistHighquality res=" + JSON.stringify(res));
        that.songlist = res.playlists;
      });
    },
    onTagClick(name) {
      this.value = name;
      this.getList();
    },
    onSelect() {
      console.log("onSelect value=" + this.value);
      this.getList();
      // this.songlist = [];
    },
    showSongListDetail(id) {
      this.$router.push({ name: "songlist", query: { id: id } });
    }
  }
};
</script>

<style>
.song-list .pagination {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>