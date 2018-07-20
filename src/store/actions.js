import * as types from './mutation-types';
import * as service from './service';

export const getModuleInfo = ({ commit, state }, loginParams) => {
    service.getModuleInfo(loginParams)
        .then((info) => {
    commit(types.GET_MODULE_INFO_SUCCESS, info);
        }).catch((err) => {
            //commit(types.GET_MODULE_INFO_FAIL, err);
         });
}

export const getDateInfo = ({commit, state}, params) => {
    service.getDateInfo(params).then((res) => {
        commit(types.GET_DATE_INFO_SUCCESS, res)
    }).catch((error) => {

    })
}

//获取保险列表
export const getInsuranceInfo = ({commit, state}, info) => {
    service.getInsuranceInfo(info).then((res) => {
        commit(types.GET_INSURANCE_INFO_SUCCESS, res)
    }).catch((error) => {

    })
}
//选择保险
export const filterInsuranceInfo = ({commit, state}, index) => {
    commit(types.GET_CHOSED_INSURANCE_SUCCESS, index)
}

//火车票保险
export const getTrainInsuranceInfo = ({commit, state}, info) => {
    service.getTrainInsuranceInfo(info).then((res) => {
        commit(types.GET_TRAIN_INSURANCE_INFO_SUCCESS, res)
    }).catch((error) => {

    })
}

export const filterTrainInsuranceInfo = ({commit, state}, index) => {
    commit(types.GET_CHOSED_TRAIN_INSURANCE_SUCCESS, index)
}


export const getOneWayFlightList = ({commit, state}, data) => {
    commit(types.GET_ONEWAY_FLIGHT_LIST_START)
    service.getOneWayFlightList(data).then((res) => {
        commit(types.GET_ONEWAY_FLIGHT_LIST_SUCCESS, res)
    }).catch((error) => {
        commit(types.GET_ONEWAY_FLIGHT_LIST_FAILE, error)
    })
}

export const getTrainList = ({commit, state}, data) => {
    commit(types.GET_TRAIN_LIST_START)
    service.getTrainList(data).then((res) => {
        commit(types.GET_TRAIN_LIST_SUCCESS, res)
    }).catch((error) => {
        //commit(types.GET_TRAIN_LIST_FAILE, error)
    })
}
