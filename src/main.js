import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "components/common/toast"
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload"

import { Search,NavBar,Swipe, SwipeItem,GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';


Vue.component('qi-search',Search)
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);






Vue.config.productionTip = false
//Vue实例作为事件总线赋值给$bus
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyload,{
  //占位图
  loading:require('./assets/img/common/placeholder.jpg')
});

// Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
