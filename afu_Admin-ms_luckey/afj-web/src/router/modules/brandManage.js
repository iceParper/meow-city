import Layout from '@/layout'

const brandManageRouter = {
    path: '/brandManage',
    component: Layout,
    redirect: '/brandManage/brandListManage',
    alwaysShow: true,
    name: 'BrandManage',
    meta: {
        title: '品牌管理',
        icon: 'brand_new',
        roles: ['BrandManage']
    },
    children: [
        {
            path: 'brandListManage',
            component: () => import('@/views/brandManage/brandListManage'),
            name: 'BrandListManage',
            meta: {
                title: '品牌列表',
                roles: ['BrandList']
            }
        },
        {
            path: 'brandNavListManage',
            component: () => import('@/views/brandManage/brandNavListManage'),
            name: 'BrandNavListManage',
            meta: {
                title: '品牌导航列表',
                roles: ['BrandNavigationList']
            }
        },
        {
            path: 'brandChildListManage',
            component: () => import('@/views/brandManage/brandChildListManage'),
            name: 'BrandChildListManage',
            meta: {
                title: '二级品牌列表',
                roles: ['BrandChildList']
            }
        },
        {
            path: 'brandSpeListManage',
            component: () => import('@/views/brandManage/brandSpeListManage'),
            name: 'BrandSpeListManage',
            meta: {
                title: '品牌专题列表',
                roles: ['BrandSpecialList']
            }
        },
        {
            path: 'brandAddManage',
            component: () => import('@/views/brandManage/brandAddManage'),
            name: 'BrandAddManage',
            hidden: true,
            meta: {
                title: '新增品牌'
            }
        },
        {
            path: 'brandNavAddManage',
            component: () => import('@/views/brandManage/brandNavAddManage'),
            name: 'BrandNavAddManage',
            hidden: true,
            meta: {
                title: '新增导航'
            }
        },
        {
            path: 'brandChildAddManage',
            component: () => import('@/views/brandManage/brandChildAddManage'),
            name: 'BrandChildAddManage',
            hidden: true,
            meta: {
                title: '新增二级品牌'
            }
        },
        {
            path: 'brandSpeAddManage',
            component: () => import('@/views/brandManage/brandSpeAddManage'),
            name: 'BrandSpeAddManage',
            hidden: true,
            meta: {
                title: '新增专题'
            }
        }
    ]
}
export default brandManageRouter
