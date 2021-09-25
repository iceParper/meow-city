import request from '@/utils/request'
import requestParams from '@/utils/requestParams'
import service from "../utils/request";

// 订单列表
export function orderList(data) {
  return request({
    url: '/admin/order/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 物流公司列表
export function logisticsList(data) {
  return request({
    url: '/admin/logistics/list',
    method: 'post',
    data: requestParams(data)
  })
}

// =====================。点击查询物流信息
export function clickToCheckWL(data) {
  return request({
    url: 'yumeng/trackingNumberLogistics/',
    method: 'post',
    data: requestParams(data)
  })
}

export function clickToExport(data) {
  return request({
    url: '/admin/order/exportDetail',
    method: 'post',
    data: requestParams(data)
  })
}


// =====================。点击同意退款
export function clickToAgreeTK(data) {
  return request({
    url: '/pay/refund',
    method: 'post',
    data: requestParams(data)
  })
}




// 发货
export function orederSend(data) {
  return request({
    url: '/admin/logistics/sendOrder',
    method: 'post',
    data: requestParams(data)
  })
}

// 根据订单号查询订单
export function orederDetailOrderNumber(data) {
  return request({
    url: '/admin/order/detail/orderNumber',
    method: 'post',
    data: requestParams(data)
  })
}

// 订单详情
export function orederDetail(data) {
  return request({
    url: '/admin/order/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 备注
export function orederRemark(data) {
  return request({
    url: '/admin/order/remark',
    method: 'post',
    data: requestParams(data)
  })
}

// 售后列表
export function orederAfterList(data) {
  return request({
    url: '/admin/order/after/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 申请退货
export function applyReturn(data) {
  return request({
    url: '/admin/order/apply/return',
    method: 'post',
    data: requestParams(data)
  })
}

// 申请换货
export function applyChange(data) {
  return request({
    url: '/admin/order/apply/change',
    method: 'post',
    data: requestParams(data)
  })
}

// 同意/驳回售后订单
export function afterHandle(data) {
  return request({
    url: '/admin/order/after/handle',
    method: 'post',
    data: requestParams(data)
  })
}

// 售后订单发货
export function afterSendOrder(data) {
  return request({
    url: '/admin/order/after/sendOrder',
    method: 'post',
    data: requestParams(data)
  })
}

// =====================================。换货的在售后管理点击发货调用
export function afterSecondOrder(data) {
  return request({
    url: '/admin/order/after/secondOrder',
    method: 'post',
    data: requestParams(data)
  })
}



// 售后订单备注
export function afterRemark(data) {
  return request({
    url: '/admin/order/after/remark',
    method: 'post',
    data: requestParams(data)
  })
}



//订单导出
export function  downloadExcle(data) {
  return request({
    method: 'post',
    header: {'Content-Type': 'application/xls'},
    responseType: 'blob',　
    url: 'admin/export/excel/order',
    data:  requestParams(data)
  })
}

// 重新发货
export function sendOrderAgain(data) {
  return request({
    url: 'admin/order/againSendEcp',
    method: 'post',
    data: requestParams(data)
  })
}

// 获取订单详情

export function getOrderDtl(data) {
  return request({
    url: '/admin/order/detail',
    method: 'post',
    data: requestParams(data)
  })
}
