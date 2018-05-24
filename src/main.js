// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
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
  VSlider,
  VMenu,
  VPagination,
  VProgressCircular,
  VProgressLinear,
  transitions
} from 'vuetify'
//import '../node_modules/vuetify/src/stylus/app.styl'
import './stylus/main.styl'

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
    VProgressLinear,
    transitions
  },
  theme: {
    // Principal Theming //
    theme: '#44608c',
    primary: '#44608c',
    patanegra: '#000000',
    extrema: '#FFA500',
    // Others //
    light: '#ADD8E6',
    secondary: '#666666',
    accent: '#99560c',
    error: '#FF5252',
    info: '#F0E6DC',
    success: '#4CAF50',
    warning: '#FFC107',
    // Background //
    background: '#ebedf2',
    primaryBackground: '#ebedf2',
    patanegraBackground : '#d9d9d9',
    extremaBackground: '#ffebcc',
  }
})

Vue.use(require('vue2-google-maps'), {
  load: {
    key: 'AIzaSyAtqWsq5Ai3GYv6dSa6311tZiYKlbYT4mw'
  }
})

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
Vue.use(VueHighcharts, { Highcharts })

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

import PageTitle from './components/layout/PageTitle'

Vue.component('PageTitle', PageTitle)
