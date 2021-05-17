// 配置路由相关信息
import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../components/Home'

// 1.通过vue.use(插件),安装插件
Vue.use(VueRouter)

// 2.创建VueRouter对象
const routes = [
// 
    {
      path:'/home',
      name:'Home',
      component:Home 
    },
    {
      path:'/about',
      name:'About',
      component: () => import('@/components/About')
    }
]

const router = new VueRouter({
  // 配置路由与组件之间的应用关系
  routes
})

export default router 