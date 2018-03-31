<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap v-if="cima">
        <v-flex xs12>
        <v-toolbar color="primary">
        <v-toolbar-title class="white--text">{{cima.codigo}} {{cima.nombre}}</v-toolbar-title>
        <v-divider></v-divider>
        <v-toolbar-items>
          <v-btn flat @click="previous" v-if="cimas && cimas.length > 1">Anterior</v-btn>
          <v-btn flat @click="next" v-if="cimas && cimas.length > 1">Siguiente</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-chip color="secondary" text-color="white">
          <v-avatar class="accent">{{cima.logros_count}}</v-avatar>
          Logros
        </v-chip>
      </v-toolbar>
      <v-card width="100%">
        <v-system-bar status color="primary" dark>
          {{cima.provincia.nombre}} / {{cima.communidad.nombre}}
        </v-system-bar>
        <v-system-bar status color="primary" dark>
          GPS:  Latitude: {{cima.latitude}}  Longitude: {{cima.longitude}}
        </v-system-bar>
      </v-card>
      </v-flex>
      <v-flex xs12>
    <v-tabs
      v-model="active"
      color="secondary"
      dark
      slider-color="accent"
      width="100%"
    >
      <v-tab
        v-for="n,i in cima.vertientes"
        :key="i"
        ripple
      >
        {{ cima.vertientes[i].vertiente }} 
      </v-tab>
      <v-tab-item
        v-for="n,i in cima.vertientes"
        :key="i"
      >
            <v-layout wrap>
                <v-flex md4 xs12>
                    <v-card raised class="pa-2">
                        <v-layout>
                            <v-flex md6><p><strong>Altitud:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].altitud}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md6><p><strong>Desnivel:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].desnivel}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md6><p><strong>Longitud:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].longitud}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md6><p><strong>% medio:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].porcentage_medio}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md6><p><strong>% máx.:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].porcentage_maximo}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md6><p><strong>APM:</strong></p></v-flex>
                            <v-flex md6><p>{{cima.vertientes[i].apm}}</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md12><p><strong>ENLACES</strong></p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md12 v-if="cima.vertientes[i].enlaces.length === 0"><p>No Disponible!</p></v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex md12 v-for="(enlace,index) in cima.vertientes[i].enlaces" :key="index">
                                <v-btn><a :href="enlace.url" target="_blank">Enlace {{index + 1}}</a></v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md8 xs12>
                  <PathMap :id="cima.id"></PathMap>
                </v-flex>
            </v-layout>
            <v-card raised class="pa-2">
                <v-layout>
                    <v-flex md12><p><strong>Inicio: </strong>{{cima.vertientes[i].inicio}}</p></v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12><p><strong>Dudas:  </strong>{{cima.vertientes[i].dudas}}</p></v-flex>
                </v-layout>
                 <v-layout>
                    <v-flex md12><p><strong>Final:  </strong>{{cima.vertientes[i].final}}</p></v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12><p><strong>Observaciones: </strong>{{cima.vertientes[i].observaciones}}</p></v-flex>
                </v-layout>
            </v-card>
      </v-tab-item>
    </v-tabs>
    </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>

</template>


<script>

import PathMap from './PathMap'

export default {
  data () {
    return {
      active:0,
      id:1,
      cima: null,
      cimas:null,
    }
  },

  components: {
    'PathMap' : PathMap,
  },

  watch: {
    '$route.params.id': function (id) {
      this.$store.dispatch('cima',id).then(cima => this.cima = cima);
      this.active = 0;
    }
  },

  computed: {
      properties (){
          return [
              {title: 'Altitud', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].altitud + "m" : " - "},
              {title: 'Desnivel', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].desnivel + "m" : " - "},
              {title: 'Logitud', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].longitud + "m" : " - "},
              {title: '% Medio', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].porcentage_medio + "%" : " - "},
              {title: '% Maximo', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].porcentage_maximo + "%" : " - "},
              {title: 'APM', value: this.cima.vertientes[this.active] ? this.cima.vertientes[this.active].apm : " - "}
          ]
      }
  },
  
  mounted (){
    this.cimas = this.$route.params.cimas || null;
    this.cima = this.cimas ? this.cimas.find(x => x.id === this.$route.params.cid) : this.$route.params.cima;
  },

  methods: {
    next() {
      var index = this.cimas.findIndex(x => x.id === this.cima.id);
      if (index === this.cimas.length -1) index = 0;
      this.cima = this.cimas[index + 1];
    },
    previous () {
      var index = this.cimas.findIndex(x => x.id === this.cima.id) - 1;
      if (index === 0) index = this.cimas.length - 1;
      this.cima = this.cimas[index];
    }
  }
}
</script>
