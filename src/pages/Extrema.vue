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
      <CimaList :cimas="cimas" :title="listTitle" :mapRoute="mapRoute" listType="B"></CimaList>

  </v-container>
</template>


<script>

import CimaList from '../components/CimaList'
import extrema from '../assets/icons/extrema.png'
import image from '../assets/pico-veleta.jpg'
export default {
  data () {
    return {
      title: "OTROS RETOS - <span class='theme--text'><strong>ESCALADOR EXTREMO</strong></span>",
      listTitle: "Escalador Extremo",
      icon: extrema,
      cimas: this.$route.params.cimas,
      mapRoute: {name:'extrema-map'},
      bgImageStyle: {
          backgroundImage: 'url(\'' + image + '\' )',
          backgroundSize:'cover',
          minHeight: '200px',
      },
    }
  },
  mounted() {

  },
  components: {
    'CimaList' : CimaList,
  }, 
  methods: {

  }
}
</script>
