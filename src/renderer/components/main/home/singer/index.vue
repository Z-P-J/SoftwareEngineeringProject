<template>
    <el-scrollbar class="singer-view scroll-page">
        
        <!--<div class="class-list">-->
            <!--<div class="class-item hover-bg" v-for="(item,index) in tags" :key="index" @click="catClick(item.id)">{{item.name}}</div>-->
        <!--</div>-->
        <!-- <div>index</div> -->
        <singer-list />
    </el-scrollbar>
</template>
<script>
import SingerList from './components/singer-list.vue'
export default {
  components: {

    SingerList
  },
  data () {
    return {
      // tags:[
      //     {name:"入驻歌手",id:"5001"},
      //     {name:"华语男歌手",id:" 1001"},
      //     {name:"华语女歌手",id:" 1002"},
      //     {name:"华语组合/乐队",id:" 1003"},
      //     {name:"欧美男歌手",id:" 2001"},
      //     {name:"欧美女歌手",id:" 2002"},
      //     {name:"欧美组合/乐队",id:" 2003"},
      //     {name:"日本男歌手",id:" 6001"},
      //     {name:"日本女歌手",id:" 6002"},
      //     {name:"日本组合/乐队",id:" 6003"},
      //     {name:"韩国男歌手",id:" 7001"},
      //     {name:"韩国女歌手",id:" 7002"},
      //     {name:"韩国组合/乐队",id:" 7003"},
      //     {name:"其他男歌手",id:" 4001"},
      //     {name:"其他女歌手",id:" 4002"},
      //     {name:"其他组合/乐队",id:" 4003"},
      // ],
      cat: 0
      // page:0,
    }
  },
  methods: {
    // catClick(id){
    //     this.cat=id
    //     this.$emit('newCat')
    // },
  }
  // watch:{
  //     cat(nv,ov){
  //         if(nv!=ov){
  //             this.page=0
  //         }
  //     }
  // },

}
</script>
<style>

</style>