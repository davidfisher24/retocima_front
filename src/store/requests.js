import axios from 'axios';
import jwt_decode from 'jwt-decode'

export const doRequest = (store, { url, mutation, params, resolveMutation, callback }) => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.API_URL + url).then(function (response) {
      if (mutation) store.commit(mutation, {data: response.data, params: params})
      var data = callback ? callback(response.data) : response.data
      resolve(data)
    }).catch(err => {
      // Change page depending where we are
      reject(err.response.data)
    })
  })
}

export const doLoginRequest = (store, { method, url, data, mutation, params }) => {
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
export const doAuthRequest = (store, { method, url, data, mutation, params, logout }) => {
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
      console.log(err);
      // also need to redirect here in case of a 401
      // Although there are some form functions
      if (logout) {
        store.commit("loggedOut")
        // redirect
      } else {
        reject(err.response.data)
      }
    })
  })
}

/* Carries out token request */
export const doRefreshTokenRequest = (store, { method, url, data, mutation, params }) => {
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