<template>
  <div class="goods">
      <category-goodsitem :goodsItem="goods"></category-goodsitem>
  </div>
</template>

<script>
import CategoryGoodsitem from'./CategoryGoodsitem'
export default {
 name:"GoodsList",
 components:{
     CategoryGoodsitem
 },
 props:{
     goods:{
         type:Array,
         default(){
             return[]
         }
     }
 }
}
</script>

<style>

</style>