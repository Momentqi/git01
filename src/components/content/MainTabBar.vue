<template>
  <div id="MainTabBar">
 <tab-bar>
   <tab-bar-item path="/home"  activeColor="blue">
     <img slot="item-icon" src="~assets/img/tabbar/home1.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home.svg">
     <div slot="item-text">首页</div>
   </tab-bar-item>
   <tab-bar-item  path="/category">
     <img slot="item-icon" src="~assets/img/tabbar/all.svg">
     <img slot="item-icon-active" src="~assets/img/tabbar/all0.svg">
     <div slot="item-text">分类</div>
   </tab-bar-item>
   <tab-bar-item path="/cart">
     <img slot="item-icon" src="~assets/img/tabbar/gwc.svg">
     <img slot="item-icon-active" src="~assets/img/tabbar/gwc1.svg">
     <div slot="item-text">购物车</div>
   </tab-bar-item>
   <tab-bar-item path="/profile">
     <img slot="item-icon" src="~assets/img/tabbar/wo1.svg">
     <img slot="item-icon-active" src="~assets/img/tabbar/wo.svg">
     <div slot="item-text">我的</div>
   </tab-bar-item>
 </tab-bar>
  </div>
</template>

<script>
import TabBar from './tabbar/TabBar.vue'
import TabBarItem from './tabbar/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem

  }
}
</script>

<style scoped>
</style>
