<template>
  <div class="recommend-page">
    <banner />
    <div class="test">
      <el-row>
        <el-button class="nav-button" icon="el-icon-search" circle></el-button>
        <el-button class="nav-button" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button class="nav-button" type="success" icon="el-icon-check" circle></el-button>
        <el-button class="nav-button" type="info" icon="el-icon-message" circle></el-button>
        <el-button class="nav-button" type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button class="nav-button" type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
    </div>
    <personalized />
    <new-songs />
  </div>
</template>

<script>
import Banner from "./banner";
import Personalized from "./personalized";
import newSongs from "./new-songs";
export default {
  components: {
    Banner,
    Personalized,
    newSongs
  }
};
</script>

<style>
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test.nav-button {
  margin: 15px;
}

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