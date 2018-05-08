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
          url: 'provincias',
          mutation: 'all',
      });
    },

    one (store,pid) {
      if (store.state.all) return store.state.all.find(p => p.id === Number(pid))
      return doRequest(store, {
          url: 'provincias',
          mutation: 'all',
          callback: function(data){
            return data.find(p => p.id === Number(pid))
          }
      });
    },
  }
}