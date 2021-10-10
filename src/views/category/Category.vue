<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">分类</div></nav-bar>
    <!-- <Scroll > -->
      <category-left :leftMenuList="leftMenuList" ></category-left>
    <!-- </Scroll> -->

      <category-goods :goods="goods"></category-goods>
     
  </div>
</template>

<script>
import CategoryLeft from './childComps/CategoryLeft.vue'
import CategoryGoods from './childComps/CategoryGoods.vue'

import NavBar from 'components/common/navbar/NavBar'

import {getCategory} from'network/Category.js'

export default {
     name:"Category",
    data(){
        return{
            leftMenuList:[],
            rightContent:[],
            kk:[],
            value:'',
            index:0,
            goods:[]
        }
    },
      components:{
        CategoryLeft,
        CategoryGoods,
         NavBar,

    },
   
    methods:{     
       getCategory(){
            //  const page = this.goods[type].page + 1
            // const page = this.goods[type].page  + 1
        getCategory().then(res=>{
            const data = res.data.message;          
            this.leftMenuList = data.map(v=>
                v.cat_name)
            // this.rightContent = data[0].children;
            this.goods = data;
            // this.goods[type].children.push(...res.data.message)
            // console.log(this.rightContent);
        })
         },
    },
    created(){
        //        this.bus.$on('sonme',action=>{
        //     this.index = action
        // })
       this.getCategory()
    },
  

   

}
</script>

<style  scoped>
    .home-nav{
     background-color: var(--color-tint);
     color:#fff;
 
 }
.center{
         height: calc(100% - 54px - 49px);
         overflow: hidden; 
}
</style>

