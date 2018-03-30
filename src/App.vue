// App.vue

<template>
  <v-app>

    <v-navigation-drawer
      v-if="isLoggedIn"
      temporary
      v-model="drawer"
      absolute
      right
    >
      <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{isLoggedIn}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon></v-icon>
          Cerrar Session
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>


    <v-toolbar class="primary">
      <v-toolbar-title><router-link :to="{ name: 'home'}">Reto Cima</router-link></v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat dark :to="{ name: 'listado'}">Listado</v-btn>
        <v-btn flat dark :to="{ name: 'ranking'}">Ranking</v-btn>
        <v-btn flat dark>Estadistica</v-btn>
        <v-btn flat dark :to="{ name: 'patanegra', params: {format: 'list'}}">Pata Negra</v-btn>
        <v-btn flat dark :to="{ name: 'cima-map'}">Mapa</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-toolbar-side-icon>
      <v-toolbar-items v-if="!isLoggedIn">
        <v-btn flat dark @click.native.stop="showLogin = !showLogin">Entrar</v-btn>
        <v-btn flat dark @click.native.stop="showRegister = !showRegister">Darse Alta</v-btn>
        <login v-if="showLogin" @close="showLogin = false" @login="login"></login>
        <register v-if="showRegister" @close="showLogin = false"></register>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import login from './components/Forms/Login';
import register from './components/Forms/Register';


export default {
  components: {
    'login' : login,
    'register' : register,
  },

  data () {
    return {
      drawer: false,
      showLogin: false,
      showRegister: false,
      isLoggedIn: false,
    }
  },

  beforeMount(){
    if (this.$store.state.isLoggedIn) this.isLoggedIn = this.$store.state.loggedInUser;
    else this.isLoggedIn = false;
  },

  methods: {
    logout () {
      this.$store.dispatch("logout");
      this.isLoggedIn = false;
    },
    login(data){
      this.isLoggedIn = data.cimero.username;
      this.showLogin = false;
    },
  },
}
</script>