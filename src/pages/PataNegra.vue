<template>
  <v-container fluid class="pa-0 mt-2">

      <v-layout row wrap>
        <PageTitle :text="title" :icon="icon"></PageTitle>
      </v-layout>
      <CimaList :cimas="cimas" :title="listTitle" :mapRoute="mapRoute"></CimaList>

  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
import pata_negra from '../assets/icons/pata_negra.png'
export default {
  data () {
    return {
      title: "OTROS RETOS - <span class='black--text'>PATA NEGRA</span>",
      icon: pata_negra,
      listTitle: "Pata Negra",
      cimas: this.$route.params.cimas,
      mapRoute: {name:'patanegra-map'}
    }
  },
  mounted() {

  },
  components: {
    'CimaList' : CimaList,
  }, 
  methods: {

  }
}
</script>
