import request from '@/utils/ajax'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: {
        ...data
    }
  })
}

export function loginOut(data) {
  return request({
    url: '/logout',
    method: 'post',
    data: {
        ...data
    }
  })
}


export function editPsd(data) {
  return request({
    url: '/modify/password',
    method: 'post',
    data: {
        ...data
    }
  })
}

