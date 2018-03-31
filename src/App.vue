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
          <v-list-tile-avatar color="primary">
          D
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{isLoggedIn}}</v-list-tile-title>
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


    <v-toolbar class="primary">
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}" class="white--text"  style="text-decoration:none;">
          Reto Cima
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <Button text="listado" route="listado"></Button>
        <Button text="ranking" route="ranking"></Button>
        <Button text="Estadistica"></Button>
        <Button text="Pata Negra" route="patanegra" params='{"format": "list"}'></Button>
        <Button text="Mapa" route="cima-map"></Button>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn" class="white--text"></v-toolbar-side-icon>
      <v-toolbar-items v-if="!isLoggedIn">
        <v-btn flat dark @click.native.stop="showLogin = !showLogin">Entrar</v-btn>
        <Button text="darse alta" route="register"></Button>
        <login v-if="showLogin" @close="showLogin = false" @login="login"></login>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import login from './components/Forms/Login'
import Button from './components/Button'

export default {
  components: {
    'login': login,
    'Button': Button
  },
  data () {
    return {
      drawer: false,
      showLogin: false,
      isLoggedIn: false
    }
  },
  beforeMount () {
    if (this.$store.state.isLoggedIn) this.isLoggedIn = this.$store.state.loggedInUser
    else this.isLoggedIn = false
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.isLoggedIn = false
    },
    login (data) {
      this.isLoggedIn = data.cimero.username
      this.showLogin = false
    },
    route (page) {
      this.$router.push({name: page});
    }
  }
}
</script>