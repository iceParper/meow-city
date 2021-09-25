import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 商品列表
export function productList(data) {
  return request({
    url: 'admin/product/new/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 商品详情
export function productDetail(data) {
  return request({
    url: '/admin/product/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增商品
export function productAdd(data) {
  return request({
    url: '/admin/product/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增商品
export function productNewAdd(data) {
  return request({
    url: '/admin/product/new/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑商品
export function productNewUpdate(data) {
  return request({
    url: '/admin/product/new/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 商品详情
export function productNewDetail(data) {
  return request({
    url: '/admin/product/new/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑商品
export function productUpdate(data) {
  return request({
    url: '/admin/product/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 上下架商品
export function upOrDown(data) {
  return request({
    url: '/admin/product/upOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量上下架商品
export function batchUpOrDown(data) {
  return request({
    url: '/admin/product/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除商品
export function productDelete(data) {
  return request({
    url: '/admin/product/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除商品
export function productBatchDel(data) {
  return request({
    url: '/admin/product/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 根据货号查询商品详情
export function productByItemNumber(data) {
  return request({
    url: '/admin/product/new/itemNumber',
    method: 'post',
    data: requestParams(data)
  })
}
