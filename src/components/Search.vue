<template>
  <v-layout row wrap>
        <v-flex xs12 class="mx-3">
            <v-text-field
              label="Buscar"
              v-model="searchInput"
              clearable
              :error-messages="searchNotFound"
            ></v-text-field>
            <v-list v-if="searchCimas.length > 0">
                <v-list-tile v-for="cima in searchCimas" :key="cima.id">
                    <v-list-tile-content @click="$emit('select',cima.id)">
                        <v-list-tile-title>{{cima.nombre}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{cima.communidad}} / {{cima.provincia}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      searchInput: "",
      searchCimas: [],
      searchNotFound: [],
    }
  },
  
  watch: {
    searchCimas (list) {
      var found = list.length > 0 ? true : false;
      this.$emit('results',found);
    },

    searchInput (val) {
      if (!this.searchInput || this.searchInput.length < 3) {
          this.searchNotFound = [];
          this.searchCimas = [];
          return;
      }
      this.searchCimasAjax();
    },
  },

  methods: {
    showCimaFromSearch (cima) {
        this.searchCimas = [];
        this.searchInput = "";
        this.cima = cima;
    },

    searchDisplay () {
        if (this.searchCimas.length === 0 && this.searchNotFound.length === 0) return "display:none;"
        return "display:block;"
    },

    clearSearch () {
        this.searchCimas = [];
        this.searchInput = "";
    },

    searchCimasAjax: _.debounce(
      function () {
        var self = this;
        axios.get('http://retocima/api/cimas/search/' + this.searchInput).then(function(response){
            self.searchCimas = [];
            if (response.data.length === 0) {
                self.searchNotFound = ["Nada Encontrado"];
                return;
            }
            self.searchNotFound = [];
            var i = 0;
            while (self.searchCimas.length <= 10 && response.data.length > i) {
                if(response.data[i]) self.searchCimas.push(response.data[i]);
                i++;
            }
        });
      },500),
  }
}
</script>
