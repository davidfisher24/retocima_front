import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import scrollBehavior from './scrollBehavior'

// Pages
import HomePage from '@/components/HomePage'
import Listado from '@/components/Listado'
import PataNegra from '@/components/PataNegra'
import Ranking from '@/components/Ranking'
import Static from '@/components/Static/index'

// Components
import CimaList from '@/components/CimaList'
import Cima from '@/components/Cima'
import CimaMap from '@/components/CimaMap'

import Cimero from '@/components/Cimero'
import User from '@/components/User'

import Charts from '@/components/Charts/Container'
import LogroList from '@/components/LogroList'
import EditAccount from '@/components/Forms/EditAccount'
import UpdatePassword from '@/components/Forms/UpdatePassword'

import Register from '@/components/Forms/Register'

const protectedRoutes = [
  'user-logros', 'user-charts', 'user-provincia', 'user-edit', 'user-update-password'
]

Vue.use(Router)

const router = new Router({
  scrollBehavior,
  routes: [
    // Home page 
    {
      path: '/',
      name: 'home',
      component: HomePage,
      protected: true,
    },
    // Static Pages
    {path: '/nosotros/:page', name: 'nosotros', component: Static},
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
    {
      path: '/extrema',
      name: 'extrema',
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
    {
      path: '/extrema/cima/:cid',
      name: 'extrema-cima',
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
    {
      path: '/extrema-mapa',
      name: 'extrema-map',
      component: CimaMap,
      children: [
        {
          path: '/extrema/cima/:cid',
          name: 'extrema-cima',
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
    // Cuenta logros
    {
      path: '/cuenta/logros',
      name: 'user-logros',
      component: User,
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
    },
    // Change Password
    {
      path: '/cuenta/update-password',
      name: 'user-update-password',
      component: UpdatePassword
    }
  ],
})

/* Display the loading contain */
router.beforeEach((to,from,next) => {
  store.commit('loading',true)
  next()
})

/* Checks to protect pages if no logged in user */
router.beforeEach((to,from,next) => {
  if (protectedRoutes.indexOf(to.name) !== -1 && !store.getters['user/loggedIn']) next("/")
  else next()
})

/* Refreshes an expired token before continuing */
router.beforeEach((to,from,next) => {
  if (store.getters['user/loggedIn'] && store.getters['user/expiredToken']) {
    store.dispatch('user/refresh').then(() => next())
    .catch(() => {
      if (protectedRoutes.indexOf(to.name) !== -1) next("/")
      else next()
    })
  } else {
    next()
  }
})

/* Verifies an undefined user before continuing */
router.beforeEach((to,from,next) => {
  if (store.getters['user/loggedIn'] && !store.getters['user/loggedInUser']) store.dispatch('user/verify').then(() => next())
  else next()
})

/* Brings the data back from the server */
router.beforeEach((to, from, next) => {
  if (to.name === 'cima' || to.name === 'discover' || to.name === 'map-cima') {
    store.dispatch('cimas/one', to.params.id).then(cima => {
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
    store.dispatch('cimas/patanegra').then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'extrema-cima' || to.name === 'extrema' || to.name === 'extrema-map') {
    if (to.name === 'extrema-map') {
      to.params.center = {lat: 40.416775, lng: -3.703790}
      to.params.zoom = 6
    }
    store.dispatch('cimas/extrema').then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'provincia-cima' || to.name === 'provincia' || to.name === 'provincia-map') {
    store.dispatch('cimas/provincias', Number(to.params.pid)).then(cimas => {
      to.params.cimas = cimas
      next()
    })
  } else if (to.name === 'listado') {
    store.dispatch('listado').then(listado => {
      to.params.listado = listado
      next()
    })
  } else if (to.name === 'cima-map') {
    store.dispatch('cimas/markers').then(cimas => {
      to.params.cimas = cimas
      to.params.center = {lat: 40.416775, lng: -3.703790}
      to.params.zoom = 6
      next()
    })
  } else if (to.name === "cimero") {
    var promise1 = store.dispatch("cimeros",to.params.uid)
    var promise2 = store.dispatch('cimas/names')

    Promise.all([promise1,promise2]).then(data => {
      to.params.cimero = data[0]
      to.params.cimas = data[1]
      next();
    })
  } 
  // CUENTA
  else if (to.name === 'user-logros' || to.name === 'user-charts' || to.name === 'user-edit') {
    var promise1 = store.dispatch("user/account",to.params.uid)
    Promise.all([promise1]).then(data => {
      to.params.cimero = data[0]
      next();
    })
  } else if (to.name === 'user-provincia') {
    var promise1 = store.dispatch('user/provinceLogros',to.params.pid)
    var promise2 = store.dispatch('cimas/provinciaNames',to.params.pid)
    var promise3 = store.dispatch('provincias/one',to.params.pid)
    //var promise4 = store.dispatch('provinciaLogros',to.params.pid)

    Promise.all([promise1,promise2,promise3/*,promise4*/]).then(data => {
      console.log(data)
      to.params.logros = data[0]
      to.params.cimas = data[1]
      to.params.provincia = data[2]
      //to.params.provinciaLogros = data[3]
      next();
    })
  } else {
    next()

  }
})

/* Turns off the loading container */
router.afterEach((to, from) => {
  store.commit('loading',false)
})


router.protected = function(route){
  return protectedRoutes.indexOf(route.name) !== -1;
};

export default router
