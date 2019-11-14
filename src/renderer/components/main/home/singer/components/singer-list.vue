<template>
  <div>
    <div class="class-list">
      <!-- <div
        class="class-item hover-bg"
        :class="{'active':index==activeIndex}"
        v-for="(item,index) in tags"
        :key="index"
        @click="catClick(item.id,index)"
      >{{item.name}}</div>-->
      <div>
        语种：
        <el-radio-group size="mini" v-model="language">
          <el-radio-button label="中"></el-radio-button>
          <el-radio-button label="日"></el-radio-button>
          <el-radio-button label="韩"></el-radio-button>
          <el-radio-button label="欧美"></el-radio-button>
          <el-radio-button label="其他"></el-radio-button>
        </el-radio-group>
      </div>
      <div>
        分类：
        <el-radio-group size="mini" v-model="gender">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
          <el-radio-button label="组合/乐队"></el-radio-button>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- <div>首字母
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div> -->
    </div>
    <div class="singer-list">
      <!-- <singer-item v-for="(item,index) in singers" :key="index" :item="item" /> -->
      歌手
      <el-scrollbar></el-scrollbar>
    </div>
  </div>
</template>
<script>
import SingerItem from "./singer-item.vue";
// import { singerlist } from "../../../../api";
export default {
  components: {
    SingerItem
  },
  props: {
    // cat:Number,
    // page:Number,
  },
  data() {
    return {
      tags: [
        { name: "全部歌手", id: "0" },
        { name: "入驻歌手", id: "5001" },
        { name: "华语男歌手", id: " 1001" },
        { name: "华语女歌手", id: " 1002" },
        { name: "华语组合/乐队", id: " 1003" },
        { name: "欧美男歌手", id: " 2001" },
        { name: "欧美女歌手", id: " 2002" },
        { name: "欧美组合/乐队", id: " 2003" },
        { name: "日本男歌手", id: " 6001" },
        { name: "日本女歌手", id: " 6002" },
        { name: "日本组合/乐队", id: " 6003" },
        { name: "韩国男歌手", id: " 7001" },
        { name: "韩国女歌手", id: " 7002" },
        { name: "韩国组合/乐队", id: " 7003" },
        { name: "其他男歌手", id: " 4001" },
        { name: "其他女歌手", id: " 4002" },
        { name: "其他组合/乐队", id: " 4003" }
      ],
      singers: [],
      page: 0,
      cat: 0,
      activeIndex: 0
    };
  },
  mounted() {
    this.getSingerlist();
  },
  methods: {
    getSingerlist() {
      singerlist(this.cat, this.page).then(res => {
        console.log("---singerlist ", this.page, res);
        this.singers = res.artists;
        this.page++;
      });
    },
    catClick(id, activeCat) {
      console.log("--cat ", id);
      this.cat = id;
      this.activeIndex = activeCat;
      // this.$emit('newCat')
      this.getSingerlist();
    }
  },
  watch: {
    cat(nv, ov) {
      if (nv != ov) {
        this.page = 0;
      }
    }
  }
};
</script>
<style>
.class-list {
  /* size: 20px, */
}
</style>