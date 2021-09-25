import request from '@/utils/ajax'

export function productSelList(data) {
    return request({
        url: 'product/selection/list',
        method: 'post',
        data: data
    })
}

// 商品列表
export function productList(data) {
    return request({
        url: 'product/list',
        method: 'post',
        data: data
    })
}

// 商品详情
export function productDtl(data) {
    return request({
        url: 'product/detail',
        method: 'post',
        data: data
    })
}

// 新增商品
export function productAdd(data) {
    return request({
        url: 'product/add',
        method: 'post',
        data: data
    })
}

// 修改商品
export function productEdit(data) {
    return request({
        url: 'product/modify',
        method: 'post',
        data: data
    })
}

// 修改商品状态
export function productEditStatus(data) {
    return request({
        url: 'product/modify/status',
        method: 'post',
        data: data
    })
}

// 删除商品
export function delProduct(data) {
    return request({
        url: 'product/remove',
        method: 'post',
        data: data
    })
}

