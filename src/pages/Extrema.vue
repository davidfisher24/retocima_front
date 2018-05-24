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
import extrema from '../assets/icons/extrema.png'
export default {
  data () {
    return {
      title: "OTROS RETOS - <span class='theme--text'><strong>ESCALADOR EXTREMO</strong></span>",
      listTitle: "Escalador Extremo",
      icon: extrema,
      cimas: this.$route.params.cimas,
      mapRoute: {name:'extrema-map'}
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
