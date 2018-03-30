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
      mounted: false,
      comms:null,
      parent: null,
    }
  },
  mounted() {
    this.comms = this.$route.params.listado;
    console.log(this.comms);
  },
  components: {
    'CCAAList' : CCAAList
  }, 
  methods: {
    chooseProvincia(id) {
      console.log("Pusing province");
      this.$router.push({name: 'provincia', params: {pid: id, format: 'list'}})
    }
  }
}
</script>
