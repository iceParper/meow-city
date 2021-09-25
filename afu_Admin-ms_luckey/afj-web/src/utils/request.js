import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/apitst/cms',
  // baseURL: '/afjtst',//测试
  // baseURL: '/afj',//正式
  // baseURL: '/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      console.log(config, 'config========')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error, '------------') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if (response.request.responseType == 'blob') {
      var reader = new FileReader();
      reader.readAsText(res, 'utf-8');
      reader.onload = function () {
        try {
          res = JSON.parse(reader.result);
          if (res.rtn == 0) {
            Message({
              message: res.msg,
              type: 'error',
              duration: 2 * 1000
            })
          }
        } catch (err) {
          downLoadFile(res);
        }
      }
    } else {
      // if the custom code is not 20000, it is judged as an error.
      if (res && res.body && res.body.result === '0') {
        return Promise.resolve(res.body)
      } else {
        if (res.body.result == 1) {
          // console.log('qfqewetwt')
          Message({
            message: res.body.description,
            type: 'warning',
            duration: 2 * 1000
          })
          return Promise.resolve(res.body)
        }
        Message({
          message: res.body.description,
          type: 'error',
          duration: 2 * 1000
        })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.resolve({ result: '1' })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.notice,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.resolve({ result: '1' })
  }
);


function downLoadFile(res) {
  var blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }); //type这里表示xlsx类型
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = '订单.xls'; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
  Message({
    message: '下载成功',
    type: 'success',
    duration: 2 * 1000
  });
}


export default service