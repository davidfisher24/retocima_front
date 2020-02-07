import { doRequest, doAuthRequest, doUploadRequest } from './requests'

export default {
  namespaced: true,
  
  state: {
  },

  getters: {

  },

  mutations: {
  },

  actions: {
    getPhotos (store, climbId, page) {
      return doRequest(store, {
          url: 'photo?climb=' + climbId + '&page=' + (page ? page : 1),
          method:'get'
      });
    },

    createPhoto (store,files) {
      return doUploadRequest(store, {
          url: 'photo/',
          files: files
      });
    },


  },

}