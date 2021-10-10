<template>
    <div class="cart">
        <nav-bar class="nav-bar">
    
            <div slot="center">购物车({{cartLength}})
              <img src="~assets/img/common/back.svg" alt=""  @click="backClick">
            </div>
        </nav-bar>
        <!--    商品列表-->
    <cart-list class="cart-list"></cart-list>
    <!--    底部汇总-->
    <cart-bottom-bar/>
    </div>
</template>
<script>

import CartList from './childComps/CartList.vue'
import CartBottomBar from "./childComps/CartBottomBar";
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'//直接把getters中的方法转变为属性，可以直接使用
export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
         ...mapGetters(['cartLength'])
        // cartlength(){
        //     return this.$store.state.cartList.length
        // }

    },
    methods:{
         backClick(){
        this.$router.back()
      },
     
    }
    
}
</script>
<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 500;
    color: #fff;
    position: relative;
    /* position: fixed;
    width: 100%;
    z-index: 9; */
  }
  .center img{
     position: absolute;
     left: 10px;
     top: 10px;
  }
</style>