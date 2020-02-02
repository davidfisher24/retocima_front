import { doRequest } from './requests'

export default {
  namespaced: true,

  state: {
  	climbs: [],
    all: null,
    province: null
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
    byProvince: (state) => {
      return state.province.features
    }
  },

  mutations: {
    one (state, {data, params}) {
      if (!state.climbs.find(x => x.id === data.id)) state.climbs.push(data)
    },
    all (state, {data, params}) {
      state.all = data
    },
    byProvince (state, {data, params}) {
      state.province = data
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
    	if (store.state.all) return store.state.all
      return doRequest(store, {
  	      	url: 'climb/',
  	      	mutation: 'all'
  	    });
    },
    byProvince (store, id) {
      return doRequest(store, {
            url: 'climb/province?id=' + id ,
            mutation: 'byProvince'
        });
    }
  },
}