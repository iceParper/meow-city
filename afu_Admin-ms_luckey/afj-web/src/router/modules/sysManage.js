/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sysManageRouter = {
  path: '/sysManage',
  component: Layout,
  redirect: '/sysManage/sysUserManage',
  alwaysShow: true,
  name: 'SysManage',
  meta: {
    title: '系统管理',
    icon: 'sys',
    roles: ['SysManage']
  },
  children: [
    {
      path: 'sysUserManage',
      component: () => import('@/views/sysManage/sysUserManage'),
      name: 'SysUserManage',
      meta: {
        title: '职员管理',
        roles: ['SysUserManage']
      }
    },
    {
      path: 'sysAddUserManage',
      component: () => import('@/views/sysManage/sysAddUserManage'),
      name: 'SysAddUserManage',
      hidden: true,
      meta: {
        title: '新增用户'
      }
    },
    {
      path: 'sysRoleManage',
      component: () => import('@/views/sysManage/sysRoleManage'),
      name: 'SysRoleManage',
      meta: {
        title: '角色管理',
        roles: ['SysRoleManage']
      }
    },
    {
      path: 'sysAddRoleManage',
      component: () => import('@/views/sysManage/sysAddRoleManage'),
      name: 'SysAddRoleManage',
      hidden: true,
      meta: {
        title: '新增角色'
      }
    },
    {
      path: 'sysMemberListManage',
      component: () => import('@/views/sysManage/sysMemberListManage'),
      name: 'SysMemberListManage',
      meta: {
        title: '会员列表',
        roles: ['MemberManage']
      }
    },
    {
      path: 'sysMemberDtlManage',
      component: () => import('@/views/sysManage/sysMemberDtlManage'),
      name: 'SysMemberDtlManage',
      hidden: true,
      meta: {
        title: '会员详情'
      }
    },
    {
      path: 'sysMemberAddManage',
      component: () => import('@/views/sysManage/sysMemberAddManage'),
      name: 'SysMemberAddManage',
      hidden: true,
      meta: {
        title: '新增会员'
      }
    },
    ,
    {
      path: 'sysMerchantListManage',
      component: () => import('@/views/sysManage/sysMerchantListManage'),
      name: 'SysMerchantListManage',
      hidden: true,
      meta: {
        title: '会员－商户列表'
      }
    },
    {
      path: 'sysFreightListManage',
      component: () => import('@/views/sysManage/sysFreightListManage'),
      name: 'SysFreightListManage',
      meta: {
        title: '运费列表',
        roles: ['FreightManage']
      }
    },
    {
      path: 'sysXcxListManage',
      component: () => import('@/views/sysManage/sysXcxListManage'),
      name: 'SysXcxListManage',
      meta: {
        title: '小程序列表',
        roles: ['AppVersionManage']
      }
    },
    {
      path: 'no-power',
      component: () => import('@/views/sysManage/no-power'),
      name: 'NoPower',
      hidden: true,
      meta: { title: '暂无权限' }
    }
  ]
}
export default sysManageRouter
