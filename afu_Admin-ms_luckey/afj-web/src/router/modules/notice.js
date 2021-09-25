/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const noticeRouter = {
  path: '/notice',
  component: Layout,
  redirect: '/notice/notice-list',
  name: 'Notice',
  meta: {
    title: '消息管理',
    icon: 'notice'
  },
  children: [
    {
      path: 'notice-list',
      component: () => import('@/views/notice/notice-list'),
      name: 'UserList',
      meta: { title: '消息列表' }
    },
    {
      path: 'notice-add',
      component: () => import('@/views/notice/notice-add'),
      name: 'UserList',
      meta: { title: '添加消息' }
    }
  ]
}
export default noticeRouter
