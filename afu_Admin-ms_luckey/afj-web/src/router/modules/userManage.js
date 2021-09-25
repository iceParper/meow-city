/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userManageRouter = {
  path: '/userManage',
  component: Layout,
  redirect: '/userListManage',
  name: 'UserManage',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [
    {
      path: 'userListManage',
      component: () => import('@/views/userManage/userListManage'),
      name: 'UserListManage',
      meta: { title: '用户列表' }
    },
    {
      path: 'userDtlManage',
      component: () => import('@/views/userManage/userDtlManage'),
      hidden: true,
      name: 'UserDtlManage',
      meta: { title: '用户详情' }
    }
  ]
}
export default userManageRouter
