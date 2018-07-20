import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'DeviceNo': '6Y87HH1M3JJQCWEA7QCP2FGW41D48922',
    'Channel': '1.0.7',
    'Mac': 'E12F339D56386C1D58D767E5C6A1217A',
    'AgentId': '170705111839000',
    'mark': '170925135542000',
    'CompanyId': '170807101926050',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json, text/javascript, */*; q=0.01'
}
axios.defaults.baseURL = 'http://192.168.3.18:9981/api'

export const getModuleInfo  = (loginParams) => {           //登录
    return axios.post(loginParams.url, qs.stringify(loginParams.params))
}

export const getInsuranceInfo = (data) => {      //保险
    return axios.post(data.url, qs.stringify(data.params))
}

export const getDateInfo = (data) => {           //日历
    return axios.post(data.url, qs.stringify(data.params))
}

export const getTrainInsuranceInfo = (data) => {
    return axios.post(data.url, qs.stringify(data.params))
}

export const getOneWayFlightList = (data) => {
    return axios.post(data.url, qs.stringify(data.params))
}

export const getTrainList = (data) => {
    return axios.post(data.url, qs.stringify(data.params))
}

export const getFrequentPsger = (data) => {
    return axios.post(data.url, qs.stringify(data.params))
}