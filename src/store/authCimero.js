import { doAuthRequest, doLoginRequest, doRefreshTokenRequest } from './requests'
import jwt_decode from 'jwt-decode'

export default {
  namespaced: true,
  state: {
  	account: null,
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
    /* Returns current account for mapping of data outside */
    account: state => {
      if (!state.account) return null
      return state.account.cimero
    },
  },

  mutations: {
  	account (state, {data}) {
      state.account = data
    },
    addLogro (state, {data}) {
      if (state.account) {
        state.account.logros.push(data)
      }
    },
    removeLogro (state, {data}) {
      if (state.account) {
        state.account.logros.splice(state.account.logros.findIndex(l => l.id === data.id),1)
      }
    },
    updateCimero (state, {data}) {
      state.account.cimero = data
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
    refresh (state,token) {
      state.isLoggedIn = token
    },
    loggedOut (state) {
      localStorage.removeItem('cimero-token')
      state.isLoggedIn = null
      state.loggedInUser = null
    },
  },

  actions: {

    account (store) {
      if (store.state.account) return store.state.account
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero',
          mutation: 'account',
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

    checkLogro (store,id) {
      if (!store.getters.loggedIn) return false
      if (!store.state.account)   
        return doAuthRequest(store, {
            method: 'get',
            url: 'cimero',
            mutation: 'account',
            logout: true,
            callback: function(data){
              return data.logros.find(x => x.cima_id === id)
            },
        });
      return store.state.account.logros.find(x => x.cima_id === id) 
    },

    provinceLogros (store,pid) {
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
      store.commit('loggedOut');
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