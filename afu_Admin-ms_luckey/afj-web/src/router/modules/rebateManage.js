/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const rebateManageRouter = {
    path: '/rebateManage',
    component: Layout,
    redirect: '/rebateManage/applyRebateManage',
    alwaysShow: true,
    name: 'RebateManage',
    meta: {
        title: '积分管理',
        icon: 'rebate',
        roles: ['RebateManage']
    },
    children: [
        {
            path: 'rebateListManage',
            component: () => import('@/views/rebateManage/rebateListManage'),
            name: 'RebateListManage',
            meta: {
                title: '积分列表',
                roles: ['RebateListManage']
            }
        },
        {
            path: 'rebateChangeManage',
            component: () => import('@/views/rebateManage/rebateChangeManage'),
            name: 'RebateChangeManage',
            meta: {
                title: '变动记录',
                roles: ['RebateDetailManage']
            }
        },
        {
            path: 'rebateDtlManage',
            component: () => import('@/views/rebateManage/rebateDtlManage'),
            name: 'RebateDtlManage',
            meta: {
                title: '积分详情',
                // roles: ['MerchantApplyList']
            },
            hidden: true
        },
        {
            path: 'rebateApplyListManage',
            component: () => import('@/views/rebateManage/rebateApplyListManage'),
            name: 'RebateApplyListManage',
            meta: {
                title: '积分申请列表',
                // roles: ['RebateListManage']
            }
        }
    ]
}
export default rebateManageRouter
