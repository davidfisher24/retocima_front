<template>
<div class="cima-list-b">
  <v-list-tile :key="cima.id" @click="$emit('route',cima.id)">
    <v-layout row>
      <div class="mx-2 my-1">
        <Flag :id="cima.communidad_id"></Flag>
      </div>
      <v-flex>
        <v-layout row class="ma-2">
          <p class="title">{{cima.communidad.nombre}}</p>
        </v-layout>
        <v-layout row>
          <v-avatar color="primary" tile class="cima-avatar mx-2">
            <span class="white--text">{{cima.codigo}}</span>
          </v-avatar>
          <p class="subheading">{{cima.nombre}}</p>
        </v-layout>
          <p class="subheading mx-2"><i>Ascensiones</i>&nbsp;&nbsp;
            <span class="accent--text">{{cima.logros_count}}</span>
          </p>
        <v-layout row>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-list-tile>
</div>
</template>

<style>
  .cima-list-b .list__tile {
    height:auto !important;
  }
</style>

<script>

import Flag from './Flag'

export default {
  props: ["cima"],
  components: {
    'Flag' : Flag,
  },
  methods: {
    vertientesList (cima) {
      var text = ''
      cima.vertientes.forEach(v => text += v.vertiente + ' - ')
      return text.slice(0,-3)
    },
  },

}
</script>
