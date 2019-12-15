<template>
  <div class="singer-item">
    <img :src="item.picUrl" class="singer-img"/>
    <div class="name">{{ item.name }}</div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {}
  },
  methods: {
    test() {
      console.log('item=' + JSON.stringify(this.item))
      return "srjfh"
      
    }
  }
}
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