<template>
   <v-layout wrap grid>
    <v-flex xs12 class="pl-2 subheading primary--text">
     <p>
        <strong>{{title}}</strong>
      </p>
    </v-flex>
    <v-flex xs12>
     <v-select
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      v-model="value"
      label="seleccionar de la lista"
      auto
      autocomplete
      solo
    ></v-select>
    </v-flex>
  </v-layout>
</template>


<script>

export default {
  props: ["title","items","itemText","itemValue"],

  data () {
    return {
      value: null
    }
  },
  
  beforeMount () {
  },

  watch: {

  },

  methods: {


  }
}
</script>
