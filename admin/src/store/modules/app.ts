import { ActionContext, Module } from "vuex";
// 页面状态

const S: number = 1000;
const TIMEOUT: number = 10 * S;

interface AppState {
  loading: boolean;
}

const state: AppState = {
  loading: false
};
const mutations = {
  setLoading: (state: AppState, payload: boolean) => {
    state.loading = payload;
  }
};
const actions = {
  load: (context: ActionContext<AppState, any>) => {
    context.commit("setLoading", true);
    setTimeout(() => {
      context.commit("setLoading", false);
    }, TIMEOUT);
  },
  loaded: (context: ActionContext<AppState, any>) => {
    context.commit("setLoading", false);
  }
};
const getters = {
  isLoading: (state: AppState) => state.loading
};

const app: Module<AppState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default app;
