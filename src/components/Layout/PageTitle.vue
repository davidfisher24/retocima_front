<template> 
      <v-toolbar color="white" flat dense class="primary--text mb-3 ">
          <v-toolbar-title class="display-2">
             {{text}}
          </v-toolbar-title>
      </v-toolbar> 
</template>

<script>


    export default {
        props: ["text"]
    }

</script>
