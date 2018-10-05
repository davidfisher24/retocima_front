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
          url: 'communidads',
          mutation: 'all',
      });
    },

    one (store,cid) {
      if (store.state.all) return store.state.all.find(c => c.id === Number(cid))
      return doRequest(store, {
          url: 'communidads',
          mutation: 'all',
          callback: function(data){
            return data.find(c => c.id === Number(cid))
          }
      });
    },
  }
}