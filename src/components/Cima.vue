<template>
  <v-container fluid class="pa-0 mt-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap class="white primary--text" >
            <v-flex xs12 class="py-2">
              <span class="display-2 ml-2">
                {{cima.properties.name.toUpperCase()}}
              </span>
              <div v-if="user"  :style="{float:'right' }">
                <ClimbBookmark :cima="cima" :key="cima.id"></ClimbBookmark>
              </div>
            </v-flex>
            <v-flex>
              <PathMap :key="cima.id"></PathMap>
            </v-flex>
          </v-layout>
          <v-layout>
            
          </v-layout>
          <v-layout>
            <v-flex md12>
              <v-tabs vertical>
                <v-tab>
                  Altimeter
                </v-tab>
                <v-tab>
                  Comments
                </v-tab>
                <v-tab>
                  Photos
                </v-tab>
                <v-tab-item>
                  <Altimeter :key="cima.id"></Altimeter>
                </v-tab-item>
                <v-tab-item>
                  <ClimbComments :climb="cima.id" :key="cima.id"></ClimbComments>
                </v-tab-item>
                <v-tab-item>
                  <ClimbPhotos :climb="cima.id" :key="cima.id"></ClimbPhotos>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>

</template>


<script>

import PathMap from './PathMap'
import Altimeter from './Altimeter'
import CimaQuickAdd from './CimaQuickAdd'
import ClimbBookmark from './ClimbBookmark'
import ClimbComments from './ClimbComments'
import ClimbPhotos from './ClimbPhotos'
import Button from './Button'

export default {
  data () {
    return {
      user: this.$store.getters['user/loggedIn'],
      cima: this.$store.getters['cimas/oneById'](this.$route.params.id),
    }
  },

  components: {
    'PathMap' : PathMap,
    'CimaQuickAdd' : CimaQuickAdd,
    'Button' : Button,
    'Altimeter': Altimeter,
    'ClimbBookmark' : ClimbBookmark,
    'ClimbComments' : ClimbComments,
    'ClimbPhotos' : ClimbPhotos,
  },


  watch: {
    $route (to,from){
      if (from.name === 'cima' && to.name === 'cima' && !to.params.cima) {
        this.$store.dispatch('cimas/one',to.params.id).then(cima => {
          this.cima = cima
        })
      } else {
      }
    },
    cima (newOne) {
      this.resetTabs()
    }
  },

  computed: {

      vertienteId () {
        return this.cima.vertientes[this.active].id
      },

      substituteLinkParams () {
        return {id: this.cima.substitute.id}
      },
  },
  

  methods: {
    resetTabs (){
      this.active = null
      this.active = "0";
    },
  }
}
</script>
