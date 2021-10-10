<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" 
            :key="index" :item-info="item"/> 
             <img v-show="wuqi" src="~assets/img/common/placeholder.jpg"/>
        </scroll>
       
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem.vue';

import { mapGetters } from 'vuex'

export default {
    name:"CartList",
    components:{
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList']),
        
        wuqi(){
            // console.log(this.cartList);
            return this.cartList==0?true:false
        }
    },
    activated(){
        this.$refs.scroll.refresh()
    },
}
</script>
<style  scoped>
    .cart-list{
        /* position: relative; */
       height: 100vh;
    }
    .content{
       height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
    }
    img{
        width: 100%;
    }
</style>>

