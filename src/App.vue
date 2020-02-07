<template>
  <v-app>

    <!-- Desktop navigation drawer -->
    <v-navigation-drawer
      v-if="loggedIn"
      temporary
      v-model="drawer"
      right
      class="hidden-sm-and-down"
      app
      :permanent="preventDrawerClose"
      style="z-index:1200;"
    >
      <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar v-if="loggedInUser">
          <v-list-tile-avatar color="primary" >
            <span class="white--text">{{loggedInUser.substring(0, 1).toUpperCase()}}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{loggedInUser}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="r in userRoutes" @click="route(r.route)">
        <v-list-tile-action>{{r.text}}</v-list-tile-action>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

    <!-- Mobile navigation drawer -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      right
      class="hidden-md-and-up"
      app
      style="z-index:1200;"
    >
    <v-list class="pt-0 primary--text" dense>
      <v-list-tile avatar v-if="loggedIn && loggedInUser">
        <v-list-tile-avatar color="primary" class="white--text">
          {{loggedInUser.substring(0, 1).toUpperCase()}}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{loggedInUser}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <template v-for="r in routes">
        <v-list-tile v-if="r.route" :key="r.text" @click="route(r.route,r.params)">
          <v-list-tile-action primary style="text-transform:uppercase;"><span>{{r.text}}</span></v-list-tile-action>
        </v-list-tile>
         <v-list-group v-else append-icon="">
            <v-list-tile slot="activator" @mouseover="preventDrawerClose = true" @mouseleave="preventDrawerClose = false" >
              <span style="text-transform:uppercase;" class="list__tile list__tile--link primary--text pl-0">{{r.text}}</span>
              <v-icon style="position:absolute;right:0;">keyboard_arrow_down</v-icon>
            </v-list-tile>
            <v-list-tile v-for="r in r.menu" v-if="r.route" :key="r.text" @click="route(r.route,r.params)">
              <v-list-tile-action primary><span class="pl-2">{{r.text}}</span></v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </template>

      <v-divider></v-divider><hr class="primary mx-3" style="font-weight:400;">
      <v-list-tile v-if="loggedIn" v-for="r in userRoutes" @click="route(r.route)">
        <v-list-tile-action >{{r.text}}</v-list-tile-action>
      </v-list-tile>

      <v-list-tile v-if="!loggedIn" @click.native.stop="showLogin = !showLogin" @click="">
        <v-list-tile-action>Entrar</v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="!loggedIn" @click="route('register')">
        <v-list-tile-action>Darse Alta</v-list-tile-action>
      </v-list-tile>

    </v-list>
    </v-navigation-drawer>

    <!-- Global Alert -->
    <v-alert
      :value="globalAlert.show"
      :type="globalAlert.type"
      transition="scale-transition"
      dismissible
      style="position:fixed;left:10px;bottom:50px;z-index:2000;"
    > {{globalAlert.message}}
    </v-alert>

  
    <v-toolbar class="theme" app style="z-index:1100;">
      <router-link :to="{ name: 'home'}">
        <img src="@/assets/icons/logowhite.png" height="38px" width="38px">
      </router-link>
      <v-toolbar-title class="ml-0">
        <router-link :to="{ name: 'home'}" class="white--text"  style="text-decoration:none;">
          <span class="display-3">Reto CIMA</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Desktop main navigation -->
      <span class="hidden-sm-and-down">
        <v-toolbar-items>
          <template  v-for="route in routes">
          <Button v-if="route.route" :key="route.text" :text="route.text" textColor="white" underline="true" :route="route.route" :params="route.params"></Button>
            <!-- Dropdown tamplate -->
            <v-menu open-on-hover offset-y v-else>
              <Button :text="route.text" textColor="white" slot="activator"></Button>
              <v-list dense class="mt-2"><v-list-tile v-for="route in route.menu" class="pa-0 ma-0">
                <Button :key="route.text" :text="route.text" textColor="primary" underline="true" lowercase="true" :route="route.route" :params="route.params"></Button>
              </v-list-tile></v-list>
            </v-menu>
          </template>
        </v-toolbar-items>
      </span>
      <span class="hidden-sm-and-down">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="loggedIn" class="white--text"></v-toolbar-side-icon>
        <v-toolbar-items v-if="!loggedIn">
          <Button text="entrar" textColor="primary" lowercase="true" bgColor="white" @click.native.stop="showLogin = !showLogin" class="mr-2"></Button>
          <Button text="darse alta" route="register" lowercase="true"  bgColor="white" textColor="primary" class="mr-2"></Button>
        </v-toolbar-items>
      </span>

      <!-- Mobile main navigation -->
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      </span>
    </v-toolbar>

    <!-- Pop up dialogs -->
    <v-content class="background">
      <v-dialog :value='showLogin'>
      <login 
        v-click-outside="hideModals"
        @close="hideModals"
        @forgotPassword="showLogin = false, showForgotPassword = true"
      ></login>
      </v-dialog>
      <v-dialog :value='showForgotPassword'>
      <forgotPassword 
        v-click-outside="hideModals"
        @closeForgotPassword="showForgotPassword = false, showLogin = true"
        @closeAll="showForgotPassword = false, showLogin = false"
      ></forgotPassword>
      </v-dialog>
      <v-progress-circular v-if="loading" indeterminate color="primary" :size="70"  style="position:fixed;bottom:3%;right:3%;z-index:1000;"></v-progress-circular>
        <router-view/>
    </v-content>

    <v-footer color="theme" height="auto">
      <v-layout row class="white--text hidden-sm-and-down">
        <v-flex class="text-xs-center">
        Coordinadores <strong>Diego Agüero y Miguel Bernabe</strong> |
        Esta aventura comenzo el 13 de junio de 2007 |
        Email de contacto: <strong>cima@altimetrias.com</strong>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="white--text hidden-md-and-up text-xs-center">
        <v-flex xs12>Coordinadores <strong>Diego Aguero y Miguel Bernabe</strong></v-flex>
        <v-flex xs12>Esta aventura comenzo el 13 de junio de 2007 </v-flex>
        <v-flex xs12>Email de contacto: <strong>cima@altimetrias.com</strong></v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>



