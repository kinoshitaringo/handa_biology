import { State } from "./state";

const mutations = {
  setLoading: (state: State, payload: boolean) => {
    state.loading = payload;
  },
  setQuillContent: (state: State, payload: string) => {
    state.quillContent = payload;
  }
};

export default mutations;
