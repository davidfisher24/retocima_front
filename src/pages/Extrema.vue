<template>
  <v-container fluid class="pa-0 mt-2">

      <v-layout row wrap>
        <PageTitle :text="title" :icon="icon"></PageTitle>
      </v-layout>
      <v-layout row wrap class="px-3 mb-4">
        <v-flex xs12 md4>
          <v-card flat height="100%" :class="['primary--text', 'body-2', 'mx-2', $vuetify.breakpoint.smAndDown ? 'pt-3 px-3' : 'pa-3' ]">
            <p class="extrema--text subheading indent mb-4">
              Consigue las <strong>10</strong> ascensiones <strong>más duras e insuperables</strong> del CIMA y serás un auténtico <strong>Escalador Extremo.</strong>
            </p>
            <p class="indent">Todavía sin definir, otra nueva clasificación secundaria. Con este reto, el Escalador Extremo, se busca conseguir la reunión de los CIMAs más extremos y que destacan sobre todo por ser un <strong>reto dentro del reto</strong>, los puertos más insuperables y difíciles por sus porcentajes.</p>
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card flat class="primary--text body-2 mx-2 pa-3" height="100%">
            <p class="indent">Falta debatir en el foro APM cuáles serán los puertos que compongan este apartado de entre los candidatos que se propongan. Estos puertos serán distinguidos en el listado con el símbolo de escalador extremo</p>
            <p class="indent">Conseguirá la distinción de Escalador Extrem, aquel que consiga sumar todas las del listado correspondiente, añadiéndose en su clasificación una corona de laurel que lo identifique.</p>
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card flat class="mx-2 pa-2" height="100%" :style="bgImageStyle">
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row class="ma-2">  
        <v-flex>
          <CimaList :cimas="cimas" :validCimas="validCimas" :title="listTitle" :mapRoute="mapRoute" listType="B"></CimaList>
        </v-flex>
      </v-layout>
      <v-layout row>
        <PageTitle :text="rankingtitle"></PageTitle>
      </v-layout>
      <v-layout row class="ma-2 mb-4">  
        <v-flex>
          <SimpleTable v-if="ranking" :data="ranking" :icon="icon" :challengeLength="cimas.length"></SimpleTable>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
import extrema from '../assets/icons/extrema.png'
import image from '../assets/pico-veleta.jpg'
import SimpleTable from '../components/Tables/SimpleTable'
export default {
  data () {
    return {
      title: "<span class='hidden-sm-and-down'>OTROS RETOS - </span><span class='theme--text'><strong>ESCALADOR EXTREMO</strong></span>",
      rankingtitle: "RANKING <span class='theme--text'>ESCALADOR EXTREMO</span>",
      listTitle: "Escalador Extremo",
      icon: extrema,
      cimas: this.$route.params.cimas,
      validCimas: this.$route.params.cimas,
      mapRoute: {name:'extrema-map'},
      bgImageStyle: {
          backgroundImage: 'url(\'' + image + '\' )',
          backgroundSize:'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
      },
      ranking: null,
    }
  },
  mounted () {
    this.$store.dispatch("rankings/extrema")
    .then(data => {this.ranking = data.slice(0,25)})
    .catch(e => console.log(e))
  },
  components: {
    'CimaList' : CimaList,
    'SimpleTable' : SimpleTable,
  }, 
  methods: {

  }
}
</script>
