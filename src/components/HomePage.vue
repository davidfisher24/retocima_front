<template>
<div>
  <HomePageCarousel v-if="this.$route.name === 'home'"></HomePageCarousel>
  <v-container fluid>
    
    <v-layout row wrap v-if="this.$route.name === 'home'">
      
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
    <router-view></router-view>
  </v-container>
</div>
</template>


<script>
import axios from 'axios'
import Blurb from './Blurb'
import LandingPics from './LandingPics'
import DiscoverCimas from './DiscoverCimas'
import HomePageCarousel from './HomePageCarousel'

export default {
  data () {
    return {
      discoverCimas:null
    }
  },

  components: {
    'DiscoverCimas' : DiscoverCimas,
    'Blurb' : Blurb,
    'LandingPics' : LandingPics,
    'HomePageCarousel' : HomePageCarousel,
  },

  mounted (){
    var self = this;
    axios.get('http://retocima/ajax/discover').then(function(response){
      self.discoverCimas = response.data;
    })
  },

  methods: {
    discover(id){
      this.$router.push({name: 'discover', params: {id: id}})
    },
  }

  
}
</script>
