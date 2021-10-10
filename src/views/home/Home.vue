<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <tab-control 
                   :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"  ref="tabControl1"
                    class="tab-control" v-show="isFixedTop"/>
 <scroll class="content"
  ref="scroll" 
 :probe-type="3"
  @scroll="contentScroll"
  :pull-up-load="true"
   @pullingUp="loadMore"
  >
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
   <recommend-view :recommends="recommends"/>
   <feature-view/>
   <tab-control 
                   :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"  ref="tabControl2"
                    />
 <good-list :goods="showGoods"/>
 </scroll>
 <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
   
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
 import Scroll from "components/common/scroll/Scroll";
 import BackTop from "components/content/backTop/BackTop"

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
        name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
         TabControl,
         GoodList,
         Scroll,
         BackTop
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
            banners:[],
            recommends:[],
             goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffSetTop: 0,
        isFixedTop: false,
        ScrollY: 0,
        }
    },
     computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created(){
         // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
   
    },
    activated(){
        this.$refs.scroll.scrollTo(0, this.ScrollY, 300)
      // 回到原来位置，需要刷新scroll，防止自动回到顶部位置
        this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存离开首页时所在的位置
      this.ScrollY = this.$refs.scroll.getScrollY()
      // 当页面离开首页时，取消全局事件监听。在其他页进行刷新时，不会刷新首页
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods:{
        tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        if(this.$refs.tabControl1 !== undefined){
 //保证两个tabControl的选择类型是一致的
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
        }
        
      },
      backTopClick(){
          this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        //   console.log(position);
        // 1.判断BackTop是否显示
        // this.isShowBackTop = (-position.y) > 1000
        // this.BackTop(position)
        // 2.决定tabControl是否吸顶(position: fixed)
        this.isShowBackTop = (-position.y) > 1000
        this.isFixedTop = (-position.y) >this.tabOffSetTop
      },
       swiperImageLoad() {
          // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      loadMore(){
         this.getHomeGoods(this.currentType);
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;
        //   console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
       
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
              // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
           //调用finishPullUp（），多次上拉进行加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
     
    }
}

</script>
<style scoped>
#home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
 .home-nav{
     background-color: var(--color-tint);
     color:#fff;
 
 }

 .content{
     overflow: hidden;
     position: absolute;
     /* top: 44px;
     bottom: 49px;
     left: 0;
     right: 0; */
     height: calc(100% - 93px); 
 }
 .tab-control{
     position: relative;
     /* position: absolute; */
     z-index: 9;
 }

</style>