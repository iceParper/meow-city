/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const classifyRouter = {
  path: '/classify',
  component: Layout,
  redirect: '/classify/main-classify-list',
  name: 'Classify',
  meta: {
    title: '分类管理',
    icon: 'classify'
  },
  children: [
    {
      path: 'main-classify-list',
      component: () => import('@/views/classify/main-classify-list'),
      name: 'MainClassifyList',
      meta: { title: '分类列表' }
    },
    {
      path: 'sub-classify-list',
      component: () => import('@/views/classify/sub-classify-list'),
      name: 'SubClassifyList',
      meta: { title: '子分类列表' }
    },
    {
      path: 'classify-edit-product',
      component: () => import('@/views/product/update-product'),
      name: 'ClassifyEditproduct',
      hidden: true,
      meta: { title: '商品详情' }
    }
  ]
}
export default classifyRouter