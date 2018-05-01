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
    addLogro (state, {data}) {
      if (state.authCimero) {
        if (data.provincia_id in state.authCimero.logros) state.authCimero.logros[data.provincia_id].push(data)
        else state.authCimero.logros[data.provincia_id] = [data]
      }
    },
    removeLogro (state, {data}) {
      if (state.authCimero) {
        state.authCimero.logros[data.provincia_id].splice(state.authCimero.logros[data.provincia_id].findIndex(l => l.id === data.id),1)
      }
    },
    updateCimero (state, {data}) {
      state.authCimero.cimero = data
      state.loggedInUser = data.username
    },
  },

  actions: {

    authCimero (store) {
      if (store.state.authCimero) return store.state.authCimero
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero',
          mutation: 'authCimero',
          logout: true,
      });
    },

    addLogro (store,id) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'add', cima: id},
          mutation: 'addLogro',
          logout: false,
      });
    },

    removeLogro (store,logro) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'remove', logro: JSON.stringify(logro)},
          mutation: 'removeLogro',
          logout: false,
      });
    },

    userProvinceLogros (store,pid) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero-logros/' + pid,
          logout: true,
      });
    },

    updateAccount (store, model) {
      return doAuthRequest(store, {
          method: 'post',
          data: model,
          url: 'edit-account',
          mutation: 'updateCimero',
          logout: false,
      });
    },

    updatePassword (store, creds) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-password',
          data: creds,
          logout: false,
      });
    },
  },
}