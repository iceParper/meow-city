import request from '@/utils/ajax'

export function roleList(data) {
    return request({
        url: '/sys/role/query',
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

export function rolePermissionTree(data) {
    return request({
        url: '/sys/role/permission/selection/query',
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

export function userDtl(data) {
    return request({
        url: '/sys/user/detail',
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

export function delRole(data) {
    return request({
        url: '/sys/role/remove',
        method: 'post',
        data: data
    })
}

export function editRoleStatus(data) {
    return request({
        url: '/sys/role/modify/status',
        method: 'post',
        data: data
    })
}

export function userList(data) {
    return request({
        url: '/sys/user/query',
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

export function delUser(data) {
    return request({
        url: '/sys/user/remove',
        method: 'post',
        data: data
    })
}

export function editUserStatus(data) {
    return request({
        url: '/sys/user/modify/status',
        method: 'post',
        data: data
    })
}

export function roleListQuery(data) {
    return request({
        url: '/sys/role/selection/query',
        method: 'post',
        data: data
    })
}

export function companyListQuery(data) {
    return request({
        url: '/company/selection/query',
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