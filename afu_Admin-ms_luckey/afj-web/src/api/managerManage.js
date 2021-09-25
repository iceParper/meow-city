import request from '@/utils/ajax'

// 客户经理选择列表
export function managerSelList(data) {
    return request({
        url: '/cusmanager/selection/list',
        method: 'post',
        data: data
    })
}

// 客户经理列表
export function managerList(data) {
    return request({
        url: '/cusmanager/list',
        method: 'post',
        data: data
    })
}

// 客户经理详情
export function managerDtl(data) {
    return request({
        url: '/cusmanager/detail',
        method: 'post',
        data: data
    })
}

// 新增客户经理
export function managerAdd(data) {
    return request({
        url: '/cusmanager/add',
        method: 'post',
        data: data
    })
}

// 修改客户经理
export function managerEdit(data) {
    return request({
        url: '/cusmanager/modify',
        method: 'post',
        data: data
    })
}

// 修改客户经理状态
export function managerEditStatus(data) {
    return request({
        url: '/cusmanager/modify/status',
        method: 'post',
        data: data
    })
}

// 删除客户经理
export function managerDel(data) {
    return request({
        url: '/cusmanager/remove',
        method: 'post',
        data: data
    })
}

