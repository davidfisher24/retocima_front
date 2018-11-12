<template>
  <v-container fluid class="pa-0 mt-2 mb-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
            <Search @select="chooseCima" @results="showList"></Search>
            <CCAAList :comms="comms" @chooseProvincia="chooseProvincia" v-if="displayList"></CCAAList>
              <v-flex xs12 md6 offset-md3
              :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, 'mt-3' : true}"
              >
               <v-expansion-panel>
                  <v-expansion-panel-content expand-icon="" class="primary--text">
                    <div slot="header" @click="$router.push('eliminada')">
                        <span class="subheading"><strong>Ver lista de cimas eliminadas</strong></span>
                  </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
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
      comms:null,
      parent: null,
      displayList: true,
    }
  },
  mounted() {
    this.comms = this.$route.params.listado;
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
