import request from '@/utils/ajax'

// 购物车列表
export function cartList(data) {
    return request({
        url: 'merchant/user/list',
        method: 'post',
        data: data
    })
}

// 购物车详情
export function cartDtl(data) {
    return request({
        url: 'car/detail',
        method: 'post',
        data: data
    })
}

// 修改购物车
export function editCart(data) {
    return request({
        url: '/car/modify',
        method: 'post',
        data: data
    })
}

// 选择商品
export function selectGoods(data) {
    return request({
        url: '/product/selection/detail',
        method: 'post',
        data: data
    })
}