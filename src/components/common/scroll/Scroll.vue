<template>
    <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import ObserveDOM from '@better-scroll/observe-dom'
  BScroll.use(ObserveDOM)
export default {
    name:'Scroll',
     props: {
      probeType: {
        type: Number,
        default: 0
      },
        pullUpLoad: {
        type: Boolean,
        default: false
      }
     },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
          observeDOM: true, // 开启 observe-dom 插件
            click:true,
            // mouseWheel: true,//开启鼠标滚轮
            probeType: this.probeType,
             pullUpLoad: this.pullUpLoad
        })
        // console.log(this.scroll);
          // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }
     // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
        scrollTo(x,y,time=300){
           this.scroll && this.scroll.scrollTo(x, y, time)
        },
         // 页面刷新
        refresh() {
        this.scroll && this.scroll.refresh()
      },
       // 上拉加载动作完成时，自动加载;如果不自动加载，数据显示不出来
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
       getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },
    }    
}
</script>

<style>

</style>