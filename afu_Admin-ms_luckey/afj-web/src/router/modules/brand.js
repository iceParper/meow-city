/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const brandRouter = {
  path: '/brand',
  component: Layout,
  redirect: '/brand/brand-list',
  name: 'Brand',
  meta: {
    title: '品牌管理',
    icon: 'brand'
  },
  children: [
    {
      path: 'brand-list',
      component: () => import('@/views/brand/brand-list'),
      name: 'BrandList',
      meta: { title: '品牌列表' }
    },
    {
      path: 'brand-add',
      component: () => import('@/views/brand/brand-add'),
      name: 'BrandAdd',
      meta: { title: '新增品牌' }
    },
    {
      path: 'brand-update',
      component: () => import('@/views/brand/brand-add'),
      name: 'BrandUpdate',
      hidden: true,
      meta: { title: '品牌详情' }
    },
    {
      path: 'brand-classify-list',
      component: () => import('@/views/brand/brand-classify-list'),
      name: 'BrandClassifyList',
      meta: { title: '二级品牌列表' }
    },
    {
      path: 'brand-edit-product',
      component: () => import('@/views/product/update-product'),
      name: 'BrandEditproduct',
      hidden: true,
      meta: { title: '商品详情' }
    }
  ]
}
export default brandRouter