import VueRouter from 'vue-router'
import Vue from 'vue'

const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const Details = () => import('../views/details/Details')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Play = () => import('../views/play/Play')
Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{
            title:'首页'
        },
    },
    {
        path:'/cart',
        component:Cart,
        meta:{
            title:'购物车'
        },
    },
    {
        path:'/category',
        component:Category,
        meta:{
            title:'分页'
        },
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            title:'我的'
        }
    },
    {
        // 动态路由
        path: '/detail/:iid',
        component: Detail
      },
      {
        // 动态路由
        path: '/details',
        component: Details
      },
      {
        path: '/play',
        component: Play
      }

]
const router = new VueRouter({
    routes,
    mode:'history',
    linkActiveClass:'active'
})
router.beforeEach((to, from,next) =>{
    next()
    // console.log(to);
    document.title = to.matched[0].meta.title
})
const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (to) {

      return VueRouterPush.call(this, to).catch(err => err)

}
export default router