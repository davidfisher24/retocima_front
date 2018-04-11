<template>
  <v-list-tile avatar :key="cima.id" @click="$emit('route',cima.id)">
    <v-list-tile-avatar color="primary" tile>
        <span class="white--text">{{cima.codigo}}</span>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-html="cima.nombre" class="title"></v-list-tile-title>
      <v-list-tile-sub-title class="subheading"><i>Altitud</i>&nbsp;&nbsp;
        <span v-if="cima.vertientes.length > 0">{{cima.vertientes[0].altitud}}</span>
      </v-list-tile-sub-title>
      <v-list-tile-sub-title class="subheading"><i>Vertientes</i>&nbsp;&nbsp;{{vertientesList(cima)}}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>  
</template>


<script>

export default {
  props: ["cima"],
  methods: {
    vertientesList (cima) {
      var text = ''
      cima.vertientes.forEach(v => text += v.vertiente + ' - ')
      return text.slice(0,-3)
    },
  }
}
</script>
