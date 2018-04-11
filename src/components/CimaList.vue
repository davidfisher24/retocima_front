<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap v-if="cimas">

        <!-- Title -->
        <v-toolbar color="white" flat dense class="primary--text mb-3">
            <v-toolbar-title>
               <span v-if="$route.name=='provincia'"><strong>Listado de cimas en </strong> {{cimas[0].provincia.nombre}}</span>
                <span v-if="$route.name=='patanegra'"><strong>Listado de cimas </strong> Pata Negra</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat @click="changeMap()">MAPA</v-btn>
            </v-toolbar-items>
          </v-toolbar>

        <v-flex md6 xs12 sm12  v-for="(chunk,index) in chunkedCimas" :key="index" class="px-3">
          
          <v-list three-line class="primary--text py-0">
            <CimaListData v-for="(cima, i) in chunk" :cima="cima" @route="route"></CimaListData>
          </v-list>
          <!-- Eliminadas o sustituidas block -->
            <div v-if="index === 1 && eliminatedCimas.length > 0">
              <v-toolbar color="white" flat dense class="accent--text">
                <v-toolbar-title>
                   <span>Cimas que fueron eliminadas</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-list three-line class="primary--text py-0" >
                <CimaListData v-for="(cima, i) in eliminatedCimas" :cima="cima" @route="route"></CimaListData>
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
                <CimaListData v-for="(cima, i) in specialCimas" :cima="cima" @route="route"></CimaListData>
              </v-list>
            </div>
        </v-flex>
          <!--<v-flex xs12 class="mx-3">
                <v-toolbar>
                <v-toolbar-title>
                    <span v-if="$route.name=='provincia'">{{cimas[0].communidad.nombre}} - {{cimas[0].provincia.nombre}}</span>
                    <span v-if="$route.name=='patanegra'">Pata Negra</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn flat @click="changeMap()">MAPA</v-btn>
                </v-toolbar-items>
              </v-toolbar>

                <v-data-table
                    :headers="provinciaSectionHeaders"
                    :items="cimas"
                    hide-actions
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <tr  @click="route(props.item.id)" v-if="props.item.estado === 1">
                          <td>{{ props.item.codigo }}</td>
                          <td>{{ props.item.nombre }}</td>
                          <td class="text-xs-center">{{ props.item.logros_count }}</td>
                          <td class="text-xs-center"><span v-if="props.item.vertientes[0]">{{ props.item.vertientes[0].altitud}}m</span></td>
                          <td class="hidden-sm-and-down">
                            <p v-for="vert in props.item.vertientes">{{vert.vertiente}}</p>
                          </td>
                          <td class="hidden-md-and-up">
                            <v-badge>
                              <span slot="badge">{{props.item.vertientes.length}}</span>
                            </v-badge>
                          </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-subheader v-if="needCimasElimitedRow()"><p class="subheading">Cimas que fueron eliminadas o sustituidas</p></v-subheader>
                  <v-data-table
                    v-if="needCimasElimitedRow()"
                    :headers="provinciaSectionHeaders"
                    :items="cimas"
                    hide-actions
                    hide-headers
                    class="elevation-1"
                  >

                    <template slot="items" slot-scope="props">
                      <tr v-if="props.item.estado !== 1">
                          <td>{{ props.item.codigo }}</td>
                          <td>{{ props.item.nombre }}</td>
                          <td class="text-xs-right">{{ props.item.logros_count }}</td>
                          <td class="text-xs-right"><span v-if="props.item.vertientes[0]">{{ props.item.vertientes[0].altitud}}m</span></td>
                          <td class="hidden-sm-and-down">
                            <p v-for="vert in props.item.vertientes">{{vert.vertiente}}</p>
                          </td>
                          <td class="hidden-md-and-up">
                            <v-badge>
                              <span slot="badge">{{props.item.vertientes.length}}</span>
                            </v-badge>
                          </td>
                      </tr>
                    </template>
                  </v-data-table>
            </v-flex>-->
      </v-layout> 
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import _ from 'lodash'
import CimaListData from './CimaListData'
export default {

  data () {
    return {
      type: '',
      cimas: null,
      map:false,
      provinciaSectionHeaders: [
        { value: 'codigo', text: 'Cdg',sortable: true },
        { value: 'nombre', text: 'Nombre',sortable: true },
        { value: 'logros_count', text: 'Logros',sortable: true },
        { value: 'altitud', text: 'Altitud',sortable: true },
        { text: 'Vertientes',sortable: false }
      ],
    }
  },

  components: {
    'CimaListData' : CimaListData,
  },

  computed: {
     chunkedCimas () {
        return _.chunk(this.cimas.filter(c => c.estado === 1),Math.ceil(this.cimas.length/2));
     },

     eliminatedCimas () {
      return this.cimas.filter(c => c.estado === 2 || c.estado === 3)
     },

     specialCimas () {
      return this.cimas.filter(c => c.estado !== 1 && c.estado !== 2 && c.estado !== 3)
     }
  },

  watch: {
    '$route': function (route) {
      if (route.name === 'provincia') this.$store.dispatch('provincia',route.params.pid).then(cimas => this.cimas = cimas);
      if (route.name === 'patanegra') this.$store.dispatch('patanegra').then(cimas => this.cimas = cimas);
    }
  },

  mounted (){
    this.cimas = this.$route.params.cimas;
  },

  methods: {
    changeMap() {
      if (this.$route.name === "provincia") this.$router.push({name:'provincia-map', params: {pid: this.$route.params.pid}});
      if (this.$route.name === "patanegra") this.$router.push({name:'patanegra-map'});
    },
    route (cid) {
      var obj = {};
      obj.name = this.$route.name=='provincia' ? "provincia-cima" : "patanegra-cima";
      obj.params = this.$route.name=='provincia' ? {pid: this.$route.params.pid, cid: cid} : {cid: cid};
      this.$router.push(obj);
    },
  }
}
</script>
