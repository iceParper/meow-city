/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/order-list',
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'order'
  },
  children: [
    {
      path: 'order-list',
      component: () => import('@/views/order/order-list'),
      name: 'OrderList',
      meta: { title: '订单列表' }
    },
    // {
    //   path: 'order-detail',
    //   component: () => import('@/views/order/order-detail'),
    //   name: 'OrderDetail',
    //   hidden:true,
    //   meta: { title: '订单详情' }
    // },
    {
      path: 'after-sale',
      component: () => import('@/views/order/after-sale'),
      name: 'AfterSale',
      meta: { title: '售后管理' }
    },
    {
      path: 'after-sale-add',
      component: () => import('@/views/order/after-sale-add'),
      name: 'AfterSaleAdd',
      meta: { title: '新建售后' }
    }
  ]
}
export default orderRouter