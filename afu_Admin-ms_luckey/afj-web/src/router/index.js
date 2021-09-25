import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import productRouter from './modules/product'
// import brandRouter from './modules/brand'
// import classifyRouter from './modules/classify'
// import homePageRouter from './modules/homePage'
// import specialRouter from './modules/special'
// import orderRouter from './modules/order'
// import managerRouter from './modules/manager'
// import userRouter from './modules/user'
// import systemRouter from './modules/system'
// import noticeRouter from './modules/notice'
// import sysManageRouter from './modules/sysManage'
// import orderManageRouter from './modules/orderManage'
// import merchantManageRouter from './modules/merchantManage'
// import brandManageRouter from './modules/brandManage'
// import classifyManageRouter from './modules/classifyManage'
// import productManageRouter from './modules/productManage'
// import managerManageRouter from './modules/managerManage'
// import liveManageRouter from './modules/liveManage'
// import homePageManageRouter from './modules/homePageManage'
// import afterSaleManageRouter from './modules/afterSaleManage'
// import cartManageRouter from './modules/cartManage'
// import operationManageRouter from './modules/operationManage'
// import branchCoManageRouter from './modules/branchCoManage'
// import borrowMoneyManageRouter from './modules/borrowMoneyManage'
// import riskManageRouter from './modules/riskManage'
// import rebateManageRouter from './modules/rebateManage'
import systemManageRouter from './modules/systemManage'
import systemInfoManageRouter from './modules/systemInfoManage'
import giftManageRouter from './modules/giftManage'
import userManageRouter from './modules/userManage'
import shopManageRouter from './modules/shopManage'
import activityManageRouter from './modules/activityManage'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '兑奖页面', icon: 'workbench', affix: true }
      },
      {
        path: 'editPsd',
        component: () => import('@/views/dashboard/editPsd'),
        name: 'EditPsd',
        hidden: true
      }
    ]
  },
  {
    path: '/editPsd',
    component: () => import('@/views/dashboard/editPsd'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '导航', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // productRouter,
  // brandRouter,
  // classifyRouter,
  // specialRouter,
  // homePageRouter,
  // homePageManageRouter,
  // productManageRouter,
  // brandManageRouter,
  // classifyManageRouter,
  // orderManageRouter,
  // cartManageRouter,
  // orderRouter,
  // managerRouter,
  // userRouter,
  // systemRouter,
  // noticeRouter,
  // managerManageRouter,
  // merchantManageRouter,
  // liveManageRouter,
  // afterSaleManageRouter,
  // sysManageRouter,
  // operationManageRouter,
  // branchCoManageRouter,
  // borrowMoneyManageRouter,
  // riskManageRouter,
  // rebateManageRouter,
  activityManageRouter,
  shopManageRouter,
  giftManageRouter,
  userManageRouter,
  systemManageRouter,
  systemInfoManageRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
