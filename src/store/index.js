import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations, getters } from './mutations';
import * as actions from './actions';

import staff from './modules/staff'

Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        staff
    },
});

export default store;
