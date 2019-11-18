<template>
  <div class="recommend-page">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
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
    <div class="new">
      <el-divider content-position="left">
        <span style="font-size: 25px;">最新音乐</span>
      </el-divider>
      <div class="tag-list mt-5" style="padding: 10px">
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
        <el-tag type="danger">标签五</el-tag>
        <el-tag type="danger">标签五</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>
      <el-row :gutter="15" class="mt-10">
        <el-col :span="6" v-for="(item,index) in newMusics" :key="index">
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
    </div>
    <div class="recommand-songlist" style="padding-top: 20px;">
      <el-divider content-position="left">
        <span style="font-size: 25px;">推荐歌单</span>
      </el-divider>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newMusics: [
        '情歌',
        '网络歌曲',
        '经典',
        'KTV热歌',
        '背景音乐',
        '伤感',
        '英语',
        '国语'
      ],
      songlist: [
        '情歌',
        '网络歌曲',
        '经典',
        'KTV热歌',
        '背景音乐',
        '伤感',
        '英语',
        '国语'
      ],
      class_list: [
        '情歌',
        '网络歌曲',
        '经典',
        'KTV热歌',
        '背景音乐',
        '伤感',
        '英语',
        '国语',
        '全部分类'
      ]
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
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
}

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