import Layout from '@/layout'

const classifyManageRouter = {
    path: '/classifyManage',
    component: Layout,
    redirect: '/classifyManage/classifyListManage',
    alwaysShow: true,
    name: 'ClassifyManage',
    meta: {
        title: '分类管理',
        icon: 'classify_new',
        roles: ['ClassifyManage']
    },
    children: [
        {
            path: 'classifyListManage',
            component: () => import('@/views/classifyManage/classifyListManage'),
            name: 'ClassifyListManage',
            meta: {
                title: '分类列表',
                roles: ['ClassifyList']
            }
        },
        {
            path: 'classifyNavListManage',
            component: () => import('@/views/classifyManage/classifyNavListManage'),
            name: 'ClassifyNavListManage',
            meta: {
                title: '分类导航列表',
                roles: ['ClassifyNavigationList']
            }
        },
        {
            path: 'classifyChildListManage',
            component: () => import('@/views/classifyManage/classifyChildListManage'),
            name: 'ClassifyChildListManage',
            meta: {
                title: '二级分类列表',
                roles: ['ClassifyChildList']
            }
        },
        {
            path: 'classifyAddManage',
            component: () => import('@/views/classifyManage/classifyAddManage'),
            name: 'ClassifyAddManage',
            hidden: true,
            meta: {
                title: '添加分类'
            }
        },
        {
            path: 'classifyNavAddManage',
            component: () => import('@/views/classifyManage/classifyNavAddManage'),
            name: 'ClassifyNavAddManage',
            hidden: true,
            meta: {
                title: '添加分类导航'
            }
        },
        {
            path: 'classifyChildAddManage',
            component: () => import('@/views/classifyManage/classifyChildAddManage'),
            name: 'ClassifyChildAddManage',
            hidden: true,
            meta: {
                title: '添加二级分类'
            }
        }
    ]
}
export default classifyManageRouter
