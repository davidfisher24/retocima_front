<template>
<div>
  <HomePageCarousel></HomePageCarousel>
  <v-container fluid>
    <v-layout wrap grid>
      <v-flex xs12 md3 order-xs2 order-md1>
        <DiscoverCimas 
          v-if="discoverCimas" 
          v-for="cima in discoverCimas" 
          :cima="cima"
          @discover="discover"
        ></DiscoverCimas>
      </v-flex>
      <v-flex xs12 md6 class="text-xs-center primary--text" order-xs1 order-md2>
        <Blurb></Blurb>
      </v-flex>
      <v-flex xs12 md3 class="text-xs-center" order-xs3 order-md3>
        <LandingPics></LandingPics>
      </v-flex>
    </v-layout>

    <v-layout wrap grid>
      <v-flex xs4 class="text-xs-center primary--text">
        <Blurb></Blurb>
      </v-flex>
      <v-flex xs8>
        <AdvancedSearch></AdvancedSearch>
      </v-flex>
    </v-layout>

  </v-container>
</div>
</template>


<script>
import Blurb from './Blurb'
import LandingPics from './LandingPics'
import DiscoverCimas from './DiscoverCimas'
import HomePageCarousel from './HomePageCarousel'
import AdvancedSearch from './Search/AdvancedSearch'


export default {
  data () {
    return {
      discoverCimas:null,
    }
  },

  components: {
    'DiscoverCimas' : DiscoverCimas,
    'Blurb' : Blurb,
    'LandingPics' : LandingPics,
    'HomePageCarousel' : HomePageCarousel,
    'AdvancedSearch' : AdvancedSearch,
  },

  

  mounted (){
    this.$store.dispatch("discover").then(data => this.discoverCimas = data);
  },

  methods: {
    discover(id){
      this.$router.push({name: 'cima', params: {id: id}})
    },
  }

  
}
</script>
