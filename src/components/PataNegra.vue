<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
          <CimaList @chooseCima="chooseCima"></CimaList>
          <router-view name="patanegra-cima"></router-view>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import CimaList from './CimaList'
export default {
  data () {
    return {
      mounted: false,
      comms:null,
      parent: null,
    }
  },
  components: {
    'CimaList' : CimaList
  }, 
  methods: {
    chooseCima(obj) {
      this.$router.push({name: 'patanegra-cima', params: {id: obj._id}})
    }
  }
}
</script>
