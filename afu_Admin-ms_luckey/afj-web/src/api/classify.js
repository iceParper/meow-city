import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 分类列表
export function classifyList(data) {
  return request({
    url: '/admin/classify/search',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增分类
export function classifyAdd(data) {
  return request({
    url: '/admin/classify/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑分类
export function classifyUpdate(data) {
  return request({
    url: '/admin/classify/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 更改分类状态
export function classifyUpdatestatus(data) {
  return request({
    url: '/admin/classify/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量更改分类状态
export function classifyBatchUpOrDown(data) {
  return request({
    url: '/admin/classify/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除分类
export function classifyDelete(data) {
  return request({
    url: '/admin/classify/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除分类
export function classifyBetchDelete(data) {
  return request({
    url: '/admin/classify/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 分类详情
export function classifyDetail(data) {
  return request({
    url: '/admin/classify/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 子分类详情
export function subClassifyDetail(data) {
  return request({
    url: '/admin/classify/child/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增子分类
export function subClassifyAdd(data) {
  return request({
    url: '/admin/classify/child/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑子分类
export function subClassifyUpdate(data) {
  return request({
    url: '/admin/classify/child/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 更改子分类状态
export function subClassifyUpdatestatus(data) {
  return request({
    url: '/admin/classify/child/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 更改子分类状态
export function subClassifyBatchUpOrDown(data) {
  return request({
    url: '/admin/classify/child/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除子分类状态
export function subClassifyDelete(data) {
  return request({
    url: '/admin/classify/child/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除子分类状态
export function subClassifyBatchDelete(data) {
  return request({
    url: '/admin/classify/child/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 子分类列表
export function subClassifyList(data) {
  return request({
    url: '/admin/classify/child/search',
    method: 'post',
    data: requestParams(data)
  })
}

