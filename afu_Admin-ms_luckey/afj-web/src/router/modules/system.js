/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/account-list',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'form'
  },
  children: [
    // {
    //   path: 'account-list',
    //   component: () => import('@/views/system/account-list'),
    //   name: 'AccountList',
    //   meta: { title: '账户管理' }
    // },
    // {
    //   path: 'role-list',
    //   component: () => import('@/views/system/role-list'),
    //   name: 'SetRoleList',
    //   meta: { title: '角色管理' }
    // },
    // {
    //   path: 'applet-list',
    //   component: () => import('@/views/system/applet-list'),
    //   name: 'AppletList',
    //   meta: { title: '运费管理' }
    // },
    // // ===========新增
    // {
    //   path: 'member_list',
    //   component: () => import('@/views/system/member_list'),
    //   name: 'MemerList',
    //   meta: { title: '会员管理' }
    // },
    // {
    //   path:'member_add',
    //   component:() => import('@/views/system/member_add'),
    //   name:'MemberAdd',
    //   meta:{title:'新增会员'}
    // },
    // {
    //   path:'member_edit',
    //   component:() => import('@/views/system/member_edit'),
    //   name:'MemberEdit',
    //   meta:{title:'编辑会员'},
    //   hidden:true
    // },
    // ===========新增
    // {
    //   path:'notice-add',
    //   component:() => import('@/views/system/notice-add'),
    //   name:'NoticeAdd',
    //   meta:{title:'新增消息'}
    // },
    // {
    //   path:'notice-list',
    //   component:() => import('@/views/system/notice-list'),
    //   name:'NoticeList',
    //   meta:{title:'消息列表'}
    // },
    {
      path: 'no-power',
      component: () => import('@/views/system/no-power'),
      name: 'NoPower',
      hidden: true,
      meta: { title: '暂无权限' }
    }
  ]
}
export default systemRouter
