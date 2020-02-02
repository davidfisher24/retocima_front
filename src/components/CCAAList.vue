<template>
    <v-layout row wrap v-if="comms">
      <v-flex md6 xs12 sm12  v-for="(chunk,index) in chunkedCommunidads" :key="index" :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }">
          <v-expansion-panel>
              <v-expansion-panel-content v-for="(communidad,index) in chunk" :key="communidad.id" class="primary--text">
                <div slot="header" >
                      <Flag :id="communidad.id"></Flag>
                      <span class="headline"><strong>{{communidad.name}}</strong></span>&nbsp;&nbsp;&nbsp;
                </div>
                <v-list dense>
                  <v-list-tile v-for="provincia in getProvincesByRegion(communidad.id)" :key="provincia.id" @click="route(provincia.id)">
                    <v-list-tile-title class="primary--text text-xs-center subheading">{{provincia.name}}</v-list-tile-title>
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
    // This has to change
    route (id) {
      this.$router.push({name: 'province', params: {id: id}})
    },
    getProvincesByRegion (regionId) {
      return this.$store.getters['provincias/byRegion'](regionId);
    }
  }
}
</script>
