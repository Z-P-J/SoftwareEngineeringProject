<template>
  <div>歌单详情：歌单{{input}}</div>
</template>

<script>
export default {
  data() {
    return {
      input: "" + this.$route.fullPath
    };
  },
  watch: {
    $route(to, from) {
      var str = "" + to.fullPath;
      this.input = str.replace("/songlist#", "");
    }
  }
};
</script>