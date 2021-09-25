import Layout from '@/layout'

const borrowMoneyManageRouter = {
    path: '/borrowMoneyManage',
    component: Layout,
    redirect: '/borrowMoneyManage/dealerListManage',
    alwaysShow: true,
    name: 'BorrowMoneyManage',
    meta: {
        title: '借款管理',
        icon: 'borrowMoney',
        roles: ['LoanManage']
    },
    children: [
        {
            path: 'dealerListManage',
            component: () => import('@/views/borrowMoneyManage/dealerListManage'),
            name: 'DealerListManage',
            meta: {
                title: '车商列表',
                roles: ['LoanCarDealersManage']
            }
        },
        {
            path: 'quotaListManage',
            component: () => import('@/views/borrowMoneyManage/quotaListManage'),
            name: 'QuotaListManage',
            meta: {
                title: '额度管理',
                roles: ['LoanQuotaManage']
            }
        },
        // {
        //     path: 'applyQuotaManage',
        //     component: () => import('@/views/borrowMoneyManage/applyQuotaManage'),
        //     name: 'ApplyQuotaManage',
        //     meta: {
        //         title: '申请额度',
        //         // roles: ['PostSaleList']
        //     }
        // },

        {
            path: 'applyMoneyManage',
            component: () => import('@/views/borrowMoneyManage/applyMoneyManage'),
            name: 'ApplyMoneyManage',
            meta: {
                title: '申请借款',
                roles: ['LoanLoanApplyManage']
            }
        },
        {
            path: 'applyQuickLoanManage',
            component: () => import('@/views/borrowMoneyManage/applyQuickLoanManage'),
            name: 'ApplyQuickLoanManage',
            meta: {
                title: '快速借款',
                roles: ['LoanLoanApplyManage']
            }
        },
        {
            path: 'dealerDtlManage',
            component: () => import('@/views/borrowMoneyManage/dealerDtlManage'),
            name: 'DealerDtlManage',
            meta: {
                title: '车商详情',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        // {
        //     path: 'examineQuotaManage',
        //     component: () => import('@/views/borrowMoneyManage/examineQuotaManage'),
        //     name: 'ExamineQuotaManage',
        //     meta: {
        //         title: '额度审核',
        //         // roles: ['PostSaleList']
        //     }
        // },

        // {
        //     path: 'quotaEditManage',
        //     component: () => import('@/views/borrowMoneyManage/quotaEditManage'),
        //     name: 'QuotaEditManage',
        //     meta: {
        //         title: '额度修改',
        //         // roles: ['PostSaleList']
        //     }
        // },
        {
            path: 'quotaDtlManage',
            component: () => import('@/views/borrowMoneyManage/quotaDtlManage'),
            name: 'QuotaDtlManage',
            meta: {
                title: '额度详情',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'addBorrowMoneyManage',
            component: () => import('@/views/borrowMoneyManage/addBorrowMoneyManage'),
            name: 'AddBorrowMoneyManage',
            meta: {
                title: '新建借款',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'addQuickLoanManage',
            component: () => import('@/views/borrowMoneyManage/addQuickLoanManage'),
            name: 'AddQuickLoanManage',
            meta: {
                title: '新建快速借款',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'paymentLiManage',
            component: () => import('@/views/borrowMoneyManage/paymentLiManage'),
            name: 'PaymentLiManage',
            meta: {
                title: '打款列表',
                roles: ['LoanPaymentManage']
            },
        },
        {
            path: 'paymentDtlManage',
            component: () => import('@/views/borrowMoneyManage/paymentDtlManage'),
            name: 'PaymentDtlManage',
            meta: {
                title: '打款详情',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'borrowMoneyLiManage',
            component: () => import('@/views/borrowMoneyManage/borrowMoneyLiManage'),
            name: 'BorrowMoneyLiManage',
            meta: {
                title: '借款列表',
                roles: ['LoanLoanManage']
            },
        },
        {
            path: 'borrowMoneyDtlManage',
            component: () => import('@/views/borrowMoneyManage/borrowMoneyDtlManage'),
            name: 'BorrowMoneyDtlManage',
            meta: {
                title: '借款详情',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'interestManage',
            component: () => import('@/views/borrowMoneyManage/interestManage'),
            name: 'InterestManage',
            meta: {
                title: '还款计划',
                roles: ['RepaymentPlanManage']
            }
        },
        {
            path: 'returnInterestManage',
            component: () => import('@/views/borrowMoneyManage/returnInterestManage'),
            name: 'ReturnInterestManage',
            meta: {
                title: '还款记录',
                roles: ['RepaymentRecordManage']
            }
        },
        // {
        //     path: 'repaymentApprovalManage',
        //     component: () => import('@/views/borrowMoneyManage/repaymentApprovalManage'),
        //     name: 'RepaymentApprovalManage',
        //     meta: {
        //         title: '线下还款审批',
        //         // roles: ['PostSaleList']
        //     },
        //     hidden:true
        // },
    ]
}
export default borrowMoneyManageRouter
