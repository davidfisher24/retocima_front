import { doRequest } from './requests'

export default {

  state: {
  },

  getters: {

  },

  mutations: {
  },

  actions: {
    provinciaLogros (store,id) {
      return doRequest(store, {
          url: 'logros/province/' + id,
      });
    },
  },

}