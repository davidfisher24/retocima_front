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
    >
      <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar v-if="loggedInUser">
          <v-list-tile-avatar color="primary">
            {{loggedInUser.substring(0, 1).toUpperCase()}}
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
    >
    <v-list class="pt-0" dense>
      <v-list-tile avatar v-if="loggedIn && loggedInUser">
        <v-list-tile-avatar color="primary">
          {{loggedInUser.substring(0, 1).toUpperCase()}}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{loggedInUser}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click.native.stop="showLogin = !showLogin" v-if="!loggedIn">
        <v-list-tile-action>Entrar</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="route('register')" v-if="!loggedIn">
        <v-list-tile-action>Darse Alta</v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-if="loggedIn" v-for="r in userRoutes" @click="route(r.route)">
        <v-list-tile-action>{{r.text}}</v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-for="r in routes" :key="r.text" @click="route(r.route,r.params)">
        <v-list-tile-action>{{r.text}}</v-list-tile-action>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

  
    <v-toolbar class="primary" app>
      <img src="@/assets/icons/logocima.png" height="38px" width="38px">
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}" class="white--text"  style="text-decoration:none;">
          Reto Cima
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Desktop main navigation -->
      <span class="hidden-sm-and-down">
        <v-toolbar-items>
          <Button v-for="route in routes" :key="route.text" :text="route.text" :route="route.route" :params="route.params"></Button>
        </v-toolbar-items>
      </span>
      <span class="hidden-sm-and-down">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="loggedIn" class="white--text"></v-toolbar-side-icon>
        <v-toolbar-items v-if="!loggedIn">
          <v-btn flat dark @click.native.stop="showLogin = !showLogin">Entrar</v-btn>
          <Button text="darse alta" route="register"></Button>
          <login v-if="showLogin" @close="showLogin = false"></login>
        </v-toolbar-items>
      </span>

      <!-- Mobile main navigation -->
      <span class="hidden-md-and-up">
        <login v-if="showLogin" @close="showLogin = false"></login>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      </span>
    </v-toolbar>

    <v-content>
      <v-progress-circular v-if="loading" indeterminate color="primary" :size="70"  style="position:fixed;bottom:3%;right:3%;z-index:1000;"></v-progress-circular>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import login from './components/Forms/Login'
import Button from './components/Button'
import { mapGetters } from 'vuex';

export default {
  components: {
    'login': login,
    'Button': Button
  },
  data () {
    return {
      drawer: false,
      showLogin: false,
      menu: false,
      routes: [
        {text:"listado", route:"listado"},
        {text:"ranking", route:"ranking"},
        {text:"Estadistica"},
        {text:"Pata Negra", route:"patanegra", params:{"format": "list"}},
        {text:"Mapa", route:"cima-map"},
      ],
      userRoutes: [
        {text:"Mis Logros", route:"user-logros"},
        {text:"Añadir Logros", route:"add-logros"},
        {text:"Graficos", route:"user-charts"},
        {text:"Editar Cuenta", route:"user-edit"},
        {text:"Cerrar Session", route:"logout"},
      ]
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn',
      loggedInUser: 'loggedInUser',
      loading: 'loading',
    }),
  },

  mounted () {
    if (this.loggedIn && !this.loggedInUser) this.$store.dispatch('verify')
  },
  
  watch: {
    loggedIn (state) {
      if (state === false) {
        if (this.$router.protected(this.$route)) this.$router.go({name: 'home'});
      }
    },
  },
 
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.showLogin = false
    },
    route (page,params) {
      if (page === 'logout') return this.logout();
      this.$router.push({name: page, params: params});
    }
  }
}
</script>