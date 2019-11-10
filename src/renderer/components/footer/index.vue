<template>
  <div class="footer-view">
    <el-slider :show-tooltipss="true" v-model="play_time" input-size="mini" :min="0" :max="100"></el-slider>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <el-row type="flex" justify="start">
          <div class="cover">
            <img class="cover-image" style="height: 50px;" src="../../assets/default_cover.jpg" />
            <!-- <audio v-show="false" ref="audio" v-if="play_url" :src="play_url.url" preload /> -->
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
          <i class="el-icon-edit" style="padding: 10px;height: 20px;"></i>
        <el-button type="primary" icon="el-icon-arrow-left" size="mini" circle></el-button>
        <el-button type="primary" icon="el-icon-video-play" size="medium" circle></el-button>
        <el-button type="primary" icon="el-icon-arrow-right" size="mini" circle></el-button>
        <i class="el-icon-edit" style="padding: 10px;height: 20px;"></i>
      </el-col>
      <el-col :span="6"  type="flex" justify="center">
        <div class="tone">
          <el-dropdown trigger="click" placement="top">
            <span class="tone-dropdown">
              标准
              <i class="el-icon-edit"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 220px">
              <el-dropdown-item>
                <div class="flex-c-l">
                  <div class="check" style="width: 30px">
                    <i class="el-icon-edit" style="color: #31c27c;"></i>
                  </div>
                  <span>标准品质</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="flex-c-l">
                  <div class="check" style="width: 30px"></div>
                  <span>HQ高品质</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="flex-c-l">
                  <div class="check" style="width: 30px"></div>
                  <span>SQ无损品质</span>
                  <img src="../../assets/svip.png" style="margin-left: 5px; width: 22px" />
                  <img src="../../assets/sui.png" style="margin-left: 5px; width: 22px" />
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="mt-10" trigger="click" placement="top" size="medium">
            <span class="tone-dropdown">
              音效
              <i class="el-icon-arrow-up el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 200px">
              <el-dropdown-item>关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-row type="flex" justify="end">
          <el-button type="text">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="text">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="text">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-popover placement="top-start" width="300" popper-class="ls" trigger="click">
            <playlist />
            <el-button type="text" slot="reference">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-popover>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style>
/* .cover {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover .cover-image {
  width: 50px;
  height: 50px;
  border-radius: 2px;
}

.footer-view .control {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}
.footer-view .control button {
  margin: 0 15px;
  color: #31c27c;
}
.footer-view .control button i {
  font-size: 32px;
}
.footer-view .control button:hover {
  color: #2fab67;
}

.footer-view .control .play-btn i {
  font-size: 38px;
}
.footer-view .cover {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-view .cover .cover-image {
  width: 50px;
  height: 50px;
  border-radius: 2px;
}
.footer-view .tone {
  width: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.footer-view .tone.el-dropdown {
  width: 35px;
  border: 1px solid #999;
  font-size: 10px;
  color: #333;
  padding: 1px 5px;
  border-radius: 2px;
}
.footer-view .tone.el-dropdown cursor i {
  font-size: 10px;
}
.footer-view .tone.el-dropdown:hover {
  color: #31c27c;
  border: 1px solid #31c27c;
}
.footer-view.info {
  flex: 1;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 0px;
  justify-content: center;
}
.footer-view.info.top {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
}
.footer-view.info.top.names {
  font-size: 13px;
  color: #444;
}
.footer-view.info.top.time {
  font-size: 12px;
  color: #999;
}
.footer-view.info.progress {
  margin-top: 10px;
}

.footer-view.info.progress.el-progress.el-progress-bar__outer {
  border-radius: 0;
}
.footer-view.info.progress.el-progress.el-progress-bar__inner {
  border-radius: 0;
}
.footer-view.info.progress.el-slider.el-slider__runway {
  height: 2px;
  margin: 2px 0;
}
.footer-view.info.progress.el-slider.el-slider__bar {
  height: 2px;
}
.footer-view.info.progress.el-slider.el-slider__button-wrapper {
  width: 6px;
  height: 6px;
  top: -10px;
}
.footer-view.info.progress.el-slider.el-slider__button {
  width: 2px;
  height: 2px;
}
.footer-view.actions {
  width: 200px;
  padding: 0 20px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
}
.footer-view.actions button {
  color: #333;
  flex: 1;
  flex-shrink: 0;
}
.footer-view.actions button:hover {
  color: #31be7a;
}
.footer-view {
  display: flex;
  align-items: center;
}
.el-slider__runway {
  height: 2px;
  margin: 2px 0;
}
.el-slider__bar {
  height: 2px;
}
.el-slider__button-wrapper {
  width: 6px;
  height: 6px;
  top: -10px;
}
.el-slider__button {
  width: 2px;
  height: 2px;
} */
</style>