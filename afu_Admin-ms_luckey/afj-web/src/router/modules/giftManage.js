/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const giftManageRouter = {
    path: '/giftManage',
    component: Layout,
    redirect: '/giftManage/giftListManage',
    alwaysShow: false,
    name: 'OperationManage',
    meta: {
        title: '中奖管理',
        icon: 'gift',
        // roles: ['OperationManage']
    },
    children: [
        {
            path: 'giftListManage',
            component: () => import('@/views/giftManage/giftListManage'),
            name: 'GiftListManage',
            meta: {
                title: '中奖列表',
                // roles: ['BannerManage']
            }
        }
    ]
}
export default giftManageRouter
