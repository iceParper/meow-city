import request from '@/utils/ajax'

// 用户列表
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data: data
  })
}

export function orderDtl(data) {
  return request({
    url: '/order/detail',
    method: 'post',
    data: data
  })
}


export function orderRemark(data) {
  return request({
    url: '/order/remark',
    method: 'post',
    data: data
  })
}


export function orderSend(data) {
  return request({
    url: '/order/manual/send',
    method: 'post',
    data: data
  })
}


export function sendOrderAgain(data) {
  return request({
    url: '/order/again/send',
    method: 'post',
    data: data
  })
}

export function logisticsInfo(data) {
  return request({
    url: '/order/logistics',
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
    url: '/order/export',
    data: data
  })
}

//物流公司
export function logisticsCompany(data) {
  return request({
    method: 'post',
    url: '/order/logistics/companyList',
    data: data
  })
}

// 修改为手工单
export function editManualOrder(data) {
  return request({
    url: 'order/modify/manualOrder',
    method: 'post',
    data: data
  })
}