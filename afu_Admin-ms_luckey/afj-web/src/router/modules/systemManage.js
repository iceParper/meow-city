/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemInfoManageRouter = {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/sysRoleManage',
    alwaysShow: true,
    name: 'SystemManage',
    meta: {
        title: '系统管理',
        icon: 'sys',
        roles: ['SystemManager']
    },
    children: [
        {
            path: 'sysRoleManage',
            component: () => import('@/views/systemManage/sysRoleManage'),
            name: 'SysRoleManage',
            meta: {
                title: '角色管理',
                roles: ['RoleManager']
            }
        },
        {
            path: 'sysRoleAddManage',
            component: () => import('@/views/systemManage/sysRoleAddManage'),
            name: 'SysRoleAddManage',
            meta: {
                title: '新增角色',
                // roles: ['SysRoleManage']
            },
            hidden: true
        },
        {
            path: 'sysUserManage',
            component: () => import('@/views/systemManage/sysUserManage'),
            name: 'SysUserManage',
            meta: {
                title: '职员管理',
                roles: ['SysUserManager']
            }
        },
        {
            path: 'sysAddUserManage',
            component: () => import('@/views/systemManage/sysAddUserManage'),
            name: 'SysAddUserManage',
            hidden: true,
            meta: {
                title: '新增用户'
            }
        },
        {
            path: 'sysUserDtlManage',
            component: () => import('@/views/systemManage/sysUserDtlManage'),
            name: 'SysUserDtlManage',
            hidden: true,
            meta: {
                title: '用户详情'
            }
        },
        {
            path: 'sysXcxListManage',
            component: () => import('@/views/systemManage/sysXcxListManage'),
            name: 'SysXcxListManage',
            meta: {
                title: '小程序列表',
                roles: ['AppVersionManager']
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
export default systemInfoManageRouter
