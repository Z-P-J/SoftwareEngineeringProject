<template>
  <!-- <div class="personalized">
        <div class="title">为你推荐歌单</div>
        <div class="class-list mt-5">
            <div class="class-item hover-bg" v-for="item in class_list" :key="item">{{item}}</div>
        </div>
        <el-row :gutter="15" class="mt-10">
            <el-col :span="20" v-for="(item,index) in personalized" :key="index">
                <personalized-item :item="item"  />
            </el-col>
        </el-row>
  </div>-->
  <div class="recommand-songlist" style="padding-top: 20px;">
    <el-divider content-position="left">
      <span style="font-size: 25px;">推荐歌单</span>
    </el-divider>
    <el-row :gutter="15" class="mt-10">
      <el-col :span="6" v-for="(item, index) in personalized" :key="index" @click.native="onCardClick(item.id)">
        <el-card
          :body-style="{ padding: '0px' }"
          style="margin: 5px; height: 250px;"
        >
          <img :src="item.picUrl" class="image" />
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
          </div>
          <!-- <div style="padding-right: 14px; padding-left: 14px; padding-bottom: 14px;">
              <i class="el-icon-user">用户名</i>
          </div>-->
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
.image {
  width: 100%;
  display: block;
}
</style>
