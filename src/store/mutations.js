import * as types from './mutation-types'
import { getWeekend, formatNum, formateAllDate } from '../utils/utils.js'
import storage from '../utils/storage.js'

export const state = {
    loginInfo: {},
    dateInfo: [],
    insuranceInfo: [],
    trainInsuranceInfo: [],
    expenseDetailData: [],
    oneWayflightListInfo: {
        fetching: true,
        flightResponse: [],
        searchDetial: {}
    },
    trainListInfo: {
        fetching: true,
        appTrainInfo: [],
        queryConditionDetail: {}
    }
};


  // getters
export const getters = {   
    minPrice(state) {
        let min = 0
        if(!state.oneWayflightListInfo.fetching) {
            min = state.oneWayflightListInfo.originFlightList[0].TicketPrice            
            for(let i = 0; i < state.oneWayflightListInfo.originFlightList.length; i++) {
                let item = state.oneWayflightListInfo.originFlightList[i]
                if(item.TicketPrice < min) {
                    min = item.TicketPrice
                }
            }       
        }       
        return min
    }
}

export const mutations = {
    [types.GET_MODULE_INFO_SUCCESS](state, info) {
        state.loginInfo = info
    },
    [types.GET_DATE_INFO_SUCCESS](state, info) {
        let allDate = info.data.Result
        
        let filterDate = []
        allDate.map((item, index) => {
            item.listResponsePriceCalendarEntity.map((val, i) => {
                filterDate.push(val)
            })
        })
        let index = allDate[12].listResponsePriceCalendarEntity.length - 1
        let firstDay = formateAllDate('first', allDate[0].listResponsePriceCalendarEntity[0].DepartDate)
        let lastDay = formateAllDate('last', allDate[12].listResponsePriceCalendarEntity[index].DepartDate)
        
        allDate[0].listResponsePriceCalendarEntity = firstDay.concat(allDate[0].listResponsePriceCalendarEntity)
        allDate[12].listResponsePriceCalendarEntity = allDate[12].listResponsePriceCalendarEntity.concat(lastDay)

        let arr = []
        let num = getWeekend(allDate[0].listResponsePriceCalendarEntity[0].DepartDate)
        if(formatNum(num) < 7) {
            for(let i = 0;i < formatNum(num); i++) {
                arr.push({ DepartDate: ''})
            }
            allDate[0].listResponsePriceCalendarEntity = arr.concat(allDate[0].listResponsePriceCalendarEntity)
        }               
        
        state.dateInfo = {
            originDate: filterDate,
            allDate: allDate
        }

    },
    [types.GET_INSURANCE_INFO_SUCCESS](state, info) {         //机票保险
        for(let i = 0; i < info.data.Result.length; i++) {
            if(i == 0 || i == 1) info.data.Result[i].isChecked = true
            else info.data.Result[i].isChecked = false
        }
        state.insuranceInfo = info.data.Result        
    },
    
    [types.GET_CHOSED_INSURANCE_SUCCESS](state, index) {
        state.insuranceInfo[index].isChecked = !state.insuranceInfo[index].isChecked
    },

    [types.GET_TRAIN_INSURANCE_INFO_SUCCESS](state, info) {         //火车票保险
        for(let i = 0; i < info.data.Result.length; i++) {
            if(i == 0 || i == 1) info.data.Result[i].isChecked = true
            else info.data.Result[i].isChecked = false
        }
        state.trainInsuranceInfo = info.data.Result        
    },
    
    [types.GET_CHOSED_TRAIN_INSURANCE_SUCCESS](state, index) {
        state.trainInsuranceInfo[index].isChecked = !state.trainInsuranceInfo[index].isChecked
    },

    [types.GET_ONEWAY_FLIGHT_LIST_START](state) {         //单程因公因私列表请求中
        state.oneWayflightListInfo.fetching = true
    },

    [types.GET_ONEWAY_FLIGHT_LIST_SUCCESS](state, res) {         //单程因公因私列表请求成功
        state.oneWayflightListInfo.fetching = false
        state.oneWayflightListInfo.flightResponse = res.data.Result.flightResponse

        res.data.Result.flightResponse.sort(function(a,b){
            return Date.parse(b.DepartDate + ' ' + b.DepartTime) - Date.parse(a.DepartDate + ' ' + a.DepartTime);//时间倒叙
        })

        for(let key in res.data.Result.searchDetial) {                        
            res.data.Result.searchDetial[key].map((item ,index) => {
                item.isChecked = false
            })
        }             

        state.oneWayflightListInfo.searchDetial = res.data.Result.searchDetial
        state.oneWayflightListInfo.originFlightList = res.data.Result.flightResponse
    },

    [types.GET_ONEWAY_FLIGHT_LIST_FAILE](state, err) {         //单程因公因私列表请求失败
        state.oneWayflightListInfo.fetching = false;
        state.oneWayflightListInfo.error = err;
    },

    [types.SORT_FLIGHT_LIST_SUCCESS](state, data) {         //机票列表排序
        //type:按时间、按价格
        //mode：升序还是降序
        if(data.type == 'sortTime') {
            if(data.mode == 'asc') {
                state.oneWayflightListInfo.flightResponse.sort(function(a,b){
                    return Date.parse(a.DepartDate + ' ' + a.DepartTime) - Date.parse(b.DepartDate + ' ' + b.DepartTime);//时间正序
                })
            } else {
                state.oneWayflightListInfo.flightResponse.sort(function(a,b){
                    return Date.parse(b.DepartDate + ' ' + b.DepartTime) - Date.parse(a.DepartDate + ' ' + a.DepartTime);//时间倒叙
                })
            }
        } else if(data.type == 'sortPrice') {
            if(data.mode == 'asc') {
                state.oneWayflightListInfo.flightResponse.sort(function(a,b){
                    return a.TicketPrice - b.TicketPrice       //价格正序
                })
            } else {
                state.oneWayflightListInfo.flightResponse.sort(function(a,b){
                    return b.TicketPrice - a.TicketPrice       //价格倒叙
                })
            }
        }            
    },

    [types.FILTER_FLIGHT_LIST_SUCCESS](state, search) {         //机票列表排序
        if(Object.keys(search).length == 0) {
            state.oneWayflightListInfo.flightResponse = state.oneWayflightListInfo.originFlightList
            return
        }
        let tmpFlight = []
        
        for(let key in search) {
            for(let i = 0;i < search[key].length; i++) {
                tmpFlight = tmpFlight.concat(state.oneWayflightListInfo.flightResponse.filter(item => {
                    if(key === 'searchAirline') {
                        console.log(item.AirlineName, 111111111111111111111111111111)
                        console.log(search[key][i].AirlineName, 2222222222222222222222)
                        return item.AirlineName.indexOf(search[key][i].AirlineName) !== -1;
                    } else if(key === 'searchCabinDescribe') {
                        return item.CabinDescribe.indexOf(search[key][i].CabinDescribeName) !== -1;
                    } else if(key === 'searchDepartAirport') {
                        return item.DepartAirport.indexOf(search[key][i].DepartAirportName) !== -1;
                    } else if(key === 'searchArriveAirport') {
                        return item.ArriveAirport.indexOf(search[key][i].ArriveAirportName) !== -1;
                    } else if(key === 'searchTime') {
                        let startTime = this.departDate + ' ' + search[key][0].DepartTime.split('-')[0]
                        let endTime = this.departDate + ' ' + search[key][search[key].length - 1].DepartTime.split('-')[1]                      
                        return Date.parse(item.DepartDate + ' ' + item.DepartTime) >= Date.parse(startTime) && Date.parse(item.DepartDate + ' ' + item.DepartTime) <= Date.parse(endTime)                   
                    }
                }))
            }
            state.oneWayflightListInfo.flightResponse = tmpFlight                
        }
    },

    [types.GET_TRAIN_LIST_START](state) {         //火车列表请求中
        state.trainListInfo.fetching = true
    },

    [types.GET_TRAIN_LIST_SUCCESS](state, res) {         //火车列表请求成功
        state.trainListInfo.fetching = false
        state.trainListInfo.appTrainInfo = res.data.Result.appTrainInfo

        res.data.Result.appTrainInfo.sort(function(a,b){
            return Date.parse(a.DepartDate + ' ' + a.StartTime) - Date.parse(b.DepartDate + ' ' + b.StartTime);//时间正序
        })
        
        res.data.Result.queryCondition.queryConditionDetail.map(item => {
            item.queryConditionAppDetail.map(val => {
                val.isChecked = false
            })
        })
        state.trainListInfo.queryConditionDetail = res.data.Result.queryCondition.queryConditionDetail
        state.trainListInfo.appTrainInfo = res.data.Result.appTrainInfo
        state.trainListInfo.saveTrainList = res.data.Result.appTrainInfo
    },
}
