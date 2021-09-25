/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productManageRouter = {
    path: '/productManage',
    component: Layout,
    redirect: '/productManage/productListManage',
    alwaysShow: true,
    name: 'ProductManage',
    meta: {
        title: '商品管理',
        icon: 'product_new',
        roles: ['ProductManage']
    },
    children: [
        {
            path: 'productListManage',
            component: () => import('@/views/productManage/productListManage'),
            name: 'ProductListManage',
            meta: {
                title: '商品列表',
                roles: ['ProductList']
            }
        },
        {
            path: 'productAddManage',
            component: () => import('@/views/productManage/productAddManage'),
            name: 'ProductAddManage',
            hidden: true,
            meta: {
                title: '新增商品'
            }
        }
    ]
}
export default productManageRouter
