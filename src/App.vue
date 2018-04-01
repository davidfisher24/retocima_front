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
        <v-list-tile avatar>
          <v-list-tile-avatar color="primary">
            {{loggedIn.substring(0, 1).toUpperCase()}}
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{loggedIn}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile @click="route('user-logros')">
        <v-list-tile-action>Mis Logros</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="route('user-charts')">
        <v-list-tile-action>Graficos</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-action>Cerrar Session</v-list-tile-action>
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
      <v-divider></v-divider>
      <v-list-tile @click.native.stop="showLogin = !showLogin" v-if="!loggedIn">
        <v-list-tile-action>Entrar</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="route('register')" v-if="!loggedIn">
        <v-list-tile-action>Darse Alta</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="route('user-logros')" v-if="loggedIn">
        <v-list-tile-action>Mis Logros</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="route('user-charts')" v-if="loggedIn">
        <v-list-tile-action>Graficos</v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="logout" v-if="loggedIn">
        <v-list-tile-action>Cerrar Session</v-list-tile-action>
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn',
    }),
  },
 
  methods: {
    logout () {
      this.$store.dispatch('logout')
      if (this.$router.protected(this.$route)) this.$router.push({name: 'home'});
      this.showLogin = false;
    },
    route (page,params) {
      console.log(page);
      console.log(params);
      this.$router.push({name: page, params: params});
    }
  }
}
</script>