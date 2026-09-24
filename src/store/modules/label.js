export default {
  state: {
    labelCd: '',
  },
  getters: {
    GET_labelCd(state) {
      return state.labelCd;
    },
  },
  mutations: {
    SET_labelCd(state, data) {
      state.labelCd = data;

    },
  },
  actions: {
    
  },
}
