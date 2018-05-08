import { doAuthRequest, doLoginRequest, doRefreshTokenRequest } from './requests'
import jwt_decode from 'jwt-decode'

export default {

  state: {
  	authCimero: null,
    loggedInUser: null,
    isLoggedIn: localStorage.getItem('cimero-token'),
  },

  getters: {
    loggedIn: state => {
      if (state.isLoggedIn !== null) return true
      return false
    },
    loggedInUser: state => {
      if (state.loggedInUser !== null) return state.loggedInUser
      return null;
    },
    expiredToken: state => {
      if (!state.isLoggedIn) return false;
      var decodedToken = jwt_decode(state.isLoggedIn);
      if (decodedToken.exp - 60 < (new Date().getTime() / 1000)) return true;
      return false;
    },
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
    loggedIn (state,{data, params}) {
      localStorage.setItem('cimero-token',data.token)
      state.isLoggedIn = data.token
      state.loggedInUser = data.cimero.username
    },
    verify (state,{data}) {
      state.loggedInUser = data.cimero.username
    },
    loggedOut (state) {
      localStorage.removeItem('cimero-token')
      state.isLoggedIn = null
      state.loggedInUser = null
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

    login (store, creds) {
      return doLoginRequest(store, {
          method: 'post',
          url: 'auth/login',
          data: creds,
          mutation: 'loggedIn',
      });
    },

    register (store, creds) {
      return doLoginRequest(store, {
          method: 'post',
          url: 'auth/register',
          data: creds,
          mutation: 'loggedIn',
      });
    },

    logout (store) {
      this.commit('loggedOut');
      return true
    },

    verify (store) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'verify',
          mutation: 'verify',
      });
    },

    refresh (store) {
      return doRefreshTokenRequest(store);
    },
  },
}