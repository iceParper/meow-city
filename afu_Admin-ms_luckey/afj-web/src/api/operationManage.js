import request from '@/utils/ajax'

export function bannerList(data) {
    return request({
        url: '/operation/banner/query',
        method: 'post',
        data: data
    })
}

export function addBanner(data) {
    return request({
        url: '/operation/banner/add',
        method: 'post',
        data: data
    })
}

export function editBanner(data) {
    return request({
        url: '/operation/banner/modify',
        method: 'post',
        data: data
    })
}

export function editBannerStatus(data) {
    return request({
        url: '/operation/banner/modify/status',
        method: 'post',
        data: data
    })
}

export function bannerDtl(data) {
    return request({
        url: '/operation/banner/detail',
        method: 'post',
        data: data
    })
}

export function delBanner(data) {
    return request({
        url: '/operation/banner/remove',
        method: 'post',
        data: data
    })
}

export function editBannerSeq(data) {
    return request({
        url: '/operation/banner/modify/seq',
        method: 'post',
        data: data
    })
}

export function noticeList(data) {
    return request({
        url: '/operation/notice/query',
        method: 'post',
        data: data
    })
}

export function addNotice(data) {
    return request({
        url: '/operation/notice/add',
        method: 'post',
        data: data
    })
}

export function editNotice(data) {
    return request({
        url: '/operation/notice/modify',
        method: 'post',
        data: data
    })
}

export function editNoticeStatus(data) {
    return request({
        url: '/operation/notice/modify/status',
        method: 'post',
        data: data
    })
}

export function noticeDtl(data) {
    return request({
        url: '/operation/notice/detail',
        method: 'post',
        data: data
    })
}

export function delNotice(data) {
    return request({
        url: '/operation/notice/remove',
        method: 'post',
        data: data
    })
}



