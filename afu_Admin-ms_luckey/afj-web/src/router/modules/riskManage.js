/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const riskManageRouter = {
    path: '/riskManage',
    component: Layout,
    redirect: '/riskManage/propertyOwnerManage',
    alwaysShow: true,
    name: 'RiskManage',
    meta: {
        title: '风险管理',
        icon: 'risk',
        roles: ['RiskManage']
    },
    children: [
        {
            path: 'propertyOwnerManage',
            component: () => import('@/views/riskManage/propertyOwnerManage'),
            name: 'PropertyOwnerManage',
            meta: {
                title: '产权人列表',
                roles: ['RiskPropeertyOwnerManage']
            }
        },
        {
            path: 'vehicleFilesManage',
            component: () => import('@/views/riskManage/vehicleFilesManage'),
            name: 'VehicleFilesManage',
            meta: {
                title: '车辆档案',
                roles: ['RiskCarManage']
            }
        },
        {
            path: 'inspectPlanManage',
            component: () => import('@/views/riskManage/inspectPlanManage'),
            name: 'InspectPlanManage',
            meta: {
                title: '巡检计划',
                roles: ['RiskInspectionPlanManage']
            }
        },
        {
            path: 'todayInspectManage',
            component: () => import('@/views/riskManage/todayInspectManage'),
            name: 'TodayInspectManage',
            meta: {
                title: '今日巡检',
                roles: ['RiskTodayInspectionManage']
            }
        },
        {
            path: 'inspectRecordManage',
            component: () => import('@/views/riskManage/inspectRecordManage'),
            name: 'InspectRecordManage',
            meta: {
                title: '巡检记录',
                roles: ['RiskInspectionManage']
            }
        },
        {
            path: 'noInspectionList',
            component: () => import('@/views/riskManage/noInspectionList'),
            name: 'NoInspectionList',
            meta: {
                title: '未巡检报警',
                roles: ['RiskNoInspection']
            },
        },
        // {
        //     path: 'unusualRecordManage',
        //     component: () => import('@/views/riskManage/unusualRecordManage'),
        //     name: 'UnusualRecordManage',
        //     meta: {
        //         title: '异常记录',
        //         // roles: ['MerchantList']
        //     }
        // },
        {
            path: 'addPropertyOwnerManage',
            component: () => import('@/views/riskManage/addPropertyOwnerManage'),
            name: 'AddPropertyOwnerManage',
            meta: {
                title: '新建产权人',
                // roles: ['MerchantList']
            },
            hidden: true
        },
        {
            path: 'addVehicleManage',
            component: () => import('@/views/riskManage/addVehicleManage'),
            name: 'AddVehicleManage',
            meta: {
                title: '新建车辆',
                // roles: ['MerchantList']
            },
            hidden: true
        },

        {
            path: 'vehicleFilesDtlManage',
            component: () => import('@/views/riskManage/vehicleFilesDtlManage'),
            name: 'VehicleFilesDtlManage',
            meta: {
                title: '车辆详情'
            },
            hidden: true
        },
        {
            path: 'propertyOwnerDtlManage',
            component: () => import('@/views/riskManage/propertyOwnerDtlManage'),
            name: 'PropertyOwnerDtlManage',
            meta: {
                title: '产权人详情'
            },
            hidden: true
        },
        {
            path: 'inspectPlanDtlManage',
            component: () => import('@/views/riskManage/inspectPlanDtlManage'),
            name: 'InspectPlanDtlManage',
            meta: {
                title: '巡检计划详情',
                // roles: ['MerchantList']
            },
            hidden: true
        },
        {
            path: 'todayInspectDtlManage',
            component: () => import('@/views/riskManage/todayInspectDtlManage'),
            name: 'TodayInspectDtlManage',
            meta: {
                title: '今日巡检详情',
                // roles: ['MerchantList']
            },
            hidden: true
        },
        {
            path: 'inspectRecordDtlManage',
            component: () => import('@/views/riskManage/inspectRecordDtlManage'),
            name: 'InspectRecordDtlManage',
            meta: {
                title: '巡检记录详情',
                // roles: ['MerchantList']
            },
            hidden: true
        },
        {
            path: 'noInspectDtlManage',
            component: () => import('@/views/riskManage/noInspectDtlManage'),
            name: 'NoInspectDtlManage',
            meta: {
                title: '未巡检详情',
            },
            hidden: true
        },
    ]
}
export default riskManageRouter
