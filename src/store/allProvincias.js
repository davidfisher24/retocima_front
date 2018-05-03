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

    oneProvincia (store,pid) {
      if (store.state.allProvincias) return store.state.allProvincias.find(p => p.id === Number(pid))
      return doRequest(store, {
          url: 'provincias',
          mutation: 'allProvincias',
          callback: function(data){
            return data.find(p => p.id === Number(pid))
          }
      });
    },
  }
}