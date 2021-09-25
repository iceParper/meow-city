import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 品牌列表
export function brandList(data) {
  return request({
    url: '/admin/brand/search',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增品牌
export function brandAdd(data) {
  return request({
    url: '/admin/brand/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增品牌接口
export function brandAddWithChild(data) {
  return request({
    url: '/admin/brand/addWithChild',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑品牌
export function brandUpdate(data) {
  return request({
    url: '/admin/brand/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 上下架品牌
export function brandUpdatestatus(data) {
  return request({
    url: '/admin/brand/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量上下架品牌
export function brandBatchUpOrDown(data) {
  return request({
    url: '/admin/brand/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除品牌
export function brandDelete(data) {
  return request({
    url: '/admin/brand/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除品牌
export function brandBatchDelete(data) {
  return request({
    url: '/admin/brand/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 品牌详情
export function brandDetail(data) {
  return request({
    url: '/admin/brand/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 品牌详情
export function brandInfo(data) {
  return request({
    url: '/admin/brand/detail/info',
    method: 'post',
    data: requestParams(data)
  })
}

// 二级品牌详情
export function brandChildDetail(data) {
  return request({
    url: '/admin/brand/child/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增二级品牌
export function brandChildAdd(data) {
  return request({
    url: '/admin/brand/child/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑二级品牌
export function brandChildUpdate(data) {
  return request({
    url: '/admin/brand/child/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 上下架二级品牌
export function brandChildUpdatestatus(data) {
  return request({
    url: '/admin/brand/child/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量上下架品牌
export function brandChildBatchUpOrDown(data) {
  return request({
    url: '/admin/brand/child/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除二级品牌
export function brandChildDelete(data) {
  return request({
    url: '/admin/brand/child/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除二级品牌
export function brandChildBatchDelete(data) {
  return request({
    url: '/admin/brand/child/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 二级品牌列表
export function brandChildList(data) {
  return request({
    url: '/admin/brand/child/search',
    method: 'post',
    data: requestParams(data)
  })
}