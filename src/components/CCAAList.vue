<template>
    <v-layout row wrap v-if="comms">
      <v-flex md6 xs12 sm12  v-for="(chunk,index) in chunkedCommunidads" :key="index" class="px-3">
          <v-expansion-panel>
              <v-expansion-panel-content v-for="(communidad,index) in chunk" :key="communidad.id" >
                <div slot="header">
                      <Flag :id="communidad.id"></Flag>
                      {{communidad.nombre}}
                      <v-badge top>
                        <span slot="badge">{{communidad.cimas_count}}</span>
                      </v-badge>
                </div>
                <v-list dense>
                  <v-list-tile v-for="provincia in communidad.provincias" :key="provincia.id" @click="$emit('chooseProvincia',provincia.id)">
                    <v-list-tile-title class="py-0">{{provincia.nombre}}</v-list-tile-title>
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
          return _.chunk(this.comms,this.comms.length/2);
     },
  },
  methods: {
    route (id) {
      this.$router.push({name: 'provincia', params: {id: id}})
    },
  }
}
</script>
