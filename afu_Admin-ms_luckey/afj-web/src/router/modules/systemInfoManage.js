/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemManageRouter = {
    path: '/systemInfoManage',
    component: Layout,
    redirect: '/systemInfoManage/systemInfoManage',
    alwaysShow: false,
    name: 'SystemInfoManage',
    meta: {
        title: '系统信息',
        icon: 'people',
        roles: ['SysManage']
    },
    children: [
        {
            path: 'systemInfoManage',
            component: () => import('@/views/systemInfoManage/systemInfoManage'),
            name: 'SystemInfoManage',
            meta: {
                title: '系统信息',
                roles: ['SysRoleManage']
            }
        }
    ]
}
export default systemManageRouter
