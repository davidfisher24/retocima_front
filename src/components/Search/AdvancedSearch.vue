<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <!--<v-text-field
              box
              label="Buscar"
              v-model="searchInput"
              clearable
              append-icon="search"
              :error-messages="searchNotFound"
        ></v-text-field>-->

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <CimaListData v-for="(cima, i) in cimas" :cima="cima" @route="route"></CimaListData>
    </v-layout>
  </v-container>

            
 
   

    
</template>

<style>

</style>

<script>

export default {
  data () {
    return {
      cimas: [],
      val1a: 0,
      val1b: 5000,
      val2: 0,
      val3: 0,
      val4: 0,
      val5: 0,
      val6: 0,
      val7: 0
    }
  },
  
  watch: {

  },

  methods: {


  }
}
</script>
