import Vue from 'vue'
import Vuex from 'vuex'
import router from './router/index'
import _ from 'lodash'

import { doRequest, doLoginRequest, doAuthRequest, doRefreshTokenRequest } from './store/requests'
import cimas from './store/cimas'
import authCimero from './store/authCimero'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cimas,
    authCimero,
  },

  state: {
    loading: false,
    discover: null,
    listado: null,
    cimeros: [],
    ranking: null,
    loggedInUser: null,
    isLoggedIn: localStorage.getItem('cimero-token'),
    provincias: null,
    
  },
  getters: {
    loggedIn: state => {
      if (state.isLoggedIn !== null) return true
      return false
    },
    loggedInUser: state => {
      if (state.loggedInUser === null && state.isLoggedIn === null) return "What to do"
      if (state.loggedInUser !== null) return state.loggedInUser
      return null;
    },
    loading: state => {
      return state.loading
    },
  },

  mutations: {
    loading (state, status) {
      state.loading = status;
    },
    discover (state, {data, params}) {
      state.discover = data
    },
    listado (state, {data, params}) {
      state.listado = data
    },
    cimeros (state, {data, params}) {
      if (!state.cimeros.find(x => x.id === params.id)); state.cimeros.push({val: data, id: params.id})
    },
    ranking (state, ranking) {
      state.ranking = ranking
    },
    provincias (state, {data}) {
      state.provincias = data
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
      localStorage.removeItem('cimero-user')
      state.isLoggedIn = null
      state.loggedInUser = null
    },
  },

  actions: {
    login ({ commit }, creds) {
      return doLoginRequest(store, {
          method: 'post',
          url: 'auth/login',
          data: creds,
          mutation: 'loggedIn',
      });
    },

    register ({ commit }, creds) {
      return doLoginRequest(store, {
          method: 'post',
          url: 'auth/register',
          data: creds,
          mutation: 'loggedIn',
      });
    },

    logout ({ commit }) {
      this.commit('loggedOut');
      return true
    },

    cimero (context, cimero) {
      this.state.cimero = cimero
    },

    
    discover(context) {
      if (this.state.discover) return this.state.discover
      return doRequest(store, {
          url: 'discover',
          mutation: 'discover',
      });
    },

   

    listado (context) {
      if (this.state.listado) return this.state.listado
      return doRequest(store, {
          url: 'communidads',
          mutation: 'listado',
      });
    },

    cimeros (context, id) {
      if (this.state.cimeros.find(x => x.id === id)) return this.state.cimeros.find(x => x.id === id).val
      return doRequest(store, {
          url: 'cimero/' + id,
          mutation: 'cimeros',
          params: {id: id}
      });
    },

    ranking (context) {
      if (this.state.ranking) return this.state.ranking
      return doRequest(store, {
          url: 'ranking',
          mutation: 'ranking',
      });
    },

  

    verify ({ dispatch, commit }) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'verify',
          mutation: 'verify',
      });
    },

    provincias (context,pid) {
      if (this.state.provincias && !pid) return this.state.provincias
      if (this.state.provincias && pid) return this.state.provincias.find(p => p.id === Number(pid))
      return doRequest(store, {
          url: 'provincias',
          mutation: 'provincias',
          callback: function(data){
            if (!pid) return data
            return data.find(p => p.id === Number(pid))
          }
      }); 
    }

  }
})

export default store
