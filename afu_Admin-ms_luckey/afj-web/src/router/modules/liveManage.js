import Layout from '@/layout'

const liveManageRouter = {
    path: '/liveManage',
    component: Layout,
    redirect: '/classifyManage/liveListManage',
    alwaysShow: true,
    name: 'liveListManage',
    meta: {
        title: '直播管理',
        icon: 'liveList',
        roles: ['LiveManage']
    },
    children: [
        {
            path: 'liveListManage',
            component: () => import('@/views/liveManage/liveListManage'),
            name: 'LiveListManage',
            meta: {
                title: '直播列表',
                roles: ['LiveList']
            }
        }
    ]
}
export default liveManageRouter
