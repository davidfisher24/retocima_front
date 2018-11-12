<template>
  <v-container fluid class="pa-0 mt-2">
      <CimaList :cimas="cimas" :validCimas="validCimas" :title="listTitle"></CimaList>
  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
export default {
  data () {
    return {
      cimas: this.$route.params.cimas,
      validCimas: this.$route.params.cimas,
      listTitle: ' eliminadas',
    }
  },
  watch: {
    '$route': function (route) {
      this.cimas = this.$route.params.cimas;
      this.validCimas = this.$route.params.cimas;
      this.listTitle = 'eliminadas';
    }
  },
  components: {
    'CimaList' : CimaList,
  }, 
  methods: {

  }
}
</script>
