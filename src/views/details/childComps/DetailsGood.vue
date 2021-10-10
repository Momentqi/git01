<template>
  <div>
      <div class="goods_price">${{goods.price}}</div>
      <div class="goods_name_row">
    <div class="goods_name">{{goods.name}}
    </div>
    <div class="goods_collect">
        <span></span>
        <span>收藏</span>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailsGood",
    props:{
        goods:{
            type:Object,
            // default(){
            //     return {}
            // }
        }
    }
}
</script>

<style scoped>
.goods_price{
    padding: 6px;
    font-size: 16px;
    font-weight:600;
    color: red;
}
.goods_name_row{
    display: flex;
    border-top: 2px solid #dedede;
    border-bottom:2px solid #dedede;
    padding: 5px 0;
}
.goods_name{
    flex: 5;
    color:#000;
    font-size: 15px;
    padding: 0 5px;

  display: -webkit-box;
 -webkit-line-clamp: 2; 
 -webkit-box-orient: vertical; 
 overflow: hidden;
}
.goods_collect{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #000;
}
</style>