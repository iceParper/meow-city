/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user-list',
  name: 'User',
  meta: {
    title: '职员管理',
    icon: 'user'
  },
  children: [
    {
      path: 'user-list',
      component: () => import('@/views/user/user-list'),
      name: 'UserList',
      meta: { title: '用户列表' }
    },
    {
      path: 'business-list',
      component: () => import('@/views/user/business-list'),
      name: 'BusinessList',
      meta: { title: '商户列表' }
    },
    {
      path: 'business-edit',
      component: () => import('@/views/user/business-add'),
      hidden: true,
      name: 'BusinessEdit',
      meta: { title: '商户详情' }
    },
    {
      path: 'business-add',
      component: () => import('@/views/user/business-add'),
      name: 'BusinessAdd',
      meta: { title: '商户创建' }
    }
  ]
}
export default userRouter
