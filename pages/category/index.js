// pages/category/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
       // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0,
     // 接口的返回数据
  Cates: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }// 有旧的数据 定义过期时间  10s 改成 5分钟
    if (Date.now() - Cates.time > 1000 * 10) {
      // 重新发送请求
      this.getCates();
    } else {
      console.log('可以用久数据');
       // 可以使用旧的数据
       this.Cates = Cates.data;
       let leftMenuList = this.Cates.map(v => v.cat_name);
       let rightContent = this.Cates[0].children;
       this.setData({
         leftMenuList,
         rightContent
       })
    }

  },

 async getCates() {
  //  request({
  //    url:"/categories"
  //  })
  //  .then(res =>{
  //    console.log(res);
  //     this.Cates =res.data.message;
  //     // 把接口的数据存入到本地存储中
  //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
  //     let  leftMenuList = this.Cates.map(v=> v.cat_name);
  //     let  rightContent =this.Cates[0].children;
  //  this.setData({
  //   leftMenuList,
  //   rightContent
  //  })
  //   })
  const res = await request({url:"/categories"});
  this.Cates =res;
  //     // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      let  leftMenuList = this.Cates.map(v=> v.cat_name);
      let  rightContent =this.Cates[0].children;
   this.setData({
    leftMenuList,
    rightContent
   })
 },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
     */
    const { index } = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })

  }
})