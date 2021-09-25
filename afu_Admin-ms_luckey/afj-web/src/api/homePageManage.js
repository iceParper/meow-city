import request from '@/utils/ajax'

// 轮播图列表
export function homeBannerList(data) {
    return request({
        url: 'home/banner/list',
        method: 'post',
        data: data
    })
}

// 轮播图上下架
export function homePageBannerStatus(data) {
    return request({
        url: 'home/banner/modify/status',
        method: 'post',
        data: data
    })
}

// 删除轮播图
export function homePageBannerDel(data) {
    return request({
        url: 'home/banner/remove',
        method: 'post',
        data: data
    })
}

export function homePageEditSeq(data) {
    return request({
        url: 'home/banner/modify/seq',
        method: 'post',
        data: data
    })
}

export function homePageAdd(data) {
    return request({
        url: '/home/banner/add',
        method: 'post',
        data: data
    })
}

export function homePageEdit(data) {
    return request({
        url: 'home/banner/modify',
        method: 'post',
        data: data
    })
}