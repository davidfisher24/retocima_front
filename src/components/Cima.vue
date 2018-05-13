<template>
  <v-container fluid class="pa-0 mt-2">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap v-if="cima">
        <v-flex xs12>

          <v-system-bar status color="background" v-if="cimas && cimas.length > 1">
            <v-layout row>
              <v-flex xs4 md2 offset-md4 offset-xs2>
                <v-btn flat left @click="previous" style="text-transform: capitalize;" color="primary"><strong>< Anterior</strong></v-btn>
              </v-flex>
              <v-flex xs4 md2 offset-xs-2>
                <v-btn flat right @click="next" style="text-transform: capitalize;" color="primary"><strong>Siguiente ></strong></v-btn>
              </v-flex>
            </v-layout>
          </v-system-bar>

          <!---->
          <v-layout row wrap class="white primary--text" >
            <v-flex xs12 class="py-2">
              <span class="display-2 ml-2">{{cima.codigo}} {{cima.nombre.toUpperCase()}}</span>
              <div :style="{float: $vuetify.breakpoint.smAndDown ? 'none' : 'right' }"><CimaQuickAdd :cima="cima.id"></CimaQuickAdd></div>
            </v-flex>
  
            <v-flex class="d-inline-block ml-2">Ascensiones: 
              <span class="accent--text">&nbsp;{{cima.logros_count}}</span>
            </v-flex>
            <v-flex class="d-inline-block mr-4">
              <i>{{cima.provincia.nombre.toUpperCase()}} / {{cima.communidad.nombre.toUpperCase()}}</i>
            </v-flex>
            <v-flex :class="['d-inline-block',$vuetify.breakpoint.smAndDown ? 'ml-2' : '']">
              <strong>GPS: {{Number(cima.latitude).toFixed(5)}} {{Number(cima.longitude).toFixed(5)}}</strong>
            </v-flex>
          </v-layout>

        </v-flex>
        <v-flex xs12>


          <v-system-bar status width="100%" color="white" class="primary--text mt-2">
            <span class="title">Vertientes</span>
          </v-system-bar>
          <v-tabs
          v-model="active"
          color="white"
          slider-color="accent"
          width="100%"
          >
              
              <v-tab
              v-for="n,i in cima.vertientes"
              :key="i"
              ripple
              class="primary--text headline"
              active-class="default-class accent--text headline"
              >
                {{ cima.vertientes[i].vertiente }} 
              </v-tab>

            <v-tab-item
            v-for="n,i in cima.vertientes"
            :key="i"
            flat
            class = "body-2 my-3 py-2"
            >

            <v-card  :class="{'mx-1': $vuetify.breakpoint.smAndDown, 'mx-4' : $vuetify.breakpoint.mdAndUp, }">
              <v-layout wrap >
                <v-flex xs12 md4 class="primary--text ">
                    
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">Altitud</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].altitud}}</v-flex>
                      </v-layout>
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">Desnivel</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].desnivel}}</v-flex>
                      </v-layout>
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">Longitud</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].longitud}}</v-flex>
                      </v-layout>
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">% medio</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].porcentage_medio}}</v-flex>
                      </v-layout>
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">% max</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].porcentage_maximo}}</v-flex>
                      </v-layout>
                      <v-layout row class="py-2">
                        <v-flex xs5 class="text-xs-right">APM</v-flex> 
                        <v-flex xs2></v-flex> 
                        <v-flex xs5 class="text-xs-left">{{cima.vertientes[i].apm}}</v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex xs12 class="text-xs-left body-1">
                          <v-card-text class="py-1" v-if="cima.vertientes[i].inicio">INICIO: {{cima.vertientes[i].inicio}}</v-card-text>
                          <v-card-text class="py-1" v-if="cima.vertientes[i].dudas">DUDAS: {{cima.vertientes[i].dudas}}</v-card-text>
                          <v-card-text class="py-1" v-if="cima.vertientes[i].final">FINAL: {{cima.vertientes[i].final}}</v-card-text>
                          <v-card-text class="py-1" v-if="cima.vertientes[i].obeservaciones">OBSERVACIONES: {{cima.vertientes[i].observaciones}}</v-card-text>
                        </v-flex>
                      </v-layout>

                      <v-layout>
                        <v-flex xs12 class="text-xs-left body-1">
                          <v-card-title>ENLACES DE INTERES</v-card-title>
                          <v-card-text v-if="cima.vertientes[i].enlaces.length === 0" class="py-1">
                            No Disponible!
                          </v-card-text>
                          <v-btn outline color="primary" v-for="(enlace,index) in cima.vertientes[i].enlaces" :key="index" @click="openExternalLink(enlace.url)">
                            Enlace {{index + 1}}
                          </v-btn>
                        </v-flex>
                      </v-layout>
                   
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-layout class="ma-2">
                        <v-flex>
                          <PathMap :id="cima.vertientes[i].id" v-if="i == active"></PathMap>
                        </v-flex>
                      </v-layout>
                    
                </v-flex>
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
import CimaQuickAdd from './CimaQuickAdd'

export default {
  data () {
    return {
      active:"0",
      id:1,
      cima: null,
      cimas:null,
    }
  },

  components: {
    'PathMap' : PathMap,
    'CimaQuickAdd' : CimaQuickAdd,
  },

  watch: {
    '$route.params.id': function (id) {
      this.$store.dispatch('cimas/one',id).then(cima => {
        this.cima = cima
        this.resetTabs()
      })
    },
    cima (newOne) {
      this.resetTabs()
    }
  },

  computed: {
      vertienteId () {
        return this.cima.vertientes[this.active].id
      },

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
    this.cima = this.cimas ? this.cimas.find(x => x.id === Number(this.$route.params.cid)) : this.$route.params.cima;
    this.resetTabs()
  },

  methods: {
    resetTabs (){
      this.active = null
      this.active = "0";
    },
    next() {
      var index = this.cimas.findIndex(x => x.id === this.cima.id) + 1;
      if (index === this.cimas.length) index = 0;
      this.cima = this.cimas[index];
    },
    previous () {
      var index = this.cimas.findIndex(x => x.id === this.cima.id) - 1;
      if (index === -1) index = this.cimas.length - 1;
      this.cima = this.cimas[index];
    },
    openExternalLink (url) {
      window.open(url, '_blank')
    },
  }
}
</script>
