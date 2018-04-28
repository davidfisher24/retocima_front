import { doAuthRequest } from './requests'

export default {

  state: {
  	authCimero: null,
  },

  getters: {

  },

  mutations: {
  	authCimero (state, {data}) {
      state.authCimero = data
    },
  },

  actions: {

    authCimero (store) {
      if (store.state.authCimero) return store.state.authCimero
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero',
          mutation: 'authCimero',
      });
    },

    addLogro (store,id) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'add', cima: id},
      });
    },

    removeLogro (store,logro) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'remove', logro: JSON.stringify(logro)},
      });
    },

    userProvinceLogros (store,pid) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero-logros/' + pid,
      });
    },
  },
}