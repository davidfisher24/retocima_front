import { doRequest } from './requests'

export default {

  state: {
    paises: null,
  },

  getters: {

  },

  mutations: {
    paises (state, {data, params}) {
      state.paises = data
    },
  },

  actions: {
    paises (store) {
      if (store.state.paises) return store.state.paises
      return doRequest(store, {
          url: 'paises',
          mutation: 'paises',
      });
    },
  }
}