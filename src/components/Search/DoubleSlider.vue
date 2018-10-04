<template>
   <v-layout wrap grid>
    <v-flex xs12 class="mb-3 pl-4 subheading primary--text">
     <p>
        <strong>{{title}}</strong>
        <span v-if="units"><i>{{units}}</i></span>
      </p>
    </v-flex>
    <v-flex xs12>
     <vue-slider ref="slider" v-model="value" :min="min" :max="max"
     :bg-style="{}"
     :slider-style="{background:$vuetify.theme.accent}"
     :process-style="{background:$vuetify.theme.accent}"
     :tooltip-style="{border:'none', background:'none',color:$vuetify.theme.primary, fontSize:'18px'}"
     :label-style="{}"
     width="90%"
     ></vue-slider>
    </v-flex>
  </v-layout>
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
  props: ["minimum","maximum", "title", "units"],

  components: {
    vueSlider
  },
  
  beforeMount () {
    this.min = parseInt(this.minimum);
    this.max = parseInt(this.maximum);
    this.value = [this.min,this.max];
  },

  watch: {

  },

  methods: {


  }
}
</script>
