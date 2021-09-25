import request from '@/utils/request'
import Vue from 'vue'
// const uploadUrlTxt = 'apitst/cms/upload/file'; 
// const uploadUrlTxt = 'api/cms/upload/file';

// export function upload(data) {
//   return request({
//     url: uploadUrlTxt,
//     method: 'post',
//     data: {
//       'head': {},
//       'body': {
//         ...data
//       }
//     }
//   })
// }

// export const uploadUrl = uploadUrlTxt;

export function upload(data) {
  return request({
    url: '/upload/file',
    method: 'post',
    data: {
      'head': {},
      'body': {
        ...data
      }
    }
  })
}

export const uploadUrl = `${Vue.prototype.BASE_URL}upload/file`