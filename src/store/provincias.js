import { doRequest } from './requests'

export default {

  state: {
  	allProvincias: null,
  },

  getters: {

  },

  mutations: {
  	allProvincias (state, {data, params}) {
      state.allProvincias = data
    },
  },

  actions: {
  	allProvincias (store) {
      if (store.state.allProvincias) return store.state.allProvincias
      return doRequest(store, {
          url: 'provincias',
          mutation: 'allProvincias',
      });
    },
  }
}