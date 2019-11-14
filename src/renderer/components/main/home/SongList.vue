<template>
  <div class="song-list">
    <el-select v-model="value" placeholder="全部歌单" size="mini">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-col style="margin: 5px;">
      热门标签：
      <el-tag
        v-for="(item, pos) in tags"
        :key="pos"
        type="info"
        size="mini"
        style="margin: 5px;"
      >{{item}}</el-tag>
    </el-col>
    <el-row :gutter="15" class="mt-10">
      <el-col :span="6" v-for="(item,index) in songlist" :key="index">
        <el-card :body-style="{ padding: '0px' }" style="margin: 5px;">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{item}}</span>
          </div>
          <div style="padding-right: 14px; padding-left: 14px; padding-bottom: 14px;">
            <i class="el-icon-user">用户名</i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-col>
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
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
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tags: [
        "华语",
        "欧美",
        "摇滚",
        "电子",
        "轻音乐",
        "R&B",
        "怀旧",
        "影视原声"
      ],
      songlist: [
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语",
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语",
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语"
      ],
      value: ""
    };
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>