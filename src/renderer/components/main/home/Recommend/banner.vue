<template>
  <div class="carousel">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <div class="carousel-item-image" :style="{backgroundImage:'url('+item.picUrl+')'}" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { banner } from "../../../../api/index";
export default {
  data() {
    return {
      banner: []
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      banner().then(res => {
        console.log(res);
        this.banner = res.banners;
      });
    }
  }
};
</script>
<style>
.carousel {
  padding: 20px 40px;
}
.carousel .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.carousel .el-carousel__item .carousel-item-image {
    background-size: cover;
    width: 445px;
    height: 200px;
    background-position: 50% 50%;
}
.carousel .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.carousel .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
