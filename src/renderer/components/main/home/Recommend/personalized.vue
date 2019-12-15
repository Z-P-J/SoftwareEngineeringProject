<template>
  
  <div class="recommand-songlist" style="padding-top: 20px;">
    <el-divider content-position="left">
      <span style="font-size: 25px;">推荐歌单</span>
    </el-divider>
    <el-row :gutter="10" class="mt-10">
      <el-col :span="4" v-for="(item, index) in personalized" :key="index" @click.native="onCardClick(item.id)">
        <el-card
          :body-style="{ padding: '0px' }"
          style="margin-top: 10px; height: 230px;"
        >
          <img :src="item.picUrl" class="image" />
          <div style="padding: 14px;">
            <span class="line-1">{{item.name}}</span>
          </div>
          <div style="padding-right: 14px; padding-left: 14px; padding-bottom: 14px;">
            <span style="font-size: 12px;">{{item.copywriter}}</span>
              <!-- <i class="el-icon-user line-1">{{item.copywriter}}</i> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { personalized } from "../../../../api";
import PersonalizedItem from "./personalized-item";

export default {
  components: {
    PersonalizedItem
  },
  data() {
    return {
      personalized: [],
      class_list: [
        "情歌",
        "网络歌曲",
        "经典",
        "KTV热歌",
        "背景音乐",
        "伤感",
        "英语",
        "国语",
        "全部分类"
      ]
    };
  },
  mounted() {
    this.getPersonalized();
  },
  methods: {
    getPersonalized() {
      personalized().then(res => {
        this.personalized = res.result;
        console.log(JSON.stringify(res.result));
      });
    },
    onCardClick(id) {
      this.$router.push({ name: "songlist", query: { id: id } });
    }
  }
};
</script>

<style>
.recommand-songlist .image {
  width: 100%;
  display: block;
}
.line-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
}
</style>
