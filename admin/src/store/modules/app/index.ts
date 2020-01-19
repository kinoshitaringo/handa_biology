import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state, { State } from "./state";
import { Module } from "vuex";
// 页面状态

const app: Module<State, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default app;
