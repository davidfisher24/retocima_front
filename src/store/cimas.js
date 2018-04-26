import { doRequest } from './requests'

export default {

  state: {
  	provincias: {},
  	cimas: [],
  	//allCimas: null,
    patanegra: null,
    markers: null,
    names: null,
  },

  getters: {

  },

  mutations: {
  	provincia (state, {data, params}) {
      //if (!state.provincias.find(x => x.id === params.id)) state.provincias.push({val: data, id: params.id})
      stata.provincias[params.id] = data
    },
    /*allCimas (state, {data, params}) {
      state.allCimas = data
    },*/
    cima (state, {data, params}) {
      if (!state.cimas.find(x => x.id === data.id)) state.cimas.push(data)
    },
    patanegra (state, {data, params}) {
      state.patanegra = data
    },
    names (state, {data, params}) {
      state.name = data
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
     /* Uses all cimas list */
    /*allCimas (store) {
      if (store.state.allCimas) return store.state.allCimas
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
      });
    },*/

    /* Uses all cimas list */
    /*provincia (store, id) {
      if (store.state.allCimas) return store.state.allCimas.filter(c => c.provincia_id === id)
      return doRequest(store, {
          url: 'cimas',
          mutation: 'allCimas',
          callback: function(data){
            return data.filter(c => c.provincia_id === id)
          }
      });
    },*/

    provincia (store, id) {
      if (store.state.provincias[id]) return store.state.provincias[id]
      return doRequest(store, {
          url: 'cimas/' + id,
          mutation: 'provincia',
          /*callback: function(data){
            return data.filter(c => c.provincia_id === id)
          }*/
      });
    },

    /* Uses all cimas list */
    patanegra (store) {
      //if (store.state.allCimas) return store.state.allCimas.filter(c => c.pata_negra === 1)
      if (store.state.patanegra) return store.state.patanegra
      return doRequest(store, {
      	url: 'patanegra',
      	mutation: 'patanegra'
          //url: 'cimas',
          //mutation: 'allCimas',
          /*callback: function(data){
            return data.filter(c => c.pata_negra === 1)
          }*/
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
    }
  },
}