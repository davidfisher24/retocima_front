<template> 
      <v-toolbar color="white" flat dense class="primary--text mb-3 ">
          <v-toolbar-title class="display-2" v-html="text">
          </v-toolbar-title>
          <div v-if="icon" style="height:100%;"><img :src="icon" style="height:100%;"></v-icon></div>
      </v-toolbar> 
</template>

<script>


    export default {
        props: ["text","icon"],
    }

</script>
