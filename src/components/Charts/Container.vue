<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card v-if="cimero">
         <v-tabs
            v-model="active"
            color="secondary"
            dark
            slider-color="accent"
            width="100%"
          >
            <v-tab key="bar" ripple>Logros Por Communidad</v-tab>
            <v-tab key="pie" ripple>Logros Por Provincia</v-tab>

            <v-tab-item key="bar">
              <LogrosPorCommunidadBar :data="organizeBar()"></LogrosPorCommunidadBar>
            </v-tab-item>
            <v-tab-item key="pie">
              <LogrosPorProvinciaPie :data="organizePie()"></LogrosPorProvinciaPie> 
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import LogrosPorCommunidadBar from './LogrosPorCommunidadBar'
import LogrosPorProvinciaPie from './LogrosPorProvinciaPie'

export default {
  data () {
    return {
      active:0,
      id:"bar",
    }
  },
  components: {
    'LogrosPorCommunidadBar' : LogrosPorCommunidadBar,
    'LogrosPorProvinciaPie' : LogrosPorProvinciaPie,
  },


  computed: {
    cimero () {
      return this.$route.params.cimero;
    },
  },
  

  methods: {
    organizeBar () {
        var comms = _.values(_.groupBy(this.cimero.logros,"communidad.id"));
        return comms.map(c => {
          return {
            nombre: c[0].communidad.nombre,
            count: c.length,
          }
        })
    },
    organizePie () {
        var comms = _.values(_.groupBy(this.cimero.logros,"provincia.id"));
        return comms.map(c => {
          return {
            nombre: c[0].provincia.nombre,
            count: c.length,
          }
        })
    }
  }
}
</script>
