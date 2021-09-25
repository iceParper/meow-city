/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderManageRouter = {
  path: '/orderManage',
  component: Layout,
  redirect: '/orderManage/orderList',
  alwaysShow: true,
  name: 'OrderManage',
  meta: {
    title: '订单管理',
    icon: 'order',
    roles: ['OrderManage']
  },

  children: [
    {
      path: '/orderList',
      component: () => import('@/views/orderManage/orderList'),
      name: 'OrderList',
      meta: {
        title: '订单列表',
        roles: ['OrderList']
      }
    },
    {
      path: '/orderDetail',
      component: () => import('@/views/orderManage/orderDetail'),
      name: 'OrderDetail',
      hidden: true,
      meta: {
        title: '订单详情'
      }
    }
  ]
}
export default orderManageRouter
