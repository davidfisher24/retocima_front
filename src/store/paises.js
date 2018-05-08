import { doRequest } from './requests'

export default {
  namespaced: true,
  state: {
    all: null,
  },

  getters: {

  },

  mutations: {
    all (state, {data, params}) {
      state.all = data
    },
  },

  actions: {
    all (store) {
      if (store.state.all) return store.state.all
      return doRequest(store, {
          url: 'paises',
          mutation: 'all',
      });
    },
  }
}