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
          title="Communidad"
          :items="communidads"
          itemText="nombre"
          itemValue="id"
          ref="communidad"
          ></SearchBox>

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
            ref="km"
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
      communidads: [],
      provincias: [],
    }
  },

  components: {
    DoubleSlider, SearchBox
  },
  
  mounted () {
    Promise.all([
      this.$store.dispatch("communidads/all").then(data => this.communidads = data),
      this.$store.dispatch("provincias/all").then(data => this.provincias = data)
    ])
  },

  watch: {

  },

  methods: {

    search() {
      alert("Kilometres btw " + this.$refs.km.value[0] + " & " + this.$refs.km.value[1])
      alert("APM btw " + this.$refs.apm.value[0] + " & " + this.$refs.apm.value[1])
      alert("Communidad: " + this.provincias.find(p => p.id == this.$refs.provincia.value).nombre)
      alert("Provincia " + this.communidads.find(c => c.id == this.$refs.communidad.value).nombre)
    }

  }
}
</script>
