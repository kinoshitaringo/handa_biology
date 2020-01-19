import { ActionContext } from "vuex";
import { State } from "./state";

const S: number = 1000;
const TIMEOUT: number = 10 * S;

const actions = {
  load: (context: ActionContext<State, any>) => {
    context.commit("setLoading", true);
    setTimeout(() => {
      context.commit("setLoading", false);
    }, TIMEOUT);
  },
  loaded: (context: ActionContext<State, any>) => {
    context.commit("setLoading", false);
  }
};

export default actions;
