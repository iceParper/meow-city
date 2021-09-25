import request from '@/utils/ajax'

// 轮播图列表
export function giftList(data) {
    return request({
        url: 'app/user/award/query',
        method: 'post',
        data: data
    })
}


export function selectiveSelList(data) {
    return request({
        url: 'lottery/selective/list',
        method: 'post',
        data: data
    })
}


export function writeOffStatus(data) {
    return request({
        url: 'app/user/award/modify/writeoff/status',
        method: 'post',
        data: data
    })
}

export function rotationStatus(data) {
    return request({
        url: 'app/user/award/modify/rotation/status',
        method: 'post',
        data: data
    })
}


export function createFakeData(data) {
    return request({
        url: 'app/user/award/fake/data/add',
        method: 'post',
        data: data
    })
}

