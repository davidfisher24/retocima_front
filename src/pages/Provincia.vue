<template>
  <v-container fluid class="pa-0 mt-2">
      <CimaList :cimas="cimas" :title="listTitle" :mapRoute="mapRoute"></CimaList>
  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
export default {
  data () {
    return {
      cimas: this.$route.params.cimas,
      listTitle: this.$route.params.cimas[0].provincia.nombre,
      mapRoute: {name:'provincia-map', params: {pid: this.$route.params.pid}}
    }
  },
  watch: {
    '$route': function (route) {
      this.cimas = this.$route.params.cimas;
      this.listTitle = this.$route.params.cimas[0].provincia.nombre;
      this.mapRoute = {name:'provincia-map', params: {pid: this.$route.params.pid}};
    }
  },
  components: {
    'CimaList' : CimaList,
  }, 
  methods: {

  }
}
</script>
