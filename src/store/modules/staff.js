import * as types from '../mutation-types';
import * as service from '../service';

const state = {
    staffList: []
}

// getters
const getters = {
  
}

// actions
const actions = {
    getFrequentPsger({commit, state}, params) {
        service.getDateInfo(params).then((res) => {
            commit(types.GET_FREQUENT_PSGER, res)
        }).catch((error) => {
    
        })
    }
}

// mutations
const mutations = {
    [types.GET_FREQUENT_PSGER](state, info) {
        state.staffList = info.data.Result
        state.staffList.map((item, index) => {
            item.isChecked = false
        })
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}