<template>
  <div class="singer-page">
    <div class="class-list">
      <!-- <div
        class="class-item hover-bg"
        :class="{'active':index==activeIndex}"
        v-for="(item,index) in tags"
        :key="index"
        @click="catClick(item.id,index)"
      >{{item.name}}</div>-->
      <div class="language">
        <p>语种：</p>
        <el-radio-group size="mini" v-model="language">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="中"></el-radio-button>
          <el-radio-button label="日"></el-radio-button>
          <el-radio-button label="韩"></el-radio-button>
          <el-radio-button label="欧美"></el-radio-button>
          <el-radio-button label="其他"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="gender">
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
          <br>
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
      </div>
      <el-divider></el-divider>
    </div>
    <div class="singer-list">
      
      <!-- <el-scrollbar></el-scrollbar> -->
      <singer-item v-for="(item,index) in singers" :key="index" :item="item"/>
    </div>
  </div>
</template>
<script>
import SingerItem from './singer-item.vue'
// import { singerlist } from "../../../../api";
export default {
  components: {
    SingerItem
  },
  props: {
    // cat:Number,
    // page:Number,
  },
  data () {
    return {
      language: '全部',
      gender: '全部',
      initial: '热门',
      singers: [
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1',
        '歌手1'
      ],
      page: 0,
      cat: 0,
      activeIndex: 0
    }
  }
  // mounted() {
  //   this.getSingerlist();
  // },
  // methods: {
  //   getSingerlist() {
  //     singerlist(this.cat, this.page).then(res => {
  //       console.log("---singerlist ", this.page, res);
  //       this.singers = res.artists;
  //       this.page++;
  //     });
  //   },
  //   catClick(id, activeCat) {
  //     console.log("--cat ", id);
  //     this.cat = id;
  //     this.activeIndex = activeCat;
  //     // this.$emit('newCat')
  //     this.getSingerlist();
  //   }
  // },
  // watch: {
  //   cat(nv, ov) {
  //     if (nv != ov) {
  //       this.page = 0;
  //     }
  //   }
  // }
}
</script>
<style>
.singer-page{
  display: flex;
  flex-direction: column;
}
.class-list {
  display: flex;
  flex-direction: column;
}
.singer-list{
  /* padding: 0 20px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.language, .gender, .initial{
  display: flex;
}
</style>