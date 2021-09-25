/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const specialRouter = {
  path: '/special',
  component: Layout,
  redirect: '/special/special-list',
  name: 'Special',
  meta: {
    title: '专题管理',
    icon: 'special'
  },
  children: [
    {
      path: 'special-list',
      component: () => import('@/views/special/special-list'),
      name: 'SpecialList',
      meta: { title: '专题列表' }
    },
    {
      path: 'special-add',
      component: () => import('@/views/special/special-add'),
      name: 'SpecialAdd',
      meta: { title: '新增专题' }
    },
    {
      path: 'special-edit',
      component: () => import('@/views/special/special-add'),
      name: 'SpecialEdit',
      hidden: true,
      meta: { title: '专题详情' }
    }
  ]
}
export default specialRouter