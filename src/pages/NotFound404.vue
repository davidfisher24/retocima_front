<template>
  <v-container fluid fluid class="pa-0 mt-2">
    <v-layout wrap row class="text-xs-left primary--text body-2 mx-2">
      <PageTitle text="404 No Encontrado"></PageTitle>
        <v-flex xs12 md12 class="px-2">
          <v-layout row class="py-2">
            <v-flex class="pl-1" style="text-indent:12px;">Oops. Lo sentemos pero la página que estabas buscando no se puede encontrar.</v-flex>
          </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import PageTitle from '../components/Layout/PageTitle'
export default {
  components: {
    'PageTitle' : PageTitle,
  }, 

}
</script>
