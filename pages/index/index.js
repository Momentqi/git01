//Page Object
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图
    swiperList:[],
     // 导航 数组
     catesList:[],
     // 楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
     this.getCateList();
     this.getFloorList();
    //  wx.request({
    //   url:'/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result);
    //    this.setData({
    //         swiperList:result
    //    })
    //   }
    // });
    // request({ url:'/home/swiperdata',})
    // .then(result =>{
    //   this.setData({
    //     swiperList:result
    //   })
    // })
  },
  
  // 获取轮播图数据
  getSwiperList(){
    request({ url: '/home/swiperdata' })
    .then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  // 获取 分类导航数据
  getCateList(){
    request({ url: '/home/catitems' })
    .then(result => {
      // console.log(result);
      this.setData({
        catesList:result
      })
    })
  },
  // 获取 楼层数据
  getFloorList(){
    request({ url: '/home/floordata' })
    .then(result => {
      console.log(result);
      this.setData({
        floorList: result
      })
    })
  },
});