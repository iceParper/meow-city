import Layout from '@/layout'

const afterSaleManageRouter = {
    path: '/afterSaleManage',
    component: Layout,
    redirect: '/afterSaleManage/afterSaleListManage',
    alwaysShow: true,
    name: 'AfterSaleManage',
    meta: {
        title: '售后管理',
        icon: 'afterSale',
        roles: ['PostSaleManage']
    },
    children: [
        {
            path: 'afterSaleListManage',
            component: () => import('@/views/afterSaleManage/afterSaleListManage'),
            name: 'AfterSaleListManage',
            meta: {
                title: '售后列表',
                roles: ['PostSaleList']
            }
        },
        {
            path: 'balanceListManage',
            component: () => import('@/views/afterSaleManage/balanceListManage'),
            name: 'BalanceListManage',
            meta: {
                title: '余额列表',
                roles: ['UserBalanceList']
            }
        },
        {
            path: 'txListManage',
            component: () => import('@/views/afterSaleManage/txListManage'),
            name: 'TxListManage',
            meta: {
                title: '提现列表',
                roles: ['UserBalanceWithdrawalList']
            }
        },
        {
            path: 'afterSaleDtlManage',
            component: () => import('@/views/afterSaleManage/afterSaleDtlManage'),
            name: 'AfterSaleDtlManage',
            hidden: true,
            meta: {
                title: '售后详情'
            }
        },
        {
            path: 'balanceDtlManage',
            component: () => import('@/views/afterSaleManage/balanceDtlManage'),
            name: 'BalanceDtlManage',
            hidden: true,
            meta: {
                title: '余额详情'
            }
        },
        {
            path: 'balanceEditManage',
            component: () => import('@/views/afterSaleManage/balanceEditManage'),
            name: 'BalanceEditManage',
            hidden: true,
            meta: {
                title: '余额修改'
            }
        },
        ,
        {
            path: 'afterSaleEditManage',
            component: () => import('@/views/afterSaleManage/afterSaleEditManage'),
            name: 'AfterSaleEditManage',
            hidden: true,
            meta: {
                title: '售后修改'
            }
        }
    ]
}
export default afterSaleManageRouter
