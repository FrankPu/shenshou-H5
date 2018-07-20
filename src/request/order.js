import axios from 'axios'
import qs from 'qs'
//import baseURL from '../assets/js/util.js'

export function getPassengerData(url, UserId, Token) {
    return axios.post(baseURL + url, qs.stringify({
        UserId: UserId,
        Token: Token     
    }))
}

export function getPrice(url, prviceData) {
    return axios.post(baseURL + url, qs.stringify(prviceData))
}

export function getInsuranceData(url, IlleglCheckModel) {
    return axios.post(baseURL + url, qs.stringify(IlleglCheckModel))
}