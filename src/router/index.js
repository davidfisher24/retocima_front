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
import AddLogros from '@/components/AddLogros'
import LogroList from '@/components/LogroList'
import EditAccount from '@/components/Forms/EditAccount'

import Register from '@/components/Forms/Register'

const protectedRoutes = [
  'user-logros', 'user-charts', 'user-provincia', 'add-logros', 'user-edit'
]

Vue.use(Router)

const router = new Router({
  routes: [
    // Home page 
    {
      path: '/',
      name: 'home',
      component: HomePage,
      protected: true,
    },
    // Listado page
    {
      path: '/listado',
      name: 'listado',
      component: Listado
    },
    // Single cima page
    {
      path: '/cima/:id',
      name: 'cima',
      component: Cima
    },
    // Provincia page & pata negra page (cima list)
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
      children: [
        {
          path: '/provincia/:pid/:cid',
          name: 'provincia-cima',
          component: Cima
        }
      ]
    },
    {
      path: '/patanegra-mapa',
      name: 'patanegra-map',
      component: CimaMap,
      children: [
        {
          path: '/patanegra/cima/:cid',
          name: 'patanegra-cima',
          component: Cima
        }
      ]
    },
    // Ranking table with cimero child
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
    },
    {
      path: '/cimero/:uid',
      name: 'cimero',
      component: Cimero
    },
    // Register form
    {
      path: '/register',
      name: 'register',
      component: Register
    },


    // CUENTA //
    {
      path: '/cuenta/edit',
      name: 'user-edit',
      component: EditAccount,
    },
    {
      path: '/cuenta/add-logros',
      name: 'add-logros',
      component: AddLogros,
    },
    // Cuenta logros
    {
      path: '/cuenta/logros',
      name: 'user-logros',
      component: Cimero
    },
    // Logros in a provincia add
    {
      path: '/cuenta/logros/provincia/:pid',
      name: 'user-provincia',
      component: LogroList
    },
    // Cuenta graphics
    {
      path: '/cuenta/graficos',
      name: 'user-charts',
      component: Charts
    }
  ]
})

router.beforeEach((to,from,next) => {
  if (protectedRoutes.indexOf(to.name) !== -1 && !store.getters.loggedIn) next("/")
  else next()
})

router.beforeEach((to, from, next) => {
  store.commit('loading',true)
  if (to.name === 'cima' || to.name === 'discover') {
    store.dispatch('cima', to.params.id).then(cima => {
      to.params.cima = cima
      next()
    })
  } else if (to.name === 'ranking') {
    store.dispatch('ranking').then(data => {
      to.params.storeData = data
      next()
    });
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
    store.dispatch('provincia', Number(to.params.pid)).then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'listado' || to.name === 'add-logros') {
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
  } else if (to.name === 'user-logros' || to.name === "cimero" || to.name === 'user-charts' || to.name === 'user-edit') {
    var dispatch = to.name === 'user-logros' || to.name === 'user-charts' || to.name === 'user-edit' ? "authCimero" : "cimeros";
    var promise1 = store.dispatch(dispatch,to.params.uid)
    var promise2 = store.dispatch('allCimas')

    Promise.all([promise1,promise2]).then(data => {
      to.params.cimero = data[0]
      to.params.cimas = data[1]
      next();
    })

    /*store.dispatch(dispatch,to.params.uid).then(cimero => {
        to.params.cimero = cimero;
        next();
    });*/
  } else if (to.name === 'user-provincia') {
    store.dispatch("userProvinceLogros",to.params.pid).then(data => {
        to.params.data = data;
        next();
    });
  } else {
    next()

  }
})

router.afterEach((to, from) => {
  store.commit('loading',false)
})



router.protected = function(route){
  return protectedRoutes.indexOf(route.name) !== -1;
};

export default router
