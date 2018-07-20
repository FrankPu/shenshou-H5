import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' /* vuex */
import axios from 'axios'
import storage from '@/utils/storage.js' /*缓存*/
import './assets/css/reset.css' /*引入公共样式*/

Vue.config.productionTip = false
Vue.prototype.$storage = storage

import VueRouter from 'vue-router';

// import {
//   isFormData,
//   isArrayBuffer,
//   isStream,
//   isFile,
//   isBlob,
//   isURLSearchParams,
//   isObject,
//   isUndefined
// } from 'axios/lib/utils.js'

// function setContentTypeIfUnset(headers, value) {
//   if (!isUndefined(headers) && isUndefined(headers['Content-Type'])) {
//     headers['Content-Type'] = value;
//   }
// }
Vue.prototype.$axios = axios.create({ //8099
  baseURL: 'http://192.168.3.18:3033/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    // 'Content-Type': 'application/json; charset=UTF-8',
    'DeviceNo': '6Y87HH1M3JJQCWEA7QCP2FGW41D48922',
    'Channel': '1.0.7',
    'Mac': 'E12F339D56386C1D58D767E5C6A1217A',
    'AgentId': '170705111839000',
    'mark': '170925135542000',
    'CompanyId': '170807101926050',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
  }
  // responseType: 'json',
  // transformRequest: [function transformRequest(data, headers) {
  //   /* 把类似content-type这种改成Content-Type */
  //   let keys = Object.keys(headers);
  //   let normalizedName = 'Content-Type';
  //   keys.forEach(name => {
  //     if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
  //       headers[normalizedName] = headers[name];
  //       delete headers[name];
  //     }
  //   });
  //   if (isFormData(data) || isArrayBuffer(data) || isStream(data) || isFile(data) || isBlob(data)) {
  //     return data;
  //   }
  //   if (isURLSearchParams(data)) {
  //     setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
  //     return data.toString();
  //   }
  //   /* 这里是重点，其他的其实可以照着axios的源码抄 */
  //   /* 这里就是用来解决POST提交json数据的时候是直接把整个json放在request payload中提交过去的情况
  //    * 这里简单处理下，把 {name: 'admin', pwd: 123}这种转换成name=admin&pwd=123就可以通过
  //    * x-www-form-urlencoded这种方式提交
  //    * */
  //   if (isObject(data)) {
  //     setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
  //     let keys2 = Object.keys(data);
  //     /* 这里就是把json变成url形式，并进行encode */
  //     return encodeURI(keys2.map(name => `${name}=${data[name]}`).join('&'));
  //   }
  //   console.log(data)
  //   return data;
  // }]
})

new Vue({
  el: '#app',
  axios,
  router,
  store, 
  components: { App },
  template: '<App/>'
})

