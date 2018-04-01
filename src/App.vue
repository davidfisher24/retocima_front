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
            {{isLoggedIn.substring(0, 1)}}
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


    <v-toolbar class="primary" app>
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}" class="white--text"  style="text-decoration:none;">
          Reto Cima
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <Button v-for="route in routes" :key="route.text" :text="route.text" :route="route.route" :params="route.params"></Button>
      </v-toolbar-items>
      <!--<v-menu offset-x :nudge-width="200" v-model="menu">
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile avatar  v-for="route in routes" :key="route.text" @click="">
              <v-list-tile-content>
                  <v-list-tile-title >
                    {{route.text.toUpperCase()}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
        </v-card>
      </v-menu>-->
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
      isLoggedIn: false,
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