import Vue from "vue";
import Vuex from "vuex";

import AppStore from "./AppStore";
import SimonStore from "./SimonStore";

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        root: AppStore,
        simon: SimonStore
    }
});
export default store;