<script>

import login from './components/Forms/Login'
import forgotPassword from './components/Forms/ForgotPassword'
import Button from './components/Button'
import { mapGetters } from 'vuex';
import applyTheming from './applyTheming'

export default {
  components: {
    'login': login,
    'forgotPassword' : forgotPassword,
    'Button': Button
  },
  data () {
    return {
      drawer: false,
      drawerTracker: false,
      showLogin: false,
      showForgotPassword: false,
      preventDrawerClose: false,
      menu: false,

      routes: [
        {text: "nosotros", menu: [
          {text:"Bases", route:"nosotros", params:{"page": "bases"}},
          {text:"Normas Listado", route:"nosotros", params:{"page": "normas"}},
          {text:"Certificados", route:"nosotros", params:{"page": "certificados"}},
          {text:"Preguntas mas frecuentes", route:"nosotros", params:{"page": "pmf"}},
          {text:"!!Al zurron!!", route:"nosotros", params:{"page": "zurron"}},
          {text:"Responsables", route:"nosotros", params:{"page": "responsables"}}
        ]},
        {text:"listado", route:"listado"},
        {text:"Mapa", route:"cima-map"},
        {text:"ranking", route:"ranking"},
        {text: "otros retos", menu: [
          {text:"Escalador Extrem", route:"extrema", params:{"format": "list"}},
          {text:"Madera y viento"},
          {text:"Pata negra", route:"patanegra", params:{"format": "list"}},
        ]}
      ],
      userRoutes: [
        {text:"Favoritios", route:"user-bookmarks"},
        {text:"Editar Cuenta", route:"user-edit"},
        {text:"Cambiar Contraseña", route:"user-update-password"},
        {text:"Cerrar Session", route:"logout"},
      ]
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      loggedInUser: 'user/loggedInUser',
      loading: 'loading',
      globalAlert: 'globalAlert'
    }),
  },

  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      if (this.$router.protected(this.$route)) this.$router.push({name: 'home'})
      this.showLogin = false
    },
    route (page,params) {
      if (page === 'logout') return this.logout();
      this.$router.push({name: page, params: params});
    },
    hideModals () {
      this.showLogin = false;
      this.showForgotPassword = false;
    },
    temporarilyHideDrawer (val) {
      if (val && this.drawer) {
        this.drawerTracker = true;
        this.drawer = false;
      }
      if (!val && this.drawerTracker) {
        this.drawerTracker = false
        this.drawer = true;
      }
    }
  },

  watch: {
    showLogin (val) {
      this.temporarilyHideDrawer(val)
    },
    showForgotPassword (val) {
      this.temporarilyHideDrawer(val)
    },
    globalAlert (alert) {
      if (alert.show) setTimeout(() => this.$store.dispatch('closeGlobalAlert',null),4000)
    },
    '$route.name' (name) {
      applyTheming(name,this.$vuetify)
    }
  },

  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          
          console.warn(warn)
        }
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        document.addEventListener('click', handler)
      },
      
      unbind: function(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
}
</script>