<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <div class="mt-5">

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

          <v-btn @click="search">Submit</v-btn>

         </div>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>

import DoubleSlider from './DoubleSlider'

export default {
  data () {
    return {
    
    }
  },

  components: {
    DoubleSlider
  },
  
  mounted () {

  },

  watch: {

  },

  methods: {

    search() {
      alert("Kilometres btw " + this.$refs.km.value[0] + " & " + this.$refs.km.value[1])
      alert("APM btw " + this.$refs.apm.value[0] + " & " + this.$refs.apm.value[1])
    }

  }
}
</script>
