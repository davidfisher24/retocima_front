<template>
  <v-container fluid class="pa-0 mt-2">

      <v-layout row wrap>
          <v-flex xs6 class="px-3">
              <v-card>
                <v-list dense>
                  <v-list-tile-title >
                      Example title
                    </v-list-tile-title>
                  <v-list-tile avatar v-for="(item,i) in provinciaCimas" :key="item.id">
                    <v-list-tile-avatar>
                      {{ item.codigo }}
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn fab dark small color="primary" class="x-small" 
                        v-if="adding.indexOf(item.id) === -1 && logroIds.indexOf(item.id) === -1"
                        @click="add(item.id)"
                    >+</v-btn>
                      <v-btn fab dark small color="indigo" class="x-small" loading v-if="adding.indexOf(item.id) !== -1 "></v-btn>
                      <v-btn fab dark small color="accent" class="x-small" 
                        v-if="adding.indexOf(item.id) === -1 && logroIds.indexOf(item.id) !== -1"
                        @click="remove(item.id)"
                    >-</v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>

          <v-flex xs6 class="px-3">
              <v-card>
                <v-list>
                  <v-list-tile>
                      Example title
                    </v-list-tile>
                    <v-divider inset></v-divider>
                  <v-divider inset></v-divider>
                   <v-list-tile>
                      {{logros.length}} Completadas
                    </v-list-tile>
                     <v-list-tile>
                      {{provinciaCimas.length - logros.length}} Por Ascender
                    </v-list-tile>
                     <v-list-tile>
                      {{provinciaCimas.length}} Total de cimas de provincia
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
      provincia: this.$route.params.pid,
      cimas: this.$route.params.cimas,
      logros: this.$route.params.logros,
    }
  },

  computed: {
    provinciaCimas () {
      return this.cimas.filter(x => Number(x.provincia_id) === Number(this.provincia))
    },
    logroIds () {
      return _.map(this.logros, 'cima_id');
    },
  },

  methods: {
    add (id) {
      this.adding.push(id);
      this.$store.dispatch("addLogro",id).then(logro => {
        this.logros.push(logro)
        this.adding.splice(this.adding.indexOf(id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

    remove (id) {
      this.adding.push(id);
      var logro = this.logros.find(x => x.cima_id === id);
      this.$store.dispatch("removeLogro",logro).then(cima => {
        this.adding.splice(this.adding.indexOf(id),1);
        this.logros.splice(this.logros.findIndex(x => x.cima_id === id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

  }
}
</script>
