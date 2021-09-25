import request from '@/utils/ajax'

export function dealersList(data) {
    return request({
        url: '/loan/car/dealers/query',
        method: 'post',
        data: data
    })
}

export function addDealers(data) {
    return request({
        url: '/loan/car/dealers/add',
        method: 'post',
        data: data
    })
}

export function custmagerSelList(data) {
    return request({
        url: '/custmager/selection/query',
        method: 'post',
        data: data
    })
}

export function editDealers(data) {
    return request({
        url: '/loan/car/dealers/modify',
        method: 'post',
        data: data
    })
}

export function editDealersStatus(data) {
    return request({
        url: '/loan/car/dealers/modify/status',
        method: 'post',
        data: data
    })
}

export function dealersAuth(data) {
    return request({
        url: '/loan/car/dealers/auth/sms',
        method: 'post',
        data: data
    })
}

export function dealersDtl(data) {
    return request({
        url: '/loan/car/dealers/detail',
        method: 'post',
        data: data
    })
}

export function borrowRecards(data) {
    return request({
        url: '/loan/car/dealers/loadRepayment/query',
        method: 'post',
        data: data
    })
}


export function quotaChangeRecards(data) {
    return request({
        url: '/loan/car/dealers/quota/chg/query',
        method: 'post',
        data: data
    })
}


export function applyQuotaList(data) {
    return request({
        url: '/loan/car/dealers/quota/query',
        method: 'post',
        data: data
    })
}

export function applyQuota(data) {
    return request({
        url: '/loan/car/dealers/quota/apply',
        method: 'post',
        data: data
    })
}

export function editQuotaStatus(data) {
    return request({
        url: '/loan/car/dealers/modify/status',
        method: 'post',
        data: data
    })
}

export function applyBorrowMoneyList(data) {
    return request({
        url: '/loan/loan/apply/query',
        method: 'post',
        data: data
    })
}

export function applyBorrowQuickLoanList(data) {
    return request({
        url: '/loan/loan/apply/quickLoan/query',
        method: 'post',
        data: data
    })
}

export function applyBorrowMoney(data) {
    return request({
        url: '/loan/loan/apply',
        method: 'post',
        data: data
    })
}

export function applyQuickLoan(data) {
    return request({
        url: '/loan/loan/apply/quickLoan',
        method: 'post',
        data: data
    })
}


export function applyBorrowDtl(data) {
    return request({
        url: '/loan/loan/apply/detail',
        method: 'post',
        data: data
    })
}


export function carSelList(data) {
    return request({
        url: '/risk/car/selection/query',
        method: 'post',
        data: data
    })
}


export function paymentList(data) {
    return request({
        url: '/loan/loan/payment/query',
        method: 'post',
        data: data
    })
}

export function paymentDtl(data) {
    return request({
        url: '/loan/loan/payment/detail',
        method: 'post',
        data: data
    })
}


export function payment(data) {
    return request({
        url: '/loan/loan/payment',
        method: 'post',
        data: data
    })
}

export function borrowMoneyList(data) {
    return request({
        url: '/loan/loan/query',
        method: 'post',
        data: data
    })
}

export function borrowMoneyDtl(data) {
    return request({
        url: '/loan/loan/detail',
        method: 'post',
        data: data
    })
}

export function repaymentPlanList(data) {
    return request({
        url: '/loan/repayment/plan/query',
        method: 'post',
        data: data
    })
}


export function repaymentRecordList(data) {
    return request({
        url: '/loan/repayment/record/query',
        method: 'post',
        data: data
    })
}

export function repaymentPlanApply(data) {
    return request({
        url: '/loan/repayment/apply',
        method: 'post',
        data: data
    })
}

export function loanDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/loan/loan/query/export',
        data: data
    })
}



export function repaymentPlanDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/loan/repayment/plan/query/export',
        data: data
    })
}


export function repaymentRecordDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/loan/repayment/record/query/export',
        data: data
    })
}


export function dealersDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/loan/car/dealers/query/export',
        data: data
    })
}

export function applyBorrowMoneyDtl(data) {
    return request({
        url: '/loan/loan/apply/detail',
        method: 'post',
        data: data
    })
}

export function editApplyBorrowMoney(data) {
    return request({
        url: '/loan/loan/apply/modify',
        method: 'post',
        data: data
    })
}

export function quickLoanDtl(data) {
    return request({
        url: '/loan/loan/apply/quickLoan/detail',
        method: 'post',
        data: data
    })
}

export function editQuickLoan(data) {
    return request({
        url: '/loan/loan/apply/quickLoan/modify',
        method: 'post',
        data: data
    })
}


export function repaymentApplyDtl(data) {
    return request({
        url: '/loan/repayment/apply/detail',
        method: 'post',
        data: data
    })
}

export function editRepaymentApply(data) {
    return request({
        url: '/loan/repayment/apply/modify',
        method: 'post',
        data: data
    })
}


export function quotaApplyDtl(data) {
    return request({
        url: '/loan/car/dealers/quota/apply/detail',
        method: 'post',
        data: data
    })
}

export function editQuotaApply(data) {
    return request({
        url: '/loan/car/dealers/quota/apply/modify',
        method: 'post',
        data: data
    })
}

export function cancelPayment(data) {
    return request({
        url: '/loan/loan/payment/cancel',
        method: 'post',
        data: data
    })
}