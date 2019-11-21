<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="content"></router-view>
      </keep-alive>
    </transition>

    <!-- <transition :name="transitionName">
      <player :v-show="show_player"/>
    </transition>-->
  </div>
</template>

<script>
// import player from "./components/player/Index";
export default {
  name: "music-player",
  data() {
    return {
      transitionName: "none",
      show_player: false
    };
  },
  // components: {
  //   player
  // },
  watch: {
    $route(to, from) {
      if (to.path == "/player") {
        this.show_player = true;
        this.transitionName = "slide-up";
      } else if (from.path == "/player") {
        this.show_player = false;
        this.transitionName = "slide-down";
      } else {
        this.transitionName = "none";
      }
    }
  }
};
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.3s ease-out;
}
.slide-up-enter {
  transform: translate(0, 100%);
}
.slide-up-leave-active {
  transform: translate(0, -50%);
}
.slide-down-enter {
  transform: translate(0, -50%);
}
.slide-down-leave-active {
  transform: translate(0, 100%);
}
</style>
