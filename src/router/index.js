import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Pages
import HomePage from '@/components/HomePage'
import Listado from '@/components/Listado'
import PataNegra from '@/components/PataNegra'
import Ranking from '@/components/Ranking'

// Components
import CimaList from '@/components/CimaList'
import Cima from '@/components/Cima'
import CimaMap from '@/components/CimaMap'

import Cimero from '@/components/Cimero'
import Charts from '@/components/Charts/Container'

import Register from '@/components/Forms/Register'

Vue.use(Router)

const router = new Router({
  routes: [
    // Home page with discover child
    {
      path: '/',
      name: 'home',
      component: HomePage,
      protected: true,
      children: [
        {
          path: '/discover/:id',
          name: 'discover',
          component: Cima
        }
      ]
    },
    // Listado page
    {
      path: '/listado',
      name: 'listado',
      component: Listado
    },
    // Single cima page (functions as child)
    {
      path: '/cima/:id',
      name: 'cima',
      component: Cima
    },
    // Provincia or pata negra list page 
    {
      path: '/provincia/:pid',
      name: 'provincia',
      component: CimaList
    },
    {
      path: '/patanegra',
      name: 'patanegra',
      component: CimaList
    },
    // Provincia or pata negra with cima group page
    {
      path: '/provincia/:pid/:cid',
      name: 'provincia-cima',
      component: Cima
    },  
    {
      path: '/patanegra/cima/:cid',
      name: 'patanegra-cima',
      component: Cima
    },
    // Map with cima child
    {
      path: '/mapa',
      name: 'cima-map',
      component: CimaMap,
      children: [
        {
          path: '/cima/:cid',
          name: 'map-cima',
          component: Cima
        }
      ]
    },
    {
      path: '/provincia-mapa/:pid',
      name: 'provincia-map',
      component: CimaMap,
    },
    {
      path: '/patanegra-mapa',
      name: 'patanegra-map',
      component: CimaMap,
    },
    // Ranking table with cimero child
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
      children: [
        {
          path: '/cimero/:uid',
          name: 'cimero',
          component: Cimero
        }
      ]
    },
    // Register form
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // Cuenta logros
    {
      path: '/cuenta/logros',
      name: 'user-logros',
      component: Cimero
    },
    // Cuenta graphics
    {
      path: '/cuenta/graficos',
      name: 'user-charts',
      component: Charts
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.name === 'cima' || to.name === 'discover') {
    store.dispatch('cima', to.params.id).then(cima => {
      to.params.cima = cima
      next()
    })
  } else if (to.name === 'patanegra-cima' || to.name === 'patanegra' || to.name === 'patanegra-map') {
    if (to.name === 'patanegra-map') {
      to.params.center = {lat: 40.416775, lng: -3.703790}
      to.params.zoom = 6
    }
    store.dispatch('patanegra').then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'provincia-cima' || to.name === 'provincia' || to.name === 'provincia-map') {
    store.dispatch('provincia', to.params.pid).then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'listado') {
    store.dispatch('listado').then(listado => {
      to.params.listado = listado
      next()
    })
  } else if (to.name === 'cima-map' || to.name === 'map-cima') {
    store.dispatch('allCimas').then(cimas => {
      to.params.cimas = cimas
      to.params.center = {lat: 40.416775, lng: -3.703790}
      to.params.zoom = 6
      next()
    })
  } else {
    next()
  }
})

router.protectedRoutes = [
  'add-logros', 'user-logros', 'user-charts'
]

router.protected = function(route){
  return this.protectedRoutes.indexOf(route.name) !== -1;
};

export default router
