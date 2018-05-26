<template>
  <v-container fluid class="pa-0 mt-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap v-if="cimas">

        <!-- Title -->
        <v-toolbar color="white" flat dense class="primary--text mb-3 ">
            <v-toolbar-title class="display-2">
                <span><strong>Listado de cimas </strong> </span>
                <span class="display-1 theme--text">{{title}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="mr-0">
              <v-btn flat @click="changeMap()">MAPA</v-btn>
            </v-toolbar-items>
          </v-toolbar>

        <v-flex xs12 sm12 v-for="(chunk,index) in chunkedCimas" :key="index" 
        :class="[{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, },
        {'md4': listType == 'B', 'md6' : listType != 'B' }]">
          
          <v-list three-line class="primary--text py-0">
            <CimaListData v-if="!listType" v-for="(cima, i) in chunk" :cima="cima" @route="route"></CimaListData>
            <CimaListDataB v-if="listType === 'B'" v-for="(cima, i) in chunk" :cima="cima" @route="route"></CimaListDataB>
          </v-list>
          <!-- Eliminadas o sustituidas block -->
            <div v-if="index === 1 && eliminatedCimas.length > 0">
              <v-toolbar color="white" flat dense class="accent--text">
                <v-toolbar-title>
                   <span>Cimas que fueron eliminadas</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-list three-line class="primary--text py-0" >
                <CimaListData v-if="!listType" v-for="(cima, i) in eliminatedCimas" :cima="cima" @route="route"></CimaListData>
                <CimaListDataB v-if="listType === 'B'" v-for="(cima, i) in eliminatedCimas" :cima="cima" @route="route"></CimaListDataB>
              </v-list>
            </div>
             <!-- Special cimas block -->
            <div v-if="index === 1 && specialCimas.length > 0">
              <v-toolbar color="white" flat dense class="primary--text">
                <v-toolbar-title>
                   <span>Otras acensiones interesantes que no puntuan</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-list three-line class="primary--text py-0" >
                <CimaListData v-if="!listType" v-for="(cima, i) in specialCimas" :cima="cima" @route="route"></CimaListData>
                <CimaListDataB v-if="listType === 'B'" v-for="(cima, i) in specialCimas" :cima="cima" @route="route"></CimaListDataB>
              </v-list>
            </div>
        </v-flex>
      </v-layout> 
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import _ from 'lodash'
import CimaListData from './CimaListData'
import CimaListDataB from './CimaListDataB'
export default {

  props:['cimas','title', 'mapRoute','listType'],
  data () {
    return {
      params: this.$route.params, 
    }
  },

  components: {
    'CimaListData' : CimaListData,
    'CimaListDataB' : CimaListDataB
  },

  computed: {
     chunkedCimas () {
        const divider = this.listType === 'B' ? Math.ceil(this.cimas.length/3) : Math.ceil(this.cimas.length/2)
        return _.chunk(this.cimas.filter(c => c.estado === 1),divider);
     },

     eliminatedCimas () {
      return this.cimas.filter(c => c.estado === 2 || c.estado === 3)
     },

     specialCimas () {
      return this.cimas.filter(c => c.estado !== 1 && c.estado !== 2 && c.estado !== 3)
     }
  },

  methods: {
    changeMap() {
      this.$router.push(this.mapRoute)
    },
    route (cid) {
      // No idea why this doesn't work
      var obj = {};
      obj.name = this.$route.name + "-cima"
      obj.params = this.$route.name=='provincia' ? {pid: this.$route.params.pid, cid: cid} : {cid: cid};
      this.$router.push(obj);
    },
  }
}
</script>
