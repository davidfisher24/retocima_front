<template>
  <v-container fluid class="pa-0 mt-2 mb-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
            <Search @select="chooseCima" @results="showList"></Search>
            <CCAAList :comms="comms" @chooseProvincia="chooseProvincia" v-if="displayList"></CCAAList>
      </v-layout>
      
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import CCAAList from './CCAAList'
import Search from './Search/QuickSearch'
export default {
  data () {
    return {
      comms: this.$store.getters['provincias/regions'],
      parent: null,
      displayList: true,
    }
  },
  components: {
    'CCAAList' : CCAAList,
    'Search' : Search
  }, 
  methods: {
    chooseProvincia(id) {
      this.$router.push({name: 'provincia', params: {pid: id, format: 'list'}})
    },
    chooseCima(id) {
      this.$router.push({name: 'cima', params: {id: id}})
    },
    showList(state) {
      this.displayList = !state;
    },
  }
}
</script>
