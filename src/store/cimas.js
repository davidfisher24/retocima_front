import { doRequest } from './requests'

export default {

  state: {
  	provincia: {},
  	cimas: [],
    patanegra: null,
    markers: null,
    names: null,
  },

  getters: {

  },

  mutations: {
  	provincia (state, {data, params}) {
      state.provincia[params.id] = data
    },
    cima (state, {data, params}) {
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
  	cima (store,id) {
      if (store.state.cimas.find(x => x.id === id)) return store.state.cimas.find(x => x.id === id)
      return doRequest(store, {
          url: 'cima/' + id,
          mutation: 'cima',
      });
    },

    provincia (store, id) {
      if (store.state.provincia[id]) return store.state.provincia[id]
      return doRequest(store, {
          url: 'cimas/' + id,
          mutation: 'provincia',
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

    cimaNames (store) {
    	if (store.state.names) return store.state.names
    	if (store.state.markers) return store.state.markers
    	return doRequest(store, {
	      	url: 'cimas/list/names',
	      	mutation: 'names',
	     });
    },
    cimaMarkers (store) {
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

    cimaMapline (store,id) {
      return doRequest(store, {
        url: 'maplines/'+id,
      });
    },

    cimaSearch (store,input) {
      return doRequest(store, {
        url: 'cimas/search/' + input,
      });
    },
  },
}