<template>
<div class="cima-list-b">
  <v-list-tile :key="cima.id" @click="$emit('route',cima.id)">
    <v-layout row>
      <div class="mx-1 my-1">
        <Flag :id="cima.communidad_id"></Flag>
      </div>
      <v-flex>
        <v-layout row class="mt-2">
          <p class="title">{{cima.communidad.nombre}}</p>
        </v-layout>
        <v-layout row>
          <div>
            <v-avatar color="primary" tile class="cima-avatar mr-2">
              <span class="white--text">{{cima.codigo}}</span>
            </v-avatar>
          </div>
          <div>
            <p class="subheading">{{cima.nombre}}</p>
            <p class="subheading"><i>Ascensiones</i>&nbsp;&nbsp;
              <span class="accent--text">{{cima.logros_count}}</span>
            </p>
          </div>
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
}
</script>
