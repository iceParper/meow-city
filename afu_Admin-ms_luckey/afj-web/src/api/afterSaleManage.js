import request from '@/utils/ajax'

// 售后列表
export function afterSaleList(data) {
    return request({
        url: 'post/sale/list',
        method: 'post',
        data: data
    })
}

// 售后详情
export function afterSaleDtl(data) {
    return request({
        url: 'post/sale/detail',
        method: 'post',
        data: data
    })
}

// 余额列表
export function balanceList(data) {
    return request({
        url: 'user/balance/list',
        method: 'post',
        data: data
    })
}

// 提现列表
export function txList(data) {
    return request({
        url: 'user/balance/withdrawal/list',
        method: 'post',
        data: data
    })
}

// 售后详情
export function balanceSaleDtl(data) {
    return request({
        url: 'user/balance/detail',
        method: 'post',
        data: data
    })
}

// 提现申请
export function txAudit(data) {
    return request({
        url: 'user/balance/withdrawal/audit',
        method: 'post',
        data: data
    })
}

// 余额调整
export function balanceEdit(data) {
    return request({
        url: 'user/balance/modify',
        method: 'post',
        data: data
    })
}

// 售后审核
export function afterSaleAudit(data) {
    return request({
        url: 'post/sale/audit',
        method: 'post',
        data: data
    })
}