import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import router from './router/index'
import _ from 'lodash'

Vue.use(Vuex)

const doRequest = (store, { url, mutation, params }) => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.API_URL + url).then(function (response) {
      store.commit(mutation, {data: response.data, params: params})
      resolve(response.data)
    }).catch(err => {
      // Throw error and don't change page
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
      // Goes back to form
      reject(err.response.data)
    })
  })
}

const doAuthRequest = (store, { method, url, data, mutation, params }) => {
  if (store.getters.expired === true) return store.commit("loggedOut")
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
    isLoggedIn: localStorage.getItem('cimero-token'),
    loggedInUser: null,
  },
  getters: {
    expired: state => {
      if (!state.isLoggedIn) return null;
      var dateNow = new Date();
      var ts = dateNow.getTime() / 1000;
      return jwt_decode(state.isLoggedIn).exp - 30 < ts;
    },
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
    refresh (state,{data}) {
      localStorage.setItem('cimero-token',data.token)
      state.isLoggedIn = data.token
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

    allCimas (context) {
      if (this.state.allCimas) return this.state.allCimas
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
      });
    },

    provincia (context, id) {
      if (this.state.provincias.find(x => x.id === id)) return this.state.provincias.find(x => x.id === id).val
      return doRequest(store, {
          url: 'cimas/' + id,
          mutation: 'provincia',
          params: {id: id}
      });
    },

    patanegra (context) {
      console.log(this.state.patanegra)
      if (this.state.patanegra) return this.state.patanegra
      return doRequest(store, {
          url: 'patanegra',
          mutation: 'patanegra',
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
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.ranking) {
          resolve(self.state.ranking)
        } else {
          axios.get(process.env.API_URL + 'ranking').then(function (response) {
            var tableData = response.data.map(function (d, i) {
              d.rank = i + 1
              d.link = self.baseUrl + '/cimeropublicdetails/' + d.id
              if (d.logros_count > 640) d.image = 'crown'
              else if (d.logros_count >= 480 && d.logros_count <= 640) d.image = 'gold'
              else if (d.logros_count < 480 && d.logros_count >= 320) d.image = 'silver'
              else if (d.logros_count >= 160 && d.logros_count < 320) d.image = 'bronze'
              else d.image = null
              return d;
            })
            resolve({source: "ajax", data: tableData})
          })
        }
      })
    },

    

    

    updateAccount ({ commit }, model) {
      var self = this;
      return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL + 'edit-account',model,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
          }
        }).then(function (response) {
          self.commit('authCimero', response.data)
          resolve(response.data)
        }).catch(err => reject(err.response.data)); // Returns to form
      })
    },

    refresh ({dispatch, commit}) {
      return doAuthRequest(store, {
          method: 'get',
          url: 'refresh',
          mutation: 'refresh',
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
