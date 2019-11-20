import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import(/* webpackChunkname: 'Layout' */ '@/layout')
const Login = () => import(/* webpackChunkname: 'Layout' */ '@/views/login')

const constantRoutes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/layout',
  component: Layout
}]

let router = new Router({
  routes: constantRoutes
})

// const createRouter = () => new Router({
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: constantRoutes
// })

// let router = createRouter()

// 重置挂载的路由
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
