<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <div class="mt-5">
         <vue-slider ref="slider" v-model="value" :min="min" :max="max"
         :bg-style="{}"
         :slider-style="{background:$vuetify.theme.accent}"
         :process-style="{background:$vuetify.theme.accent}"
         :tooltip-style="{border:'none', background:'none',color:$vuetify.theme.primary, fontSize:'18px'}"
         :label-style="{}"
         width="90%"
         ></vue-slider>
         </div>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<style>


  .vue-slider-tooltip: {
      margin-bottom: -10px;
  }

  .vue-slider-tooltip::before {
    border:none;
  }
</style>

<script>

import vueSlider from 'vue-slider-component'

export default {
  data () {
    return {
    
        value: [
          0,
          2000
        ],
        min: 0,
        max: 2000,

    }
  },

  components: {
    vueSlider
  },
  
  mounted () {
    console.log(this)
    console.log(this.$vuetify.theme.accent)
  },

  watch: {

  },

  methods: {


  }
}
</script>
