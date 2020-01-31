import { doRequest } from './requests'

export default {
  namespaced: true,

  state: {
  	climbs: [],
    all: []
  },

  getters: {
    markers: state => {
      return state.all.features.map(c => {
        c.marker = L.latLng(
          c.geometry.coordinates[1], c.geometry.coordinates[0]
        )
        return c
      })
    },
    oneById: (state) => (id) => {
      return state.climbs.find(c => c.id == id)
    },
  },

  mutations: {
    one (state, {data, params}) {
      if (!state.climbs.find(x => x.id === data.id)) state.climbs.push(data)
    },
    all (state, {data, params}) {
      state.all = data
    },
  },

  actions: {
  	one (store,id) {
      if (store.state.climbs.find(x => x.id === id)) return store.state.climbs.find(x => x.id === id)
      return doRequest(store, {
          url: 'climb/' + id,
          mutation: 'one',
      });
    },

    all (store) {
    	if (store.state.all.length > 0) return store.state.all
      return doRequest(store, {
  	      	url: 'climb/',
  	      	mutation: 'all'
  	    });
    },
  },
}