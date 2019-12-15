<template>
  <div class="singer-page">
    <div class="class-list">
      <!-- <div
        class="class-item hover-bg"
        :class="{'active':index==activeIndex}"
        v-for="(item,index) in tags"
        :key="index"
        @click="catClick(item.id,index)"
      >{{item.name}}</div> -->
      <div class="language">
        <p>分类：</p>
        <el-radio-group size="mini" v-model="language" v-for="item in tags" :key="item.id" @change="toggleTab(item.id)" >
          <el-radio-button :label="item.name"></el-radio-button>
          <!-- <el-radio-button label="中"></el-radio-button>
          <el-radio-button label="日"></el-radio-button>
          <el-radio-button label="韩"></el-radio-button>
          <el-radio-button label="欧美"></el-radio-button>
          <el-radio-button label="其他"></el-radio-button> -->
        </el-radio-group>
      </div>
      <!-- <div class="gender">
        <p>分类：</p>
        <el-radio-group size="mini" v-model="gender">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
          <el-radio-button label="组合/乐队"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="initial">
        <p>首字母：</p>
        <el-radio-group size="mini" v-model="initial">
          <el-radio-button label="热门"></el-radio-button>
          <el-radio-button label="A"></el-radio-button>
          <el-radio-button label="B"></el-radio-button>
          <el-radio-button label="C"></el-radio-button>
          <el-radio-button label="D"></el-radio-button>
          <el-radio-button label="E"></el-radio-button>
          <el-radio-button label="F"></el-radio-button>
          <el-radio-button label="G"></el-radio-button>
          <el-radio-button label="H"></el-radio-button>
          <el-radio-button label="I"></el-radio-button>
          <el-radio-button label="J"></el-radio-button>
          <el-radio-button label="K"></el-radio-button>
          <el-radio-button label="L"></el-radio-button>
          <el-radio-button label="M"></el-radio-button>
          <br />
          <el-radio-button label="N"></el-radio-button>
          <el-radio-button label="O"></el-radio-button>
          <el-radio-button label="P"></el-radio-button>
          <el-radio-button label="Q"></el-radio-button>
          <el-radio-button label="R"></el-radio-button>
          <el-radio-button label="S"></el-radio-button>
          <el-radio-button label="T"></el-radio-button>
          <el-radio-button label="U"></el-radio-button>
          <el-radio-button label="V"></el-radio-button>
          <el-radio-button label="W"></el-radio-button>
          <el-radio-button label="X"></el-radio-button>
          <el-radio-button label="Y"></el-radio-button>
          <el-radio-button label="Z"></el-radio-button>
          <el-radio-button label="#"></el-radio-button>
        </el-radio-group>
      </div> -->
      <el-divider></el-divider>
    </div>
    <div class="singer-list">
      <!-- <el-scrollbar></el-scrollbar> -->
      <singer-item v-for="(item,index) in singers" :key="index" :item="item" />
    </div>
  </div>
</template>
<script>
import SingerItem from "./singer-item.vue";
import { singerlist } from "../../../../../api";
export default {
  components: {
    SingerItem
  },
  // props: {
  //   cat:Number,
  //   page:Number,
  // },
  data() {
    return {
      language: "全部",
      gender: "全部",
      initial: "热门",
      singers: [
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1",
        "歌手1"
      ],
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
        console.log("---singerlist  ", this.page, JSON.stringify(res));
        this.singers = res.artists;
        this.page++;
      });
    },
    toggleTab(id, activeCat) {
      console.log("--cat ", id);
      this.cat = id;
      this.activeIndex = activeCat;
      this.$emit("newCat");
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
.singer-page {
  display: flex;
  flex-direction: column;
}
.class-list {
  display: flex;
  flex-direction: column;
}
.singer-list {
  /* padding: 0 20px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.language,
.gender,
.initial {
  display: flex;
}
</style>