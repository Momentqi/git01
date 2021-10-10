<template>
  <div class="DetailsInfo">
      <div class="goods_info_title">图文详情</div>
      <div class="goods_info_content">
          <div v-html="detailsinfo" @load="imgLoad"></div>
      </div>
  </div>
</template>

<script>
export default {
name:"DetailsInfo",
props:{
    detailsinfo:{
        type:String,
        default(){
            return ''
        }
    }
},
methods: {
	    imgLoad() {
            console.log(111111);
          this.$emit('imageLoad');
	    }
    },

}
</script>

<style scoped>
 .goods_info_title{
     font-size: 16px;
     color: blue;
     font-weight: 600;
     padding: 10px;
 }
</style>