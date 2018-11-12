<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <p class="headline primary--text text-xs-center">Busca tu CIMA</p>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pa-2">
        <div>

          <SearchBox
          title="Provincia"
          :items="provincias"
          itemText="nombre"
          itemValue="id"
          ref="provincia"
          ></SearchBox>

         </div>
      </v-flex>
      <v-flex xs6 class="pa-2">

        <div>
          <DoubleSlider
            minimum="0"
            maximum="40"
            title="Longitud"
            units="km"
            ref="longitud"
          ></DoubleSlider>

          <DoubleSlider
            minimum="0"
            maximum="2500"
            title="Desnivel"
            units="m"
            ref="desnivel"
          ></DoubleSlider>

          <DoubleSlider
            minimum="0"
            maximum="320"
            title="APM"
            ref="apm"
          ></DoubleSlider>
        </div>

        <v-btn @click="search">Buscar</v-btn>

      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>

import DoubleSlider from './DoubleSlider'
import SearchBox from './SearchBox'

export default {
  data () {
    return {
      provincias: [],
    }
  },

  components: {
    DoubleSlider, SearchBox
  },
  
  mounted () {
    Promise.all([
      this.$store.dispatch("provincias/all").then(data => this.provincias = data)
    ])
  },

  watch: {

  },

  methods: {

    search() {

      const input = {
        desnivel: [this.$refs.desnivel.value[0],this.$refs.desnivel.value[1]],
        apm: [this.$refs.apm.value[0],this.$refs.apm.value[1]],
        longitud: [this.$refs.longitud.value[0],this.$refs.longitud.value[1]],
        provincia: this.$refs.provincia.value
      }
      console.log(input)
      this.$store.dispatch("cimas/advancedSearch", JSON.stringify(input)).then(data => {
        console.log(data)
      })
      
    }

  }
}
</script>
