/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const operationManageRouter = {
    path: '/operationManage',
    component: Layout,
    redirect: '/operationManage/homePageManage',
    alwaysShow: true,
    name: 'OperationManage',
    meta: {
        title: '运营管理',
        icon: 'operation',
        roles: ['OperationManage']
    },
    children: [
        {
            path: 'homePageManage',
            component: () => import('@/views/operationManage/homePageManage'),
            name: 'HomePageManage',
            meta: {
                title: '轮播图管理',
                roles: ['BannerManage']
            }
        },
        {
            path: 'messageListManage',
            component: () => import('@/views/operationManage/messageListManage'),
            name: 'MessageListManage',
            meta: {
                title: '信息管理',
                roles: ['NoticeManage']
            }
        },
        {
            path: 'homePageDtlManage',
            component: () => import('@/views/operationManage/homePageDtlManage'),
            name: 'HomePageDtlManage',
            meta: {
                title: '轮播图详情'
            },
            hidden: true
        },
        {
            path: 'messageDtlManage',
            component: () => import('@/views/operationManage/messageDtlManage'),
            name: 'MessageDtlManage',
            meta: {
                title: '通知详情'
            },
            hidden: true
        },
    ]
}
export default operationManageRouter
