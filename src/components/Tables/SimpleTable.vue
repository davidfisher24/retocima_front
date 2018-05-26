<template>
  <v-layout row wrap>
    <v-flex xs12 md4 v-for="chunk,i in chunks">
      <v-list dense class="py-0 mx-2 simple-table-block">
        <div class="simple-table-header my-0" v-if="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.smAndDown && i == 0">
          <v-layout class="primary--text title">
            <v-flex xs2 class="text-xs-left  simple-table-header-cell"></v-flex>
            <v-flex xs8 class="simple-table-header-cell"><p class="text-xs-center mt-2 pt-2">Nombre</p></v-flex>
            <v-flex xs2 class="simple-table-header-cell text-xs-center"><img :src="icon" style="width:100%;max-width:50px;height:auto;"></v-flex>
          </v-layout>
        </div>
          <v-list-tile-content v-for="d,j in chunk" :style="{backgroundColor : (j + 1 + (i * Math.ceil(data.length/3))) % 2 === 0 ? $vuetify.theme.white : $vuetify.theme.background}" class="simple-table-row py-2">
              <v-list-tile-title>
                <v-layout class="simple-table-row primary--text body-1 py-1 px-2">
                  <v-flex xs2 class="text-xs-left pl-1">{{(j + 1 + (i * Math.ceil(data.length/3)))}}</v-flex>
                  <v-flex xs9><p style="text-transform:uppercase;text-overflow: hidden;" class="pr-2">{{d.fullName}}</p></v-flex>
                  <v-flex xs1 class="text-xs-center pr-1">{{d.logros_count}}</v-flex>
                </v-layout>
                </v-list-tile-title>
            </v-list-tile-content>
      </v-list>
    </v-flex>
  </v-layout>
</template>



<script>

    import _ from 'lodash'

    export default {
      props: ["data","icon"],
        data: function() {
            return {
      
            };
        },

        computed: {
          chunks () {
            return _.chunk(this.data,Math.ceil(this.data.length/3));
         },
        },

        beforeMount () {

        },


        watch: {
    
        },

        methods: {
   

        }
    }
</script>

<style  scoped>

    /*.simple-table-row {border-left: 0.5px solid #666 !important; border-right: 0.5px solid #666 !important;}*/
    .simple-table-block {border-right: 1px solid #666 !important;border-left: 1px solid #666 !important;}
    /*.simple-table-block:last-of-type {border-bottom: 1px solid #666 !important;}*/
    .simple-table-header {border-bottom: 1px solid #666 !important;border-top: 1px solid #666 !important;}
    .simple-table-header-cell:not(:first-of-type) {border-left: 1px solid #666 !important;}
</style>

