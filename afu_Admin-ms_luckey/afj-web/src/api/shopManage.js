import request from '@/utils/ajax'

export function shopList(data) {
    return request({
        url: '/store/query',
        method: 'post',
        data: data
    })
}

export function shopAdd(data) {
    return request({
        url: '/store/add',
        method: 'post',
        data: data
    })
}

export function shopEdit(data) {
    return request({
        url: '/store/modify',
        method: 'post',
        data: data
    })
}

export function editShopStatus(data) {
    return request({
        url: '/store/modify/status',
        method: 'post',
        data: data
    })
}


export function shopDtl(data) {
    return request({
        url: '/store/detail',
        method: 'post',
        data: data
    })
}
