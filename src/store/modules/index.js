export default {
  state: {
    title: localStorage.getItem('title') || '',
    isChildPage: false,
    homeIndexLoaded: false,
    ROLE_KEY_ITEMS: [],
    selectType: localStorage.getItem('selectType') || '1',
    currentMapType: 'fiveColor' // 'fiveColor' | 'scatter' | 'fourLink'
  },
  getters: {
    GET_TITLE(state) {
      return state.title
    },
    GET_ISCHILDPAGE(state) {
      return state.isChildPage
    },
    GET_HOMEINDEX_LOADED(state) {
      return state.homeIndexLoaded
    },
    GET_ROLE_KEY_ITEMS(state) {
      return state.ROLE_KEY_ITEMS
    },
    GET_SELECT_TYPE(state) {
      return state.selectType
    },
    GET_CURRENT_MAP_TYPE(state) {
      return state.currentMapType
    }
  },
  mutations: {
    SET_TITLE(state, data) {
      localStorage.setItem('title', data)
      state.title = data
    },
    SET_ISCHILDPAGE(state, data) {
      state.isChildPage = data
    },
    SET_HOMEINDEX_LOADED(state, data) {
      state.homeIndexLoaded = data
    },
    SET_ROLE_KEY_ITEMS(state, data) {
      state.ROLE_KEY_ITEMS = data
    },
    SET_SELECT_TYPE(state, data) {
      localStorage.setItem('selectType', data)
      state.selectType = data
    },
    SET_CURRENT_MAP_TYPE(state, data) {
      state.currentMapType = data
    }
  },
  actions: {}
}
