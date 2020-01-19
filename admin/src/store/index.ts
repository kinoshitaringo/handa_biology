import modules from "./modules";
import Vue from "vue";
import Vuex from "vuex";
import vuexPersistedstate from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [vuexPersistedstate({ storage: sessionStorage })]
});
