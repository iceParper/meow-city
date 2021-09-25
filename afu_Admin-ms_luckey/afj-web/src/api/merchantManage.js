import request from '@/utils/ajax'

// 申请列表
export function applyList(data) {
    return request({
        url: '/merchant/apply/list',
        method: 'post',
        data: data
    })
}
// 审核
export function audit(data) {
    return request({
        url: '/merchant/apply/audit',
        method: 'post',
        data: data
    })
}

// 商户列表
export function merchantList(data) {
    return request({
        url: '/merchant/list',
        method: 'post',
        data: data
    })
}

// 商户详情
export function merchantDtl(data) {
    return request({
        url: '/merchant/detail',
        method: 'post',
        data: data
    })
}



// 商户编辑
export function merchantEdit(data) {
    return request({
        url: '/merchant/modify',
        method: 'post',
        data: data
    })
}
// 商户编辑冻结/启用状态
export function merchantEditStatus(data) {
    return request({
        url: '/merchant/modify/status',
        method: 'post',
        data: data
    })
}
// 商户用户列表
export function memberEidt(data) {
    return request({
        method: 'post',
        url: '/merchant/modify/member',
        data: data
    })
}
// 商户有效期
export function upDateExpiryDate(data) {
    return request({
        method: 'post',
        url: 'merchant/modify/expiry',
        data: data
    })
}
// 添加商户用户
export function addUser(data) {
    return request({
        method: 'post',
        url: 'merchant/user/add',
        data: data
    })
}
// 商户用户列表
export function userList(data) {
    return request({
        method: 'post',
        url: 'merchant/user/list',
        data: data
    })
}

// 删除用户
export function userDel(data) {
    return request({
        url: 'merchant/user/remove',
        method: 'post',
        data: data
    })
}

// 商户用户编辑
export function userEdit(data) {
    return request({
        method: 'post',
        url: 'merchant/user/modify',
        data: data
    })
}
// 品牌列表
export function brandList(data) {
    return request({
        method: 'post',
        url: 'brand/selection/list',
        data: data
    })
}
// 会员列表
export function memberList(data) {
    return request({
        method: 'post',
        url: 'member/selection/list',
        data: data
    })
}
// 客服列表
export function cusManagerList(data) {
    return request({
        method: 'post',
        url: 'cusmanager/selection/list',
        data: data
    })
}

//申请赊账列表
export function creditApplyList(data) {
    return request({
        method: 'post',
        url: 'merchant/credit/apply/list',
        data: data
    })
}

//赊账审核
export function creditApplyAudit(data) {
    return request({
        method: 'post',
        url: 'merchant/credit/apply/audit',
        data: data
    })
}


// 赊账订单列表
export function creditList(data) {
    return request({
        url: '/order/credit/list',
        method: 'post',
        data: data
    })
}

// 赊账订单详情
export function creditDtl(data) {
    return request({
        url: '/order/credit/detail',
        method: 'post',
        data: data
    })
}


// 赊账订单详情
export function contractDownLoad(urlParams) {
    return request({
        url: '/order/credit/contract/' + urlParams,
        method: 'get',
        data: {}
    })
}


// 赊账订单审核
export function creditOrderAudit(data) {
    return request({
        url: '/order/credit/audit',
        method: 'post',
        data: data
    })
}

// 赊账订单修改
export function creditOrderEdit(data) {
    return request({
        url: '/order/modify/creditOrder',
        method: 'post',
        data: data
    })
}

// 赊账商户列表
export function creditMerchantList(data) {
    return request({
        url: 'merchant/credit/merchant/list',
        method: 'post',
        data: data
    })
}

// 赊账商户详情
export function creditApplyDtl(data) {
    return request({
        url: '/merchant/credit/detail',
        method: 'post',
        data: data
    })
}

// 赊账商户修改
export function creditApplyEdit(data) {
    return request({
        url: '/merchant/credit/modify',
        method: 'post',
        data: data
    })
}

// 批量修改品牌
export function editBrand(data) {
    return request({
        url: '/merchant/modify/brand',
        method: 'post',
        data: data
    })
}

//订单导出
export function downloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/order/credit/export',
        data: data
    })
}

