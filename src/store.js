import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import router from './router/index'

Vue.use(Vuex)

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

    discover (state, discover) {
      state.discover = discover
    },
    listado (state, listado) {
      state.listado = listado
    },
    provincia (state, provincia) {
      if (!state.provincias.find(x => x.id === provincia.id)); state.provincias.push(provincia)
    },
    allCimas (state, list) {
      state.allCimas = list
    },
    cima (state, cima) {
      if (!state.cimas.find(x => x.id === cima.id)) state.cimas.push(cima)
    },
    cimeros (state, cimero) {
      if (!state.cimeros.find(x => x.id === cimero.id)); state.cimeros.push(cimero)
    },
    patanegra (state, patanegra) {
      state.patanegra = patanegra
    },
    ranking (state, ranking) {
      state.ranking = ranking
    },
    authCimero (state, cimero) {
      state.authCimero = cimero
    },
    loggedIn (state,data) {
      localStorage.setItem('cimero-token',data.token)
      state.isLoggedIn = data.token
      state.loggedInUser = data.cimero.username
    },
    verify (state,data) {
      state.loggedInUser = data.cimero.username
    },
    refresh (state,token) {
      localStorage.setItem('cimero-token',token)
      state.isLoggedIn = data.token
    },
    loggedOut (state) {
      localStorage.removeItem('cimero-token')
      state.isLoggedIn = null
      state.loggedInUser = null
    },
  },

  actions: {

    login ({ commit }, creds) {
      var self = this;
      return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL + 'auth/login', creds).then(function (response) {
          self.commit('loggedIn',response.data);
          resolve()
        }).catch(err => {
          reject(err.response.data)  // returns to form with errors
        })
      })
    },

    register ({ commit }, creds) {
      var self = this;
      return new Promise((resolve, reject) => {
        axios.post(process.env.API_URL + 'auth/register', creds).then(function (response) {
          self.commit('loggedIn',response.data);
          resolve()
        }).catch(err => {
          reject(err.response.data) // returns to form with errors
        })
      })
    },

    logout ({ commit }) {
      this.commit('loggedOut');
      return true
    },

    cimero (context, cimero) {
      this.state.cimero = cimero
    },

    cima (context, id) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.cimas.find(x => x.id === id)) {
          resolve(self.state.cimas.find(x => x.id === id).val)
        } else {
          axios.get(process.env.API_URL + 'cima/' + id).then(function (response) {
            self.commit('cima', {val: response.data, id: id})
            resolve(response.data)
          })
        }
      })
    },

    discover(context) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.discover) {
          resolve(self.state.discover)
        } else {
          axios.get(process.env.API_URL + 'discover').then(function (response) {
            self.commit('discover', response.data)
            resolve(response.data)
          })
        }
      })
    },

    allCimas (context) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.allCimas) {
          resolve(self.state.allCimas)
        } else {
          axios.get(process.env.API_URL + 'cimas').then(function (response) {
            self.commit('allCimas', response.data)
            resolve(response.data)
          })
        }
      })
    },

    provincia (context, id) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.provincias.find(x => x.id === id)) {
          resolve(self.state.provincias.find(x => x.id === id).val)
        } else {
          axios.get(process.env.API_URL + 'cimas/' + id).then(function (response) {
            self.commit('provincia', {val: response.data, id: id})
            resolve(response.data)
          })
        }
      })
    },

    patanegra (context) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.patanegra) {
          resolve(self.state.patanegra)
        } else {
          axios.get(process.env.API_URL + 'patanegra').then(function (response) {
            self.commit('patanegra', response.data)
            resolve(response.data)
          })
        }
      })
    },

    listado (context, id) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.listado) {
          resolve(self.state.listado)
        } else {
          axios.get(process.env.API_URL + 'communidads').then(function (response) {
            self.commit('listado', response.data)
            resolve(response.data)
          })
        }
      })
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
              if (d.logros_count >= 480) d.image = 'gold'
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

    cimeros (context, id) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.cimeros.find(x => x.id === id)) {
          resolve(self.state.cimeros.find(x => x.id === id).val)
        } else {
          axios.get(process.env.API_URL + 'cimero/' + id).then(function (response) {
            self.commit('cimeros', {val: response.data, id: id})
            resolve(response.data)
          })
        }
      })
    },

    refresh ({dispatch, commit}) {
      var self = this;
      return new Promise((resolve, reject) => {
        if (!self.getters.expired) {
          return resolve();
        }
        axios.get(process.env.API_URL + 'auth/refresh',{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
          }
        }).then(function (response) {
          self.commit('refresh', response.data.token)
          resolve()
        }).catch(err => reject());
      })
    },
    
    // Authenticated with token

    verify ({ dispatch, commit }) {
      var self = this;
      return new Promise((resolve, reject) => {
        dispatch("refresh").then(() => {
          axios.get(process.env.API_URL + 'verify',{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
            }
          }).then(function (response) {
            self.commit('verify', response.data)
            resolve(response.data)
          }).catch(err => self.commit('loggedOut'));
         })
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

    authCimero (context) {
      var self = this
      return new Promise((resolve, reject) => {
        if (self.state.authCimero) {
          resolve(self.state.authCimero)
        } else {
          axios.get(process.env.API_URL + 'cimero',{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
            }
          }).then(function (response) {
            self.commit('authCimero', response.data)
            resolve(response.data)
          }).catch(() => reject()); 
        }
      })
    },

    addLogro (context,id) {
      return new Promise((resolve, reject) => {
          axios.post(process.env.API_URL  + 'update-logro',{
              action: 'add',
              cima: id,
          },{ headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
          }}).then(response => resolve(response.data)).catch(err => reject(err));
      });
    },

    removeLogro (context,logro) {
      return new Promise((resolve, reject) => {
          axios.post(process.env.API_URL  + 'update-logro',{
              action: 'remove',
              logro: JSON.stringify(logro),
          },{ headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
          }}).then(response => resolve(response.data)).catch(err => reject(err));
      });
    },

    userProvinceLogros (context,pid) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.API_URL + 'cimero-logros/' + pid,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
          }
        }).then(function (response) {
          resolve(response.data)
        }).catch(() => reject()); 
      })
    },
  }
})

export default store
