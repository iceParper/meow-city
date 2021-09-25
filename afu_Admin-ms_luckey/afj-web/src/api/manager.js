import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 客户经理列表
export function managerList(data) {
  return request({
    url: '/admin/customerService/search',
    method: 'post',
    data: requestParams(data)
  })
}

// 客户经理管理页面点了管理调接口
// export function manList(data) {
//   return request({
//     url: '/yumeng/list',
//     method: 'post',
//     data: requestParams(data)
//   })
// }

// 客户经理新增或编辑
export function managerAddOrUpdate(data) {
  return request({
    url: '/admin/customerService/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 更改客户经理状态
export function managerUpdatestatus(data) {
  return request({
    url: '/admin/customerService/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除客户经理
export function managerDel(data) {
  return request({
    url: '/admin/customerService/del',
    method: 'post',
    data: requestParams(data)
  })
}

// 关联账号
export function managerRelation(data) {
  return request({
    url: '/admin/customerService/relation',
    method: 'post',
    data: requestParams(data)
  })
}