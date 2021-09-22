import {request} from '../../request/index.js'
Page({
  data: { 
    tabs: [
      {
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "代发货",
        isActive: false
      },
      {
        id: 2,
        value: "退款退货",
        isActive: false
      }
    ],
    
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index) {
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 2 重新发送请求 type=1 index=0
    // this.getOrders(index+1);
  },
  onShow(options){
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }

    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    console.log(currentPage.options);
    const {type}=currentPage.options;
    this.getOrders(type);
    // console.log(pages);
    this.changeTitleByIndex(type-1);
    
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
      console.log(res);
    // this.setData({
    //   orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    // })
  },

});