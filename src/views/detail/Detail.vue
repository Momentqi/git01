<template>
    <div id="detail">
     <detail-nav-bar  class="detail-nav"  @titleClick="titleClick" ref="detailNav"/>
     <scroll class="content"
      ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll">
     <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" ref="baseInfo"/>
      <detail-shop-info :shop="shops" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
     <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="recommends"/>
      </scroll>
       <detail-bottom-bar @addCart="addToCart"/>
       <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar' 
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from "./childComps/DetailShopInfo";
 import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
 import DetailParamInfo from "./childComps/DetailParamInfo";
 import DetailCommentInfo from "./childComps/DetailCommentInfo";
   import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop"


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin } from 'common/mixin.js'
import {debounce} from 'common/debounce.js'
 import {mapActions} from 'vuex'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        BackTop    
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods: {},
            shops: {},
            detailInfo: {},
            paramInfo:{},
            commentInfo: {},
            recommends: [],
            themeTops: [],
            getThemeTopY:null,
            isShowBackTop:false,
        }
    },
    created(){
        // console.log(this.$route.params);
        this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res =>{
              const data = res.result
             // 2.1获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        // 2.2创建商品信息的对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
         // 2.3创建店铺信息的对象
        this.shops = new Shop(data.shopInfo)
         // 2.4保存商品的详情数据
        this.detailInfo = data.detailInfo;
          //2.5获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
         // 2.6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        })
        //3.请求推荐数据
    getRecommend().then(res =>{
        // console.log(res);
          this.recommends = res.data.list
    })
        this.getThemeTopY = debounce(() =>{
          this.themeTops = [];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.recommends.$el.offsetTop);
        })
    },
    destroyed(){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
        ...mapActions(['addCart']),
    imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
        // this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommends.$el.offsetTop);
        // this.themeTops.push(Number.MAX_VALUE);
        // console.log(this.themeTops);
              },
    titleClick(index){
    this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200)
 },
    contentScroll(position){
   const positionY = -position.y
      const length = this.themeTops.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1])) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
   this.isShowBackTop = (-position.y) > 1000
 },
    addToCart(){
  //  console.log(1);
  //  console.log(this);
  //  const product ={}
  //  product.image = this.topImages[0];
  // //  product.title = this.goosInfo.title;
  // //  product.desc = this.goosInfo.desc;
  // //  product.price = this.goosInfo.newPrice;
  //  product.iid = this.iid; 
    const product = {}
    // console.log(this);
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;//商品的唯一标识
  //  this.$store.commit('addCart',product)
  this.addCart(product).then(res => {
    this.$toast.show(res, 1500)
  })
  // this.$store.dispatch('addCart',product).then(res => {
  //   console.log(res);
  // })
    // this.addCart(product).then(res => {
    //       this.$toast.show(res, 1500)
    //     })
 },
    backTopClick(){
          this.$refs.scroll.scrollTo(0,0)
      },
   },
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index:7;
    background-color: #fff;
    height: 100vh;
}
 .detail-nav {
    position: relative;
    z-index: 8;
    background-color: #fff;
  }
.content{
  padding-top: 24px;
   height: calc(100% - 44px);
   background-color: #fff;
  
   /* overflow: hidden; */
}
</style>