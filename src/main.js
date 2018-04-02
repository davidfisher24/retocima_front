// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'
import axios from 'axios'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VDivider,
  VCard,
  VSystemBar,
  VTabs,
  VExpansionPanel,
  VBadge,
  VDataTable,
  VSubheader,
  VDialog,
  VForm,
  VTextField,
  VAlert,
  VChip,
  VAvatar,
  VSelect,
  VMenu,
  VPagination,
  VProgressCircular,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VDivider,
    VCard,
    VSystemBar,
    VTabs,
    VExpansionPanel,
    VBadge,
    VDataTable,
    VSubheader,
    VDialog,
    VForm,
    VTextField,
    VAlert,
    VChip,
    VAvatar,
    VSelect,
    VMenu,
    VPagination,
    VProgressCircular,
    transitions,
    axios
  },
  theme: {
    primary: '#44608c',
    light: '#ADD8E6',
    secondary: '#666666',
    accent: '#99560c',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(require('vue2-google-maps'), {
  load: {
    key: 'AIzaSyAtqWsq5Ai3GYv6dSa6311tZiYKlbYT4mw'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
