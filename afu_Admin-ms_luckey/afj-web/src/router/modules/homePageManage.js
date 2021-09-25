/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const homePageManageRouter = {
    path: '/homePageManage',
    component: Layout,
    redirect: '/homePageManage/bannerListManage',
    name: 'HomePageManage',
    alwaysShow: true,
    meta: {
        title: '首页管理',
        icon: 'xcx_home',
        roles: ['HomePageManage']
    },
    children: [
        {
            path: 'bannerListManage',
            component: () => import('@/views/homePageManage/bannerListManage'),
            name: 'BannerListManage',
            meta: { title: '轮播图列表', roles: ['HomePageBannerManage'] }
        }
    ]
}
export default homePageManageRouter