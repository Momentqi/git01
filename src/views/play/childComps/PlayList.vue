<template>
  <div class="PlayList"  >
      <div class="goods_item" v-for="(item,index) in QueryParams"
       :key="index" @click="itemClick(item.goods_id)"> 
      <div class="goods_img_wrap">
          <img  :src="item.goods_small_logo"  @load="imageLoad"/>
      </div>
      <div class="goods_info_wrap">
          <span class="goods_name">{{item.goods_name}}</span>
          <span class="goods_price">￥{{item.goods_price}}</span>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"PlayList",
    data(){
        return{
            
        }
    },
    props:{
        QueryParams:{
            type:Array,
            default(){
                return[]
            }
        }
    },
       methods:{
            itemClick(e) {
    
    // console.log(this.QueryParams);
    // this.$router.push('/details/' + e)
        this.$router.push({
                    path:'/details/',
                    query:{
                    goods_id:e
                    }
                })
},
        imageLoad(){
           
this.$bus.$emit('itemImageLoads')
            
             
}
        }
}
</script>

<style scoped>
/* pages/goods_list/index.wxss */
 .goods_item {
  display: flex;
  border-bottom: 1px solid #ccc;
}
 .goods_item .goods_img_wrap {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
 .goods_item .goods_img_wrap img {
  width: 70%;
}
 .goods_item .goods_info_wrap {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
 .goods_item .goods_info_wrap .goods_name {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
 .goods_item .goods_info_wrap .goods_price {
  color: var(--themeColor);
  font-size: 32rpx;
}

</style>