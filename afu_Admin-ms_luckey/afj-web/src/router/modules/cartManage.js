import Layout from '@/layout'

const cartManageRouter = {
    path: '/cartManage',
    component: Layout,
    redirect: '/cartManage/cartListManage',
    alwaysShow: true,
    name: 'CartManage',
    meta: {
        title: '购物车管理',
        icon: 'cart',
        roles: ['CarManage']
    },
    children: [
        {
            path: 'cartListManage',
            component: () => import('@/views/cartManage/cartListManage'),
            name: 'CartListManage',
            meta: {
                title: '购物车列表',
                // roles: ['PostSaleList']
            }
        },
        {
            path: 'cartEditManage',
            component: () => import('@/views/cartManage/cartEditManage'),
            name: 'CartEditManage',
            hidden: true,
            meta: {
                title: '修改购物车',
                // roles: ['UserBalanceList']
            }
        },
        {
            path: 'cartDtlManage',
            component: () => import('@/views/cartManage/cartDtlManage'),
            name: 'CartDtlManage',
            hidden: true,
            meta: {
                title: '购物车详情',
                // roles: ['UserBalanceList']
            }
        }
    ]
}
export default cartManageRouter
