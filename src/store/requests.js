import axios from 'axios';


export const doRequest = (store, { url, method, mutation, params, data, resolveMutation, callback }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method ? method : 'get',
      url: process.env.API_URL + url,
      data: data ? data : null
    }).then(response => {
      if (mutation) store.commit(mutation, {data: response.data, params: params})
      var data = callback ? callback(response.data) : response.data
      resolve(data)
    }).catch(err => {
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
      reject(err.response.data)
    })
  })
}

/* Checks jwt */
export const doAuthRequest = (store, { method, url, data, mutation, params, logout, callback }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: process.env.API_URL + url,
      data: data,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('cimero-token') },
    }).then(response => {
      if(mutation) store.commit(mutation, {data: response.data, params: params})
      var data = callback ? callback(response.data) : response.data
      resolve(data)
    }).catch(err => {
      if (logout) {
        store.commit("loggedOut")
      } else {
        reject(err.response.data)
      }
    })
  })
}

export const doUploadRequest = (store, { url, data, files, mutation, params, logout, callback }) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    files.forEach(file => {
      formData.append(file.key, file.file);
    });
    
    axios({
      method: 'POST',
      url: process.env.API_URL + url,
      formData,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('cimero-token'),
        'Content-Type': 'multipart/form-data'
      },
    }).then(response => {
      if(mutation) store.commit(mutation, {data: response.data, params: params})
      var data = callback ? callback(response.data) : response.data
      resolve(data)
    }).catch(err => {
      if (logout) {
        store.commit("loggedOut")
      } else {
        reject(err.response.data)
      }
    })
  })
}

/* Carries out token request */
export const doRefreshTokenRequest = (store) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: process.env.API_URL + 'auth/refresh',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('cimero-token')},
    }).then(response => {
      localStorage.setItem('cimero-token',response.data.token)
      store.commit("refresh",response.data.token)
      resolve()
    }).catch(err => {
      localStorage.removeItem('cimero-token')
      store.commit("loggedOut")
      reject()
    })
  })
}
