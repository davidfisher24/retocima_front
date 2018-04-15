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
      cimero: this.$route.params.cimero
    }
  },
  components: {
    'LogrosPorCommunidadBar' : LogrosPorCommunidadBar,
    'LogrosPorProvinciaPie' : LogrosPorProvinciaPie,
  },


  methods: {
    organizeBar () {
        var logros = _.flatMap(this.cimero.logros)
        return _.chain(logros)
              .groupBy('communidad_id')
              .map((logro) => ({ 
                count:logro.length, 
                nombre: this.cimero.communidads.find(c => c.id == logro[0].communidad_id).nombre
              }))
              .value()
    },
    organizePie () {
        var logros = _.flatMap(this.cimero.logros)
        return _.chain(logros)
              .groupBy('provincia_id')
              .map((logro) => ({ 
                count:logro.length, 
                nombre: this.cimero.provincias.find(c => c.id == logro[0].provincia_id).nombre
              }))
              .value()
    }
  }
}
</script>
