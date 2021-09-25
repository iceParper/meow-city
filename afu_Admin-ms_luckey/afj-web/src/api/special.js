import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 专题列表
export function specialList(data) {
  return request({
    url: '/admin/special/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增专题
export function specialAdd(data) {
  return request({
    url: '/admin/special/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增专题new
export function specialAddNew(data) {
  return request({
    url: '/admin/special/add/new',
    method: 'post',
    data: requestParams(data)
  })
}

// 专题详情new
export function specialDetailNew(data) {
  return request({
    url: '/admin/special/info/new',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑专题new
export function specialUpdateNew(data) {
  return request({
    url: '/admin/special/update/new',
    method: 'post',
    data: requestParams(data)
  })
}

// 专题详情
export function specialDetail(data) {
  return request({
    url: '/admin/special/info',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑专题
export function specialUpdate(data) {
  return request({
    url: '/admin/special/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 修改专题上下架状态
export function specialUpdatestatus(data) {
  return request({
    url: '/admin/special/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量修改专题上下架状态
export function specialBatchUpOrDown(data) {
  return request({
    url: '/admin/special/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除专题
export function specialBatchDel(data) {
  return request({
    url: '/admin/special/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}