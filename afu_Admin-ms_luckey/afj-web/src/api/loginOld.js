import request from '@/utils/request'

export function loginIn(data) {
    return request({
      url: '/admin/login',
      method: 'post',
      data: {
        'head': {},
        'body': {
          ...data
        }
      }
    })
  }
