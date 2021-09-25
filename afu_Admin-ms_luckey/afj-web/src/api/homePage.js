import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 首页列表
export function homePageList(data) {
  return request({
    url: '/admin/home/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增首页
export function homePageAdd(data) {
  return request({
    url: '/admin/home/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 首页上下移动
export function homePageMoveUpOrDown(data) {
  return request({
    url: '/admin/home/moveUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 首页上下架
export function homePageUpdatestatus(data) {
  return request({
    url: '/admin/home/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 首页删除
export function homePageDelete(data) {
  return request({
    url: '/admin/home/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 首页批量上下架
export function homePageBatchUpOrDown(data) {
  return request({
    url: '/admin/home/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 首页批量删除
export function homePageBatchDel(data) {
  return request({
    url: '/admin/home/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}