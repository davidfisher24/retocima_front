<template>
    <v-card class="ma-2 pa-4 primary--text text-xs-center" raised >
        <div class="title ">{{cima.codigo}} {{cima.nombre}}</div>
        <div class="mt-2 body-2">{{cima.communidad}} - {{cima.provincia}}</div>
        <div class="mt-1 body-2">Acensiones: {{cima.logros_count}}</div>
        <v-btn flat @click="$emit('discover',cima.id)">Ver</v-btn>
    </v-card>
</template>


<script>

export default {
  props: ["cima"]
}
</script>
