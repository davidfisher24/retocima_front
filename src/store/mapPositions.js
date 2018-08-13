export default {
  namespaced: true,
  state: {
    "cima-map": {
      center: {lat: 40.416775, lng: -3.703790},
      zoom: 6
    },
    "extrema-map": {
      center: {lat: 40.416775, lng: -3.703790},
      zoom: 6
    },
    "patanegra-map": {
      center: {lat: 40.416775, lng: -3.703790},
      zoom: 6
    }
  },


  mutations: {
    updatePosition (state, {name, center, zoom}) {
      if (!state[name]) state[name] = {};
      state[name].center = center
      state[name].zoom = zoom
    },
  },

  actions: {
    checkPosition (store,name) {
      return new Promise((resolve, reject) => {
        resolve(store.state[name])
      })
    },

    updatePosition (store,{name,center,zoom}) {
      store.commit("updatePosition", {name: name, center: center, zoom: zoom})
    }
  }
}