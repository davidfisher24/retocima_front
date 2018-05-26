import { doRequest } from './requests'

export default {
  namespaced: true,
  state: {
    patanegra: null,
    extrema: null,
  },

  getters: {

  },

  mutations: {
    patanegra (state, {data, params}) {
      state.patanegra = data
    },
    extrema (state, {data, params}) {
      state.extrema = data
    },
  },

  actions: {
    patanegra (store) {
      if (store.state.patanegra) return store.state.patanegra
      return doRequest(store, {
          url: 'patanegraranking',
          mutation: 'patanegra',
      });
    },
    extrema (store) {
      if (store.state.extrema) return store.state.extrema
      return doRequest(store, {
          url: 'extremaranking',
          mutation: 'extrema',
      });
    },
  }
}