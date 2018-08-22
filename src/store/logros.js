import { doRequest } from './requests'

export default {
  namespaced: true,
  
  state: {
  },

  getters: {

  },

  mutations: {
  },

  actions: {
    provincia (store,id) {
      return doRequest(store, {
          url: 'logros/province/' + id,
      });
    },
  },

}