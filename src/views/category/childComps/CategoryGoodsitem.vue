<template>
  <div class="CategoryGoodsitem">
    <Scroll class="center" ref="scroll"
    :probe-type="3"
    @scroll="contentScrolls">
    <div class="goods_group"
    v-for="(item1,index) in goodsItem"  >
    <div class="goods_title" ref="Names">
    <span class="delimiter">/</span>
    <span class="title"  >{{item1.cat_name}}</span>
    <span class="delimiter">/</span>
    </div>
    <div class="goods_list">
        <div class="navtor" v-for="(item2,index2) in item1.children" 
        :key="item2.cat_id" @click="itemClick(item2.cat_id)" >
        <div v-for="(item3,index3) in item2.children" :key="item3.cat_id">
            <img   v-lazy="item3.cat_icon" @load="imageLoad" />
            <div class="goods_name">{{item2.cat_name}}</div>
        </div>
        </div>
        </div>
    </div>
      </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
    name:"CategoryGoodsitem",
    data(){
        return{
            tops:[0,2570,4030],
        }
    },
    components:{
        Scroll
    },
     props:{
        goodsItem:{
        type:Array,
        default(){
            return[]
        }
       }
    },
     mounted() {
                 this.$bus.$on('sonme',action=>{
    this.$refs.scroll.scrollTo(0,-this.tops[action],100)
        })  
    },
    beforeDestroy() {
        this.$bus.$off('sonme');
    },
  methods:{
      imageLoad(){
          this.$refs.scroll.refresh()            
        },
         contentScrolls(position){
            //  console.log(position);
         },
    itemClick(e){
        this.$router.push({
                    path:'/play',
                    query:{
                    cid:e
                    }
        })           
    },
    },
   
}
</script>

<style  scoped>
 .CategoryGoodsitem{
     height: 100vh;
     overflow: hidden;
     /* width: 75%; */
 }
 .center{
     height: calc(100% - 44px - 49px);
     overflow: hidden;
 }
 .goods_title{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
 }
 .delimiter{
    color: #ccc;
    padding: 0 10px;
}
 .goods_list{
    display: flex;
    flex-wrap:wrap;
}
.goods_list .navtor{
    width: 33.33%;
    text-align: center;
    }
				
.navtor img{
	width: 50%;
	}
.goods_name{
    height: 40px;
    line-height: 40px;
}		
</style>

