import request from '@/utils/ajax'

// 用户列表
export function userList(data) {
  return request({
    url: '/app/user/query',
    method: 'post',
    data: data
  })
}

// 冻结或启用用户
export function editStatus(data) {
  return request({
    url: '/app/user/modify/status',
    method: 'post',
    data: data
  })
}

// 用户详情
export function userDtl(data) {
  return request({
    url: '/app/user/detail',
    method: 'post',
    data: data
  })
}

// 切换店铺
export function changeCurShop(data) {
  return request({
    url: '/app/user/modify/current/store',
    method: 'post',
    data: data
  })
}


// 增加抽奖次数
export function addTimes(data) {
  return request({
    url: '/app/user/ticket/add',
    method: 'post',
    data: data
  })
}


export function shopSelList(data) {
  return request({
    url: '/store/selective/list',
    method: 'post',
    data: data
  })
}



export function userDownloadExcle(data) {
  return request({
      method: 'post',
      header: { 'Content-Type': 'application/xls' },
      responseType: 'blob',
      url: '/app/user/export',
      data: data
  })
}