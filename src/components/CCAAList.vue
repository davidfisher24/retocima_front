<template>
    <v-layout row wrap v-if="comms">
      <v-flex md6 xs12 sm12  v-for="(chunk,index) in chunkedCommunidads" :key="index" class="px-3">
          <v-expansion-panel >
              <v-expansion-panel-content v-for="(communidad,index) in chunk" :key="communidad.id" class="primary--text">
                <div slot="header" >
                      <Flag :id="communidad.id"></Flag>
                      <span class="subheading"><strong>{{communidad.nombre}}</strong></span>&nbsp;&nbsp;&nbsp;
                      <span class="subheading"><i>{{communidad.cimas_count}} cimas</i></span>
                </div>
                <v-list dense>
                  <v-list-tile v-for="provincia in communidad.provincias" :key="provincia.id" @click="$emit('chooseProvincia',provincia.id)">
                    <v-list-tile-title class="primary--text text-xs-center">{{provincia.nombre}}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
    </v-layout>
</template>


<script>
import _ from 'lodash'
import Flag from './Flag'
export default {
  props: ["comms"],
  components: {
    'Flag' : Flag,
  },
  computed: {
     chunkedCommunidads () {
          return _.chunk(this.comms,Math.ceil(this.comms.length/2));
     },
  },
  methods: {
    route (id) {
      this.$router.push({name: 'provincia', params: {id: id}})
    },
  }
}
</script>
