/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const homePageRouter = {
  path: '/homePage',
  component: Layout,
  redirect: '/homePage/home-page',
  name: 'HomePage',
  meta: {
    title: '首页管理',
    icon: 'xcx_home'
  },
  children: [
    {
      path: 'home-page',
      component: () => import('@/views/home-page/home-page'),
      name: 'HomePage',
      meta: { title: '首页管理' }
    },
    {
      path: 'home-page-add',
      component: () => import('@/views/home-page/home-page-add'),
      name: 'HomePageAdd',
      hidden: true,
      meta: { title: '新增首页' }
    },
    {
      path: 'home-page-edit',
      component: () => import('@/views/home-page/home-page-add'),
      name: 'HomePageEdit',
      hidden: true,
      meta: { title: '首页详情' }
    }
  ]
}
export default homePageRouter