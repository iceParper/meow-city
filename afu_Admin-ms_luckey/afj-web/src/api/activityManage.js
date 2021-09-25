import request from '@/utils/ajax'

export function activityList(data) {
    return request({
        url: '/lottery/query',
        method: 'post',
        data: data
    })
}

export function activityDtl(data) {
    return request({
        url: '/lottery/detail',
        method: 'post',
        data: data
    })
}

export function activityAdd(data) {
    return request({
        url: '/lottery/add',
        method: 'post',
        data: data
    })
}

export function activityEdit(data) {
    return request({
        url: '/lottery/modify',
        method: 'post',
        data: data
    })
}

export function activityEditStatus(data) {
    return request({
        url: '/lottery/modify/status',
        method: 'post',
        data: data
    })
}

