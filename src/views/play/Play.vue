<template>
  <div class="play">
    <qi-search v-model="value" placeholder="请输入搜索关键词" />
 <tab-control 
                   :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"  
                    />
      <scroll class="center" ref="scroll" 
      :pull-up-load="true"
      @pullingUp="loadMore"
      :probe-type="3"
      @scroll="contentScroll">
          <play-list :QueryParams="showGoods" />
      </scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import PlayList from './childComps/PlayList'
import TabControl from 'components/content/tabControl/TabControl'

import Scroll from "components/common/scroll/Scroll";
import {getPlay} from'network/Category.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
    name:"Play",
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return{
            value:null,
            scroll:null,

            QueryParams:{
              // query:"",
              // cid:"",
              // pagenum:1,
              // pagesize:10,
          'cat_one_id': {pagenum: 0, goods: []},
          'cat_two_id': {pagenum: 0, goods: []},
          'cat_three_id':{pagenum: 0, goods: []},
            },
               currentType: 'cat_one_id',
        }
    },
    components:{
            PlayList,
            TabControl,
            Scroll 
    },
    computed:{
        showGoods() {
        return this.QueryParams[this.currentType].goods
    }
    },
   
    methods:{
      tabClick(index){
         switch (index) {
          case 0:
            this.currentType = 'cat_one_id'
            break
          case 1:
            this.currentType = 'cat_two_id'
            break
          case 2:
            this.currentType = 'cat_three_id'
            break
        }
    },
    loadMore(){
      this.getPlay(this.currentType)
    },
    getPlay(pagesize){
      const pagenum = this.QueryParams[pagesize].pagenum + 1
      getPlay(pagesize,pagenum).then(res=>{
       this.QueryParams[pagesize].goods.push(...res.data.message.goods)
          this.QueryParams[pagesize].pagenum += 1
            //调用finishPullUp（），多次上拉进行加载更多
          this.$refs.scroll.finishPullUp()
      })
    }
    },
    created(){
      // this.QueryParams.cid = this.$route.params.cid
      // console.log(this.QueryParams.cid);
      this.getPlay('cat_one_id');
      // this.getPlay('cat_two_id');
      // this.getPlay('cat_three_id');
      this.$bus.$on('itemImageLoads', () => {
        this.$refs.scroll.refresh()
      })
    },
     activated(){ 
        this.$refs.scroll.refresh()
    },
    
}
</script>

<style scoped>
.play{
  height: 100vh;
}
    .center{
      height: calc(100% - 94px - 50px );
      overflow: hidden;
    }
</style>