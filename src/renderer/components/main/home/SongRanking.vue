<template>
  <div class="=song-ranking" style="border-radius: 2px">
    <el-divider content-position="left">
      <span style="font-size: 15px;">官方榜</span>
    </el-divider>
    <el-row>
      <el-col :span="6" v-for="(item, index) in newMusics" :key="index">
        <el-card :body-style="{ padding: '0px' }" style="margin: 5px;">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>{{item}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      <span style="font-size: 15px;">全球榜</span>
    </el-divider>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newMusics: [
        '飙升榜',
        '新歌榜',
        '原创榜',
        '热歌榜',
        '歌手榜',
        '说唱榜',
        '电音榜',
        '古典音乐榜'
      ]
    }
  }
}
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
