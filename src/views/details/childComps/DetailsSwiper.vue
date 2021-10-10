<template>
  <div >
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="" @load="imageLoad">
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script>
export default {
name:"DetailsSwiper",
    props: {
        topImages:{
            type:Array,
            default(){
                return{
               
                }
            }
        }
    },
    methods:{
imageLoad(){
     this.$emit('swiperImageLoad')       
}
    }
}
</script>

<style scoped>
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 120px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>