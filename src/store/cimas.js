import { doRequest } from './requests'

export default {
  namespaced: true,

  state: {
  	provincias: {},
  	cimas: [],
    patanegra: null,
    markers: null,
    names: null,
  },

  getters: {

  },

  mutations: {
  	provincias (state, {data, params}) {
      state.provincias[params.id] = data
    },
    one (state, {data, params}) {
      if (!state.cimas.find(x => x.id === data.id)) state.cimas.push(data)
    },
    patanegra (state, {data, params}) {
      state.patanegra = data
    },
    names (state, {data, params}) {
      state.names = data
    },
    markers (state, {data, params}) {
      state.markers = data
    },
  },

  actions: {
  	one (store,id) {
      if (store.state.cimas.find(x => x.id === id)) return store.state.cimas.find(x => x.id === id)
      return doRequest(store, {
          url: 'cima/' + id,
          mutation: 'one',
      });
    },

    provincias (store, id) {
      if (store.state.provincias[id]) return store.state.provincias[id]
      return doRequest(store, {
          url: 'cimas/' + id,
          mutation: 'provincias',
          params: {id: id}
      });
    },

    patanegra (store) {
      if (store.state.patanegra) return store.state.patanegra
      return doRequest(store, {
      	url: 'patanegra',
      	mutation: 'patanegra'
      });
    },

    names (store) {
    	if (store.state.names) return store.state.names
    	if (store.state.markers) return store.state.markers
    	return doRequest(store, {
	      	url: 'cimas/list/names',
	      	mutation: 'names',
	     });
    },
    markers (store) {
    	if (store.state.markers) return store.state.markers
    	return doRequest(store, {
	      	url: 'cimas/list/markers',
	      	mutation: 'markers'
	     });
    },
    provinciaNames (store,id) {
      if (store.state.names) return store.state.names.filter(c => c.provincia_id === id)
      return doRequest(store, {
        url: 'cimas/list/names',
        mutation: 'names',
        callback: function(data){
          return data.filter(c => c.provincia_id === Number(id))
        },
     });
    },

    mapline (store,id) {
      return doRequest(store, {
        url: 'maplines/'+id,
      });
    },

    search (store,input) {
      return doRequest(store, {
        url: 'cimas/search/' + input,
      });
    },
  },
}