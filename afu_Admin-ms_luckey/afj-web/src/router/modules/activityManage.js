/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const activityManageRouter = {
    path: '/activityManage',
    component: Layout,
    redirect: '/activityListManage',
    name: 'ShopManage',
    meta: {
        title: '活动管理',
        icon: 'activity'
    },
    children: [
        {
            path: 'activityListManage',
            component: () => import('@/views/activityManage/activityListManage'),
            name: 'ActivityListManage',
            meta: { title: '活动列表' }
        },
        {
            path: 'activityDtlManage',
            component: () => import('@/views/activityManage/activityDtlManage'),
            hidden: true,
            name: 'ActivityDtlManage',
            meta: { title: '活动详情' }
        },
        {
            path: 'activityEditManage',
            component: () => import('@/views/activityManage/activityEditManage'),
            hidden: true,
            name: 'ActivityEditManage',
            meta: { title: '新增活动' }
        }
    ]
}
export default activityManageRouter
