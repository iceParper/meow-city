/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const managerRouter = {
  path: '/manager',
  component: Layout,
  redirect: '/manager/manager-list',
  name: 'Manager',
  meta: {
    title: '客户经理管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'manager-list',
      component: () => import('@/views/manager/manager-list'),
      name: 'ManagerList',
      meta: { title: '客户经理管理' }
    }
  ]
}
export default managerRouter