import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import router from './router/index'
import _ from 'lodash'

Vue.use(Vuex)

const doRequest = (store, { url, mutation, params, resolveMutation, callback }) => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.API_URL + url).then(function (response) {
      store.commit(mutation, {data: response.data, params: params})
      var data = callback ? callback(response.data) : response.data
      resolve(data)
    }).catch(err => {
      // Change page depending where we are
      reject(err.response.data)
    })
  })
}

const doLoginRequest = (store, { method, url, data, mutation, params }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: process.env.API_URL + url,
      data: data
    }).then(response => {
      store.commit(mutation, {data: response.data, params: params})
      resolve(response.data)
    }).catch(err => {
      // Goes back to form - form requests routed here
      reject(err.response.data)
    })
  })
}

/* Checks jwt */
const doAuthRequest = (store, { method, url, data, mutation, params }) => {
  var decodedToken = jwt_decode(localStorage.getItem('cimero-token'));
  if (decodedToken.exp - 60 < (new Date().getTime() / 1000))  return doRefreshTokenRequest(store, { method, url, data, mutation, params });
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: process.env.API_URL + url,
      data: data,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('cimero-token') },
    }).then(response => {
      if(mutation) store.commit(mutation, {data: response.data, params: params})
      resolve(response.data)
    }).catch(err => {
      // also need to redirect here in case of a 401
      // Although there are some form functions
      store.commit("loggedOut")
    })
  })
}

/* Carries out token request */
const doRefreshTokenRequest = (store, { method, url, data, mutation, params }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: process.env.API_URL + 'auth/refresh',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('cimero-token') },
    }).then(response => {
      localStorage.setItem('cimero-token',response.data.token)
      return axios({
        method: method,
        url: process.env.API_URL + url,
        data: data,
        headers: {'Authorization': 'Bearer ' + response.data.token },
      })
    }).then(response => {
      if(mutation) store.commit(mutation, {data: response.data, params: params})
      resolve(response.data)
    }).catch(err => {
      // also need to redirect here in case of a 401
      store.commit("loggedOut")
    })
  })
}


const store = new Vuex.Store({
  state: {
    loading: false,
    discover: null,
    listado: null,
    provincias: [],
    cimas: [],
    cimeros: [],
    authCimero: null,
    allCimas: null,
    patanegra: null,
    ranking: null,
    loggedInUser: null,
    isLoggedIn: localStorage.getItem('cimero-token'),
    
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
    provincia (state, {data, params}) {
      if (!state.provincias.find(x => x.id === params.id)) state.provincias.push({val: data, id: params.id})
    },
    allCimas (state, {data, params}) {
      state.allCimas = data
    },
    cima (state, {data, params}) {
      if (!state.cimas.find(x => x.id === data.id)) state.cimas.push(data)
    },
    patanegra (state, {data, params}) {
      state.patanegra = data
    },
    cimeros (state, {data, params}) {
      if (!state.cimeros.find(x => x.id === params.id)); state.cimeros.push({val: data, id: params.id})
    },
    authCimero (state, {data}) {
      state.authCimero = data
    },
    ranking (state, ranking) {
      state.ranking = ranking
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

    cima (context, id) {
      if (this.state.cimas.find(x => x.id === id)) return this.state.cimas.find(x => x.id === id)
      return doRequest(store, {
          url: 'cima/' + id,
          mutation: 'cima',
      });
    },

    discover(context) {
      if (this.state.discover) return this.state.discover
      return doRequest(store, {
          url: 'discover',
          mutation: 'discover',
      });
    },

    /* Uses all cimas list */
    allCimas (context) {
      if (this.state.allCimas) return this.state.allCimas
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
      });
    },

    /* Uses all cimas list */
    provincia (context, id) {
      if (this.state.allCimas) return this.state.allCimas.filter(c => c.provincia_id === id)
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
          callback: function(data){
            return data.filter(c => c.provincia_id === id)
          }
      });
    },

    /* Uses all cimas list */
    patanegra (context) {
      if (this.state.allCimas) return this.state.allCimas.filter(c => c.pata_negra === 1)
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
          callback: function(data){
            return data.filter(c => c.pata_negra === 1)
          }
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

    updateAccount ({ commit }, model) {
      return doAuthRequest(store, {
          method: 'post',
          data: model,
          url: 'edit-account',
          mutation: 'authCimero',
      });
    },

    verify ({ dispatch, commit }) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'verify',
          mutation: 'verify',
      });
    },

    authCimero (context) {
      if (this.state.authCimero) return this.state.authCimero
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero',
          mutation: 'authCimero',
      });
    },

    addLogro (context,id) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'add', cima: id},
      });
    },

    removeLogro (context,logro) {
      return doAuthRequest(store, {
          method: 'post',
          url: 'update-logro',
          data: {action: 'remove', logro: JSON.stringify(logro)},
      });
    },

    userProvinceLogros (context,pid) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'cimero-logros/' + pid,
      });
    },

  }
})

export default store
