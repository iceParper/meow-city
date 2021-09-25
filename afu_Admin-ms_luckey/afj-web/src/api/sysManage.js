import request from '@/utils/ajax'

// 用户列表
export function userList(data) {
  return request({
    url: '/sys/user/list',
    method: 'post',
    data: data
  })
}

export function roleList(data) {
  return request({
    url: '/sys/role/list',
    method: 'post',
    data: data
  })
}

export function addUserManage(data) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data: data
  })
}

export function userManageDtl(data) {
  return request({
    url: '/sys/user/detail',
    method: 'post',
    data: data
  })
}

export function editUserManage(data) {
  return request({
    url: '/sys/user/modify',
    method: 'post',
    data: data
  })
}


export function editPsd(data) {
  return request({
    url: '/sys/user/restPassword',
    method: 'post',
    data: data
  })
}

export function delRole(data) {
  return request({
    url: '/sys/role/remove',
    method: 'post',
    data: data
  })
}

export function roleManageDtl(data) {
  return request({
    url: '/sys/role/detail',
    method: 'post',
    data: data
  })
}

export function rolePermissionTree(data) {
  return request({
    url: '/sys/role/permission/tree',
    method: 'post',
    data: data
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role/add',
    method: 'post',
    data: data
  })
}

export function editRole(data) {
  return request({
    url: '/sys/role/modify',
    method: 'post',
    data: data
  })
}

export function memberSelList(data) {
  return request({
    url: 'member/selection/list',
    method: 'post',
    data: data
  })
}

export function memberList(data) {
  return request({
    url: 'member/list',
    method: 'post',
    data: data
  })
}

export function memberAdd(data) {
  return request({
    url: 'member/add',
    method: 'post',
    data: data
  })
}

export function memberStatusEdit(data) {
  return request({
    url: 'member/modify/status',
    method: 'post',
    data: data
  })
}

export function memberDtl(data) {
  return request({
    url: 'member/detail',
    method: 'post',
    data: data
  })
}

export function memberDel(data) {
  return request({
    url: 'member/remove',
    method: 'post',
    data: data
  })
}


export function freightSelList(data) {
  return request({
    url: 'freight/selection/list',
    method: 'post',
    data: data
  })
}

export function freightList(data) {
  return request({
    url: 'freight/list',
    method: 'post',
    data: data
  })
}

export function freightAdd(data) {
  return request({
    url: 'freight/add',
    method: 'post',
    data: data
  })
}

export function freightStatusEdit(data) {
  return request({
    url: 'freight/modify/status',
    method: 'post',
    data: data
  })
}

export function freightDel(data) {
  return request({
    url: 'freight/remove',
    method: 'post',
    data: data
  })
}

export function provinceList(data) {
  return request({
    url: '/freight/provinceList',
    method: 'post',
    data: data
  })
}

export function merchantList(data) {
  return request({
    url: '/member/merchantList',
    method: 'post',
    data: data
  })
}

export function xcxList(data) {
  return request({
    url: '/sys/app/version/query',
    method: 'post',
    data: data
  })
}

export function xcxAdd(data) {
  return request({
    url: '/sys/app/version/add',
    method: 'post',
    data: data
  })
}

export function xcxEdit(data) {
  return request({
    url: '/sys/app/version/modify',
    method: 'post',
    data: data
  })
}