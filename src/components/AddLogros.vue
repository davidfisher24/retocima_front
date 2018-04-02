<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
            <CCAAList :comms="comms" @chooseProvincia="chooseProvincia"></CCAAList>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import CCAAList from './CCAAList'
export default {
  data () {
    return {
      comms:this.$route.params.listado,
    }
  },

  components: {
    'CCAAList' : CCAAList,
  }, 
  methods: {
    chooseProvincia(id) {
      this.$router.push({name: 'user-provincia', params: {pid: id}})
    },
  }
}
</script>
