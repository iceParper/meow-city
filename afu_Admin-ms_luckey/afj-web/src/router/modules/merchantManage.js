/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const merchantManageRouter = {
  path: '/merchantManage',
  component: Layout,
  redirect: '/merchantManage/applyListManage',
  alwaysShow: true,
  name: 'MerchantManage',
  meta: {
    title: '商户管理',
    icon: 'merchant_new',
    roles: ['MerchantManage']
  },
  children: [
    {
      path: 'applyListManage',
      component: () => import('@/views/merchantManage/applyListManage'),
      name: 'ApplyListManage',
      meta: {
        title: '申请商户',
        roles: ['MerchantApplyList']
      }
    },
    {
      path: 'merchantListManage',
      component: () => import('@/views/merchantManage/merchantListManage'),
      name: 'MerchantListManage',
      meta: {
        title: '商户列表',
        roles: ['MerchantList']
      }
    },
    {
      path: 'creditApplyListManage',
      component: () => import('@/views/merchantManage/creditApplyListManage'),
      name: 'CreditApplyListManage',
      meta: {
        title: '赊销审核列表',
        roles: ['MerchantCreditApplyList']
      }
    },
    {
      path: 'creditApplyManage',
      component: () => import('@/views/merchantManage/creditApplyManage'),
      hidden: true,
      name: 'CreditApplyManage',
      meta: {
        title: '实名认证'
      }
    },
    {
      path: 'creditMerchantListManage',
      component: () => import('@/views/merchantManage/creditMerchantListManage'),
      name: 'CreditMerchantListManage',
      meta: {
        title: '赊销商户列表'
      }
    },
    {
      path: 'creditApplyEditManage',
      component: () => import('@/views/merchantManage/creditApplyEditManage'),
      hidden: true,
      name: 'CreditApplyEditManage',
      meta: {
        title: '赊销修改'
      }
    },
    {
      path: 'creditApplyDtlManage',
      component: () => import('@/views/merchantManage/creditApplyDtlManage'),
      hidden: true,
      name: 'CreditApplyDtlManage',
      meta: {
        title: '赊销详情'
      }
    },
    {
      path: 'creditContractListManage',
      component: () => import('@/views/merchantManage/creditContractListManage'),
      name: 'CreditContractListManage',
      roles: ['OrderCreditList'],
      meta: {
        title: '赊销合约列表'
      }
    },
    {
      path: 'creditContractManage',
      component: () => import('@/views/merchantManage/creditContractManage'),
      name: 'CreditContractManage',
      meta: {
        title: '赊销合约审核'
      },
      hidden: true
    },
    {
      path: 'applyMerchantManage',
      component: () => import('@/views/merchantManage/applyMerchantManage'),
      name: 'ApplyMerchantManage',
      meta: {
        title: '商户申请审核'
      },
      hidden: true
    },
    {
      path: 'editMerchantManage',
      component: () => import('@/views/merchantManage/editMerchantManage'),
      name: 'EditMerchantManage',
      meta: {
        title: '修改商户信息'
      },
      hidden: true
    },
    {
      path: 'usersOfMerchantManage',
      component: () => import('@/views/merchantManage/usersOfMerchantManage'),
      name: 'UsersOfMerchantManage',
      meta: {
        title: '商户－用户列表'
      },
      hidden: true
    },
    {
      path: 'addUser_MerManage',
      component: () => import('@/views/merchantManage/addUser_MerManage'),
      name: 'AddUser_MerManage',
      meta: {
        title: '商户－添加用户'
      },
      hidden: true
    }
  ]
}
export default merchantManageRouter
