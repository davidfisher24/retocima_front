import { doRequest } from './requests'
import _ from 'lodash'

export default {
  namespaced: true,

  state: {
  	all: null,
    provinces: []
  },

  getters: {
    regions: state => _.uniqBy(state.all.map(p => p.region), 'id'),
    byRegion: (state) => (id) => state.all.filter(p => p.region.id == id),
    byId: (state) => (id) => state.all.find(p => p.id == id)
  },

  mutations: {
    one (state, {data, params}) {
      if (!state.provinces.find(x => x.id === data.id)) state.provinces.push(data)
    },
  	all (state, {data, params}) {
      state.all = data.results
    },
  },

  actions: {
  	all (store) {
      if (store.state.all) return store.state.all
      return doRequest(store, {
            url: 'province?limit=52',
            mutation: 'all'
        });
    },

    one (store,pid) {
      if (store.state.provinces.find(x => x.id === id)) return store.state.provinces.find(x => x.id === id)
      return doRequest(store, {
          url: 'province/' + id,
          mutation: 'one',
      });
    },
  }
}