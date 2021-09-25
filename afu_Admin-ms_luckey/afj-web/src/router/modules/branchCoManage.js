import Layout from '@/layout'

const branchCoManageRouter = {
    path: '/branchCoManage',
    component: Layout,
    redirect: '/branchCoManage/branchCoListManage',
    alwaysShow: true,
    name: 'BranchCoManage',
    meta: {
        title: '分公司管理',
        icon: 'afterSale',
        roles: ['CompanyManage']
    },
    children: [
        {
            path: 'branchCoListManage',
            component: () => import('@/views/branchCoManage/branchCoListManage'),
            name: 'BranchCoListManage',
            meta: {
                title: '分公司列表',
                roles: ['CompanyList']
            }
        },
        {
            path: 'roleListManage',
            component: () => import('@/views/branchCoManage/roleListManage'),
            name: 'RoleListManage',
            meta: {
                title: '分公司方案',
                roles: ['CompanyRoleManage']
            }
        },
        {
            path: 'customerServiceManage',
            component: () => import('@/views/branchCoManage/customerServiceManage'),
            name: 'CustomerServiceManage',
            meta: {
                title: '客服管理',
                roles: ['CustMagerManage']
            }
        },
        {
            path: 'branchCoDtlManage',
            component: () => import('@/views/branchCoManage/branchCoDtlManage'),
            name: 'BranchCoDtlManage',
            meta: {
                title: '分公司详情',
                // roles: ['PostSaleList']
            },
            hidden: true
        },
        {
            path: 'branchCoWorkflowManage',
            component: () => import('@/views/branchCoManage/branchCoWorkflowManage'),
            name: 'BranchCoWorkflowManage',
            meta: {
                title: '设置分公司审批流程',
                // roles: ['WorkFlowManage']
            },
            hidden: true
        },
        {
            path: 'branchCoWorkflowEditManage',
            component: () => import('@/views/branchCoManage/branchCoWorkflowEditManage'),
            name: 'BranchCoWorkflowEditManage',
            meta: {
                title: '修改分公司审批流程',
                // roles: ['WorkFlowManage']
            },
            hidden: true
        }
    ]
}
export default branchCoManageRouter
