import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Pages
import HomePage from '@/components/HomePage'
import Listado from '@/components/Listado'
import PataNegra from '@/components/PataNegra'
import Ranking from '@/components/Ranking'

// Components
import CCAAList from '@/components/CCAAList'
import CimaList from '@/components/CimaList'
import Cima from '@/components/Cima'
import CimaMap from '@/components/CimaMap'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: '/discover/:id',
          name: 'discover',
          component: Cima,
        },
      ]
    },
    {
      path: '/listado',
      name: 'listado',
      component: Listado,
    },
    {
      path: '/cima/:id',
      name: 'cima',
      component: Cima,
    },
    {
      path: '/provincia/:pid/:format',
      name: 'provincia',
      component: CimaList,
    },
    {
      path: '/provincia/:pid/:cid',
      name: 'provincia-cima',
      component: Cima,
    },
    {
      path: '/patanegrea/:format',
      name: 'patanegra',
      component: CimaList,
    },
    {
      path: '/patanegra/cima/:cid',
      name: 'patanegra-cima',
      component: Cima,
    },
    {
      path: '/mapa',
      name: 'cima-map',
      component: CimaMap,
      children: [
        {
          path: '/cima/:cid',
          name: 'map-cima',
          component: Cima,
        },
      ]
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
  ]
});


router.beforeEach((to, from, next) => {
  if (to.name === 'cima' || to.name === 'discover') {
    store.dispatch('cima',to.params.id).then(cima => {
      to.params.cima = cima;
      next();
    })
  } else if (to.name === 'patanegra-cima' || to.name === 'patanegra') {
    store.dispatch('patanegra').then(cimas => {
      to.params.cimas = cimas;
      next();
    })
  } else if (to.name === 'provincia-cima' || to.name === 'provincia') {
    store.dispatch('provincia',to.params.pid).then(cimas => {
      to.params.cimas = cimas;
      next();
    })
  } else if (to.name === 'listado') {
    store.dispatch('listado').then(listado => {
      to.params.listado = listado;
      next();
    })
  } else if (to.name === 'cima-map' || to.name === 'map-cima') {
    store.dispatch('allCimas').then(cimas => {
      to.params.cimas = cimas;
      to.params.center = {lat: 40.416775, lng: -3.703790};
      to.params.zoom = 6;
      next();
    })
  } else {
    next();
  }
  
})

export default router;
