import request from '@/utils/ajax'
import requestParams from '@/utils/requestParams'

// 待审核商户信息列表
// export function auditList(data) {
//   return request({
//     url: '/admin/merchant/audit/list',
//     method: 'post',
//     data: requestParams(data)
//   })
// }

// // 审核商户信息
// export function auditAudit(data) {
//   return request({
//     url: '/admin/merchant/audit/audit',
//     method: 'post',
//     data: requestParams(data)
//   })
// }

export function auditWaitList(data) {
  return request({
    url: '/dashboard/info',
    method: 'post',
    data: requestParams(data)
  })
}

export function actionRecord(data) {
  return request({
    url: '/dashboard/inspection/action/recordCMS',
    method: 'post',
    data: requestParams(data)
  })
}

export function querydashboard(data) {
  return request({
    url: '/workflow/auditing/querydashboard',
    method: 'post',
    data: data
  })
}


export function chartPercent(data) {
  return request({
    url: '/dashboard/InspectionCalendarChartPercent',
    method: 'post',
    data: data
  })
}



export function stackedChartData(data) {
  return request({
    url: '/dashboard/loan/stacked/bar/chart',
    method: 'post',
    data: requestParams(data)
  })
}


export function loanChartData(data) {
  return request({
    url: '/dashboard/loan/stacked/bar/chart',
    method: 'post',
    data: data
  })
}



export function inspectionChartData(data) {
  return request({
    url: '/dashboard/inspection/stacked/bar/chart',
    method: 'post',
    data: data
  })
}



export function repaymentChartData(data) {
  return request({
    url: '/dashboard/plan/repayment/histogram',
    method: 'post',
    data: data
  })
}


export function todayActList(data) {
  return request({
    url: '/writeoff/today/participate/list',
    method: 'post',
    data: data
  })
}


export function todayGiftList(data) {
  return request({
    url: '/writeoff/today/list',
    method: 'post',
    data: data
  })
}


export function writeoffAwardList(data) {
  return request({
    url: '/writeoff/award/query',
    method: 'post',
    data: data
  })
}


export function writeoff(data) {
  return request({
    url: '/writeoff/batch/modify/status',
    method: 'post',
    data: data
  })
}


export function storeInfo(data) {
  return request({
    url: '/dashboard/store/info',
    method: 'post',
    data: data
  })
}


export function qrCode(data) {
  return request({
    url: '/writeoff/qr/code',
    method: 'post',
    data: data
  })
}