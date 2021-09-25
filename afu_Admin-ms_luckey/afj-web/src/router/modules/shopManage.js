/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const shopManageRouter = {
    path: '/shopManage',
    component: Layout,
    redirect: '/shopListManage',
    name: 'ShopManage',
    meta: {
        title: '店铺管理',
        icon: 'shop'
    },
    children: [
        {
            path: 'shopListManage',
            component: () => import('@/views/shopManage/shopListManage'),
            name: 'ShopListManage',
            meta: { title: '店铺列表' }
        },
        {
            path: 'shopDtlManage',
            component: () => import('@/views/shopManage/shopDtlManage'),
            hidden: true,
            name: 'ShopDtlManage',
            meta: { title: '店铺详情' }
        },
        {
            path: 'shopEditManage',
            component: () => import('@/views/shopManage/shopEditManage'),
            hidden: true,
            name: 'ShopEditManage',
            meta: { title: '新增店铺' }
        }
    ]
}
export default shopManageRouter
