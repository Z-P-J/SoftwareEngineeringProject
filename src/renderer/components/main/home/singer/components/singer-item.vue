<template>
  <div class="singer-item">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="singer-img"/>
    <div class="name">{{item}}</div>
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
.singer-item {
  /* width: 170px;
  height: 160px; */
  margin-bottom: 18px;
  background: #f0f0f0;
  box-sizing: border-box;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
}
.singer-img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
</style>