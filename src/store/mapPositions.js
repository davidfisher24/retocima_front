export default {
  namespaced: true,
  state: {
    "default": {
      center: {lat: 40.416775, lng: -3.703790},
      zoom: 6
    }
  },

  getters: {
    getPosition: (state) => (route) => {
      return route in state ? state[route] : null
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
    updatePosition (store,{name,center,zoom}) {
      store.commit("updatePosition", {name: name, center: center, zoom: zoom})
    }
  }
}