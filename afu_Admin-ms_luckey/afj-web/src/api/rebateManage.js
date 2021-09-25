import request from '@/utils/ajax'

export function rebateList(data) {
    return request({
        url: '/rebate/query',
        method: 'post',
        data: data
    })
}


export function rebateDtl(data) {
    return request({
        url: '/rebate/detail',
        method: 'post',
        data: data
    })
}

export function rebateChg(data) {
    return request({
        url: '/rebate/chg/query',
        method: 'post',
        data: data
    })
}

export function editRebateStatus(data) {
    return request({
        url: '/rebate/modify/status',
        method: 'post',
        data: data
    })
}


export function rebateDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/rebate/query/export',
        data: data
    })
}


export function rebateChgDtl(data) {
    return request({
        url: '/rebate/detail/query',
        method: 'post',
        data: data
    })
}




export function applyRebate(data) {
    return request({
        url: '/rebate/apply',
        method: 'post',
        data: data
    })
}

export function editRebate(data) {
    return request({
        url: '/rebate/chg/apply',
        method: 'post',
        data: data
    })
}

export function rebateApplyList(data) {
    return request({
        url: '/rebate/apply/query',
        method: 'post',
        data: data
    })
}

export function rebateApplyDtl(data) {
    return request({
        url: '/rebate/apply/detail',
        method: 'post',
        data: data
    })
}

export function editApplyRebate(data) {
    return request({
        url: '/rebate/apply/modify',
        method: 'post',
        data: data
    })
}