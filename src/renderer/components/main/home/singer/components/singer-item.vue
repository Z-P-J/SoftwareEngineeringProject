<template>
  <div class="singer-item">
    <img :src="item.img1v1Url" />
    <div class="name">{{item.name}}</div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>