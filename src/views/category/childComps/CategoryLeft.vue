<template>
   <div class="CategoryLeft">
      <Scroll class="center"  ref="scroll">
         <div class="menu_item" 
         :class="{active:index=== active}" 
         @click="leftClickHandle(index)"
         v-for="(item,index) in leftMenuList":key="index"
        >{{item}}</div>
      </Scroll>
   </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
   name:"CategoryLeft",
   components:{
      Scroll 
   },
   data(){
      return{
         active:0,
      }
   },
     props:{
       leftMenuList:{
        type:Array,
        default(){
            return[]
        }
       }
     },
      methods:{
      leftClickHandle (index) {
				this.active = index;
            
            // this.$store.commit('increment',index)
            this.$bus.$emit('sonme',this.active);
			},
    },
     activated(){
        this.$refs.scroll.refresh()
    },

}
</script>

<style  scoped>
.CategoryLeft{
   float: left;
   height: 100vh;
   width: 25%;
   border-right: 1px solid #f1f1f1;
}
.center{
         height: calc(100% - 54px - 49px);
         overflow: hidden; 
}
.menu_item{
   height: 40px;
   line-height: 40px;
   font-size: 16px;
   text-align: center;
}
.active{
   color: royalblue;
   background-color: sandybrown;
}
</style>
