/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const managerManageRouter = {
    path: '/managerManage',
    component: Layout,
    redirect: '/managerManage/managerListManage',
    alwaysShow: true,
    name: 'ManagerManage',
    meta: {
        title: '客服管理',
        icon: 'manager_new',
        roles: ['CustomerServiceManager']
    },
    children: [
        {
            path: 'managerListManage',
            component: () => import('@/views/managerManage/managerListManage'),
            name: 'ManagerListManage',
            meta: {
                title: '客户经理列表',
                roles: ['CustomerServiceList']
            }
        }
    ]
}
export default managerManageRouter
