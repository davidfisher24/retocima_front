<template>
  <v-container fluid class="pa-0 mt-2">
      <v-layout row wrap>
        <PageTitle :text="title" :icon="icon"></PageTitle>
      </v-layout>
      <v-layout row wrap class="px-3 mb-4">
        <v-flex xs12 sm4>
          <v-card flat height="100%" :class="['primary--text', 'body-2', 'mx-2', $vuetify.breakpoint.smAndDown ? 'pt-3 px-3' : 'pa-3' ]">
            <p class="patanegra--text subheading indent mb-4">
              Reune la mejor ascensión de cada región, y <strong>consigue las 19</strong> para llegar a ser el auténtico <strong>Escalador Pata Negra</strong>.
            </p>
            <p class="indent">A partir de enero de 2009 comienza una nueva clasificación secundaria, El Pata Negra, en la que se busca conseguir la reunión de las <strong>mejores ascensiones de cada una de las 19 regiones</strong> que conforman el CIMA.</p>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4>
          <v-card flat class="primary--text body-2 mx-2 pa-3" height="100%">
            <p class="indent">Para ello, previamente se debatió entre conocedores de las zonas, cuáles eran estos “Pata Negra”, teniendo en cuenta sus números, la belleza, tradición y aquello que le hacía <strong>especial para ser el número uno</strong>. Estos 19 puertos están distinguidos en el listado con el símbolo de pata negra.</p>
            <p class="indent">Conseguirá la distinción de Escalador Pata Negra, aquel que consiga sumar las 19 ascensiones, añadiéndose en su clasificación una corona de laurel que lo identifique.</p>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4>
          <v-card flat class="mx-2 pa-2" height="100%" :style="bgImageStyle">
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row class="ma-2">  
        <v-flex>
          <CimaList :cimas="cimas" :title="listTitle" :mapRoute="mapRoute" listType="B"></CimaList>
        </v-flex>
      </v-layout>
      <v-layout row>
        <PageTitle :text="rankingtitle"></PageTitle>
      </v-layout>
      <v-layout row class="ma-2">  
        <v-flex>
          <SimpleTable v-if="ranking" :data="ranking" :icon="icon"></SimpleTable>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
import pata_negra from '../assets/icons/pata_negra.png'
import image from '../assets/bola-del-mundo.jpg'
import SimpleTable from '../components/Tables/SimpleTable'

export default {
  data () {
    return {
      title: "OTROS RETOS - <span class='theme--text'>PATA NEGRA</span>",
      rankingtitle: "RANKING <span class='theme--text'>PATA NEGRA</span>",
      icon: pata_negra,
      listTitle: "Pata Negra",
      cimas: this.$route.params.cimas,
      mapRoute: {name:'patanegra-map'},
      bgImageStyle: {
          backgroundImage: 'url(\'' + image + '\' )',
          backgroundSize:'cover',
          minHeight: '200px',
      },
      ranking: null,
    }
  },
  components: {
    'CimaList' : CimaList,
    'SimpleTable' : SimpleTable,
  }, 

  mounted () {
    this.$store.dispatch("rankings/patanegra")
    .then(data => {this.ranking = data.splice(0,25)})
    .catch(e => console.log(e))
  },

  methods: {

  }
}
</script>
