import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { doRequest } from './requests'
import cimas from './cimas'
import authCimero from './authCimero'
import provincias from './provincias'
import communidads from './communidads'
import paises from './paises'
import rankings from './rankings'
import logros from './logros'
import mapPositions from './mapPositions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'cimas' : cimas,
    'user' : authCimero,
    'provincias' : provincias,
    'communidads' : communidads,
    'paises' : paises,
    'rankings' : rankings,
    'logros' : logros,
    'mapPositions' : mapPositions,
  },

  state: {
    loading: false,
    globalAlert:{
      show:false,
      message: '',
      type: 'success'
    },
    discover: null,
    listado: null,
    cimeros: [],
    ranking: null,
    
  },
  getters: {
    loading: state => {
      return state.loading
    },
    globalAlert: state => {
      return state.globalAlert
    },
  },

  mutations: {
    loading (state, status) {
      state.loading = status;
    },
    showGlobalAlert (state, {type, message}) {
      state.globalAlert = {
        show: true,
        message: message,
        type: type,
      }
    },
    closeGlobalAlert (state) {
      state.globalAlert = {
        show: false,
        message: '',
        type: 'success',
      }
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
  },

  actions: {
    showGlobalAlert (context, {type, message}) {
      this.commit('showGlobalAlert',{
        type: type,
        message: message,
      })
    },
    
    closeGlobalAlert (context) {
      this.commit('closeGlobalAlert',{})
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
      //context.rootGetters["user/account"];
      //context.rootState.user.account.cimero
      if (this.state.ranking) return this.state.ranking
      return doRequest(store, {
          url: 'ranking',
          mutation: 'ranking',
      });
    },
  }
})

export default store
