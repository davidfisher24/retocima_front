<template >
  <v-container fluid class="pa-0 mt-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>

        <v-toolbar color="white" flat dense class="primary--text mb-3 ">
            <v-toolbar-title class="display-2">
                <span><strong>Listado de cimas </strong> </span>
                <span class="display-1 theme--text">{{title}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="mr-0" v-if="mapRoute">
              <v-btn flat @click="changeMap()">MAPA</v-btn>
            </v-toolbar-items>
          </v-toolbar>

        <v-flex xs12 v-for="(chunk,index) in chunkedCimas" :key="index" 
        :class="[{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }, 'md6']">
          
          <v-list three-line class="primary--text py-0" v-for="(cima, i) in chunk">
            <v-list-tile avatar :key="cima.id" @click="route(cima.id)">
              <v-list-tile-avatar color="primary" tile>
                  <span class="white--text">{{cima.id}}</span>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="cima.properties.name" class="title primary--text"></v-list-tile-title>

                <v-list-tile-sub-title class="subheading primary--text">
                  <i>Altitud:</i>&nbsp;&nbsp;<span>{{cima.properties.altitude}}</span>
                  <i>Distancia:</i>&nbsp;&nbsp;<span>{{cima.properties.distance.toFixed(2) + 'km'}}</span>
                </v-list-tile-sub-title>

                <v-list-tile-sub-title class="subheading primary--text">
                  <i>Gradient:</i>&nbsp;&nbsp;<span>{{cima.properties.gradient.toFixed(2) + '%'}}</span>
                  <i>Desnivel:</i>&nbsp;&nbsp;<span>{{cima.properties.gain + 'm'}}</span>
                </v-list-tile-sub-title>

              </v-list-tile-content>
            </v-list-tile>  
          </v-list>


        </v-flex>
      </v-layout> 
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import _ from 'lodash'
export default {

  data () {
    return {
      cimas: this.$store.getters['cimas/byProvince'],
      province: this.$store.getters['provincias/byId'](this.$route.params.id),
      mapRoute: null,
    }
  },


  computed: {
     title () {
      return this.province.name
     },

     chunkedCimas () {
        const divider = Math.ceil(this.cimas.length/2)
        return _.chunk(this.cimas,divider);
     },
  },

  methods: {
    changeMap() {
      this.$router.push(this.mapRoute)
    },
    route (id) {
      this.$router.push({name: 'cima', params: {id: id}});
    },
  }
}
</script>
