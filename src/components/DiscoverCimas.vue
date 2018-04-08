<template>
    <v-card class="ma-2 pa-4 primary--text text-xs-center" raised >
        <div class="subheading">
        	<Flag :id="cima.communidad_id"></Flag>
        	<strong>{{cima.codigo}} {{cima.nombre}}</strong>
        </div>
        <div class="mt-2 body-2">{{cima.communidad}} - {{cima.provincia}}</div>
        <div class="mt-1 body-2">Acensiones: {{cima.logros_count}}</div>
        <Button text="ver" lowercase="true" route="cima" :params="params"></Button>
    </v-card>
</template>


<script>

import Flag from './Flag'
import Button from './Button'

export default {
  props: ["cima"],
  computed: {
  	params () {
  		return {'id' : this.cima.id}
  	}
  },
  components: {
    'Flag' : Flag,
    'Button' : Button,
  },
}
</script>
