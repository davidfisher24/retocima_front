<template>
  <v-container fluid class="pa-0 my-2">

    <v-toolbar color="white" flat dense class="primary--text mb-3 ">
        <v-toolbar-title class="display-2">
           MIS LOGROS
        </v-toolbar-title>
    </v-toolbar>

      <v-layout row wrap>
          <v-flex xs12 md6 :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-3' : $vuetify.breakpoint.mdAndUp, }">
              <v-card>
                <v-list dense>
                  <v-list-tile :class="{'my-2': $vuetify.breakpoint.smAndDown}">
                      <v-layout row wrap >
                        <v-flex xs12 md6>
                          <v-list-tile-title class="headline primary--text" >
                            {{provincia.communidad.nombre}} -
                            <span class="subheading">{{provincia.nombre}}</span>
                          </v-list-tile-title>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-list-tile-title class="headline primary--text text-xs-right">
                            <span v-html="getCompletedTtl()"></span> completas | {{activeCimas.length}} total
                          </v-list-tile-title>
                        </v-flex>
                      </v-layout>
                    </v-list-tile-title>
                    </v-list-tile>

                    <!-- Main tiles for active cimas -->
                   <v-list-tile avatar v-for="item in activeCimas" :class="['ma-1', completed(item) ? 'info' : '']">
                    <v-list-tile-avatar color="primary" tile class="cima-avatar">
                        <span class="white--text">{{item.codigo}}</span>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title class="subheading primary--text"><strong>{{ item.nombre }}</strong></v-list-tile-title>
                      <v-list-tile-sub-title 
                      v-if="item.substitute && logroIds.indexOf(item.id) === -1 && completedPrevious(item.substitute)"
                      >
                        <strong>
                          Completaste la cima anterior {{item.substitute.nombre}}
                        </strong>
                      </v-list-tile-sub-title> 
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn fab dark small color="primary" class="xs-icon"
                        v-if="adding.indexOf(item.id) === -1 && logroIds.indexOf(item.id) === -1" 
                        @click="add(item.id)"
                    ><v-icon>add</v-icon></v-btn>
                      <v-btn fab dark small color="secondary" class="xs-icon" 
                        loading v-if="adding.indexOf(item.id) !== -1 "></v-btn>
                      <v-btn fab dark small color="accent" class="xs-icon"
                        v-if="adding.indexOf(item.id) === -1 && logroIds.indexOf(item.id) !== -1"
                        @click="remove(item.id)"
                    ><v-icon>remove</v-icon></v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>  
              </v-card>
            </v-flex>

          <v-flex xs12 md6 class="px-3">
              <v-card :class="{'mt-2': $vuetify.breakpoint.smAndDown }">
                <v-list>
                  <v-list-tile>
                      <v-list-tile-title class="headline primary--text">
                        {{provincia.communidad.nombre}} -
                        <span class="subheading">{{provincia.nombre}}</span>
                      </v-list-tile-title>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                  <v-divider inset></v-divider>

                    <!-- Tile 1 (Offifical total completed) -->
                   <v-list-tile content>
                    <v-list-tile-content>
                      <v-list-tile-title class="subheading primary--text"><strong v-html="getCompletedTtl()"></strong> Completadas</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                    <!-- Tile 2 (Offifical total to complete) -->
                     <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title class="subheading primary--text">
                        <strong v-html="getToCompleteTtl()"></strong> Por Ascender</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <!-- Tile 3 (Current number of active cimas) -->
                     <v-list-tile content>
                      <v-list-tile-title class="subheading primary--text"><strong>{{activeCimas.length}}</strong> Total de cimas de provincia</v-list-tile-title>
                    </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
      </v-layout> 

  </v-container>
</template>


<script>

import _ from 'lodash'
export default {

  data () {
    return {
      adding: [],
      pid: this.$route.params.pid,
      cimas: this.$route.params.cimas,
      logros: this.$route.params.logros,
      provincia: this.$route.params.provincia,
    }
  },

  computed: {
    activeCimas () {
      return this.cimas.filter(c => c.estado === 1)
    },
    inactiveCimas () {
      return this.cimas.filter(c => c.estado === 2 || c.estado === 3)
    },
    logroIds () {
      return _.map(this.logros, 'cima_id');
    },
  },

  methods: {

    completed (cima) {
      if (this.logros.find(l => l.cima_id == cima.id))
        return true
      if (cima.substitute) {
        if (cima.substitute) {
            if (this.logros.find(l => l.cima_id == cima.substitute.id))
              return true;
          }
      }
      return false;
    },
    completedPrevious (item) {
      return this.logros.find(x => x.cima_codigo == item.codigo)
    },

    getCompletedTtl() {
      return this.activeCimas.filter(c => this.completed(c)).length
    },

    getToCompleteTtl () {
      return this.activeCimas.length - this.getCompletedTtl();
    },

    add (id) {
      this.adding.push(id);
      this.$store.dispatch("user/addLogro",id).then(logro => {
        this.logros.push(logro)
        this.adding.splice(this.adding.indexOf(id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

    remove (id) {
      this.adding.push(id);
      var logro = this.logros.find(x => x.cima_id === id);
      this.$store.dispatch("user/removeLogro",logro).then(cima => {
        this.adding.splice(this.adding.indexOf(id),1);
        this.logros.splice(this.logros.findIndex(x => x.cima_id === id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

  }
}
</script>
