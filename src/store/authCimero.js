import { doAuthRequest, doLoginRequest, doRefreshTokenRequest, doRequest } from './requests'
import jwt_decode from 'jwt-decode'

export default {
  namespaced: true,
  state: {
    id: null,
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
  },

  mutations: {
    updateCimero (state, {data}) {
      state.account.cimero = data
      state.loggedInUser = data.username
    },
    loggedIn (state,{data, params}) {
      localStorage.setItem('cimero-token',data.token)
      localStorage.setItem('cimero-refresh-token',data.refresh_token)
      state.isLoggedIn = data.token
      state.loggedInUser = data.username
      state.id = data.id
    },
    verify (state,{data}) {
      state.loggedInUser = data.username
      state.id = data.id
    },
    refresh (state,token) {
      state.isLoggedIn = token
      state.loggedInUser = data.username
      state.id = data.id
    },
    loggedOut (state) {
      localStorage.removeItem('cimero-token')
      state.isLoggedIn = null
      state.loggedInUser = null
      state.id = null
    },
  },

  actions: {

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

    forgotPassword (store, creds) {
      return doRequest(store, {
          method: 'post',
          url: 'auth/forgot-password',
          data: creds,
      });
    },

    resetPassword (store, creds) {
      return doRequest(store, {
          method: 'post',
          url: 'auth/reset-password?id=' + cred.user_id + '&token=' + token,
          data: creds,
      });
    },

    logout (store) {
      store.commit('loggedOut');
      store.dispatch('showGlobalAlert',{type: 'success', message: 'Sesion cerrado'}, { root: true })
      return true
    },

    verify (store) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'auth/verify',
          mutation: 'verify',
      });
    },

    refresh (store) {
      return doRefreshTokenRequest(store);
    },


    checkBookmark (store,climbId) {
      return doRequest(store, {
          method: 'get',
          url: 'bookmark?climb=' + climbId + '&user=' + store.state.id,
      });
    },
    bookmarks (store) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'bookmark/me',
          mutation: 'bookmarks',
      });
    },
    addBookmark (store,climbId) {
      return doAuthRequest(store, {
          method: 'post',
          data: { climb: climbId },
          url: 'bookmark/',
      });
    },
    removeBookmark (store,bookmarkId) {
      return doAuthRequest(store, {
          method: 'delete',
          url: 'bookmark/' + bookmarkId,
      });
    }
  },
}
