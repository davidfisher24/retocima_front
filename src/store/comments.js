import { doRequest, doAuthRequest } from './requests'

export default {
  namespaced: true,
  
  state: {
  },

  getters: {

  },

  mutations: {
  },

  actions: {
    getComments (store, climbId, page) {
      return doRequest(store, {
          url: 'comment?climb=' + climbId + '&page=' + (page ? page : 1),
          method:'get'
      });
    },

    createComment (store,data) {
      return doAuthRequest(store, {
          url: 'comment/',
          method: 'post',
          data: data
      });
    },


  },

}