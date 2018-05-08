import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import { doRequest } from './requests'
import cimas from './cimas'
import authCimero from './authCimero'
import provincias from './provincias'
import paises from './paises'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'cimas' : cimas,
    'user' : authCimero,
    'provincias' : provincias,
    'paises' : paises,
  },

  state: {
    loading: false,
    discover: null,
    listado: null,
    cimeros: [],
    ranking: null,
    
  },
  getters: {
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
  },

  actions: {
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
  }
})

export default store
