import request from '@/utils/request'
import requestParams from '@/utils/requestParams'

// 角色列表
export function getRoleList(data) {
  return request({
    url: '/admin/role/list',
    method: 'post',
    data: requestParams(data)
  })
}
// =======================================


// 会员列表
export function getMemberList(data){
  return request({
    url: '/admin/member/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量修改会员
export function motifyMemberList(data){
  return request({
    url: '/admin/merchant/setMember',
    method: 'post',
    data: requestParams(data)
  })
}

// 冻结或启用会员
export function userUpdatestatus(data) {
  return request({
    url: '/admin/member/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

//新增会员接口
export function memberAdd(data){
  return request({
    url: '/admin/member/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除会员
export function memberDelete(data) {
  return request({
    url: '/admin/member/delete',
    method: 'post',
    data: requestParams(data)
  })
}



// =======================================
// 新增角色
export function roleAdd(data) {
  return request({
    url: '/admin/role/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑角色
export function roleUpdate(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 角色详情
export function roleDetail(data) {
  return request({
    url: '/admin/role/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除角色
export function roleDelete(data) {
  return request({
    url: '/admin/role/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 

// 账号列表
export function managerList(data) {
  return request({
    url: '/admin/manager/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 账号列表
export function accountList(data) {
  return request({
    url: '/admin/manager/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增账号
export function managerAdd(data) {
  return request({
    url: '/admin/manager/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 编辑账号
export function managerUpdate(data) {
  return request({
    url: '/admin/manager/update',
    method: 'post',
    data: requestParams(data)
  })
}

// 账号详情
export function managerDetail(data) {
  return request({
    url: '/admin/manager/detail',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除账号
export function managerDelete(data) {
  return request({
    url: '/admin/manager/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 运费规则列表
export function appletList(data) {
  return request({
    url: '/admin/freight/list',
    method: 'post',
    data: requestParams(data)
  })
}

// 新增运费规则
export function appletAdd(data) {
  return request({
    url: '/admin/freight/add',
    method: 'post',
    data: requestParams(data)
  })
}

// 冻结或启用运费规则
export function appletUpdatestatus(data) {
  return request({
    url: '/admin/freight/updatestatus',
    method: 'post',
    data: requestParams(data)
  })
}

// 删除运费规则
export function appletDelete(data) {
  return request({
    url: '/admin/freight/delete',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量启用/禁用运费规则
export function appletBatchUpOrDown(data) {
  return request({
    url: '/admin/freight/batchUpOrDown',
    method: 'post',
    data: requestParams(data)
  })
}

// 批量删除运费规则
export function appletBatchDel(data) {
  return request({
    url: '/admin/freight/batchDel',
    method: 'post',
    data: requestParams(data)
  })
}

// 获取省信息
export function getProvince(data) {
  return request({
    url: '/admin/merchant/getProvince',
    method: 'post',
    data: requestParams(data)
  })
}