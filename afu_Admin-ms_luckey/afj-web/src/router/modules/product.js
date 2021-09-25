/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const productRouter = {
  path: '/product',
  component: Layout,
  redirect: '/product/product-list',
  name: 'Product',
  meta: {
    title: '商品管理',
    icon: 'shopping',
    noCache: true
  },
  children: [
    {
      path: 'product-list',
      component: () => import('@/views/product/product-list'),
      name: 'ProductList',
      meta: {
        title: '商品列表',
        noCache: true
      }
    },
    {
      path: 'edit-product',
      component: () => import('@/views/product/update-product'),
      name: 'Editproduct',
      hidden: true,
      meta: {
        title: '商品详情',
        noCache: true
      }
    },
    {
      path: 'add-product',
      component: () => import('@/views/product/add-product'),
      name: 'AddProduct',
      meta: {
        title: '新增商品',
        noCache: true
      }
    }
  ]
}
export default productRouter