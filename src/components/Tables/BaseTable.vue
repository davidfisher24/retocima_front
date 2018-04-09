<template>


  <v-card flat>
      <v-card-title>
        <p class="title" color="primary">{{title}}</p> 
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="columns"
        :items="data"
        :search="search"
        :pagination.sync="pagination"
        :custom-filter="customFilter"
        class="elevation-1 stats-table"
        rows-per-page-text="Filas por pagina"
      >


        <template slot="headers" slot-scope="props">
          <tr>
            <th
              class="stats-table-header"
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header)"
            >
              <v-icon small v-if="header.sortable">arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props" >
        <tr v-bind:class="classCell(props.index)">
          <td v-for="(col, i) in columns" @click="$emit('action',props.item.id)">
            <img v-if="col.type === 'image' && props.item[col.value]" :src="images[props.item[col.value]]" style="width:auto;height:100%;">
            <span v-if="col.type !== 'image'">{{ props.item[col.value]}}</span>
          </td>
          </tr>
        </template>
        <template slot="pageText" slot-scope="props">
          Filas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Busqueda para "{{ search }}" no ha encontrado resultados.
          </v-alert>
      </v-data-table>
  </v-card>

</template>



<script>
    import crown from '../../assets/icons/crown.png';
    import gold from '../../assets/icons/gold.png';
    import silver from '../../assets/icons/silver.png';
    import bronze from '../../assets/icons/bronze.png';

    export default {
        props: ['storeData','columns','filterOptions','searchOptions','title','store','defaultPagination'],
        data: function() {
            return {
                pagination: {},
                images: {
                    crown:crown,
                    gold:gold,
                    silver:silver,
                    bronze:bronze,
                },
                search: '',
                data: [],
            };
        },

        beforeMount () {
            this.data = this.storeData.data
            this.pagination = this.storeData.pagination ? this.storeData.pagination : this.defaultPagination,
            this.search = this.storeData.search ? this.storeData.search : '';
        },


        watch: {
            pagination (options) {
                this.$store.commit(this.store,this.getObject());
            },
            search (value) {
                this.$store.commit(this.store,this.getObject());
            }   
        },

        methods: {
            classCell(i){
                if(i%2 === 0) return 'light stats-table-row';
                return 'stats-table-row';
            },

            changeSort (header) {
                if (!header.sortable) return
                if (this.pagination.sortBy === header.value) {
                  this.pagination.descending = !this.pagination.descending
                } else {
                  this.pagination.sortBy = header.value
                  this.pagination.descending = false
                }
            },

            customFilter(items, search, filter) {
                var search = this.stripAccents(search.toString().toLowerCase());
                var found = items.filter(row => filter(row[this.searchOptions[0]], search));
                return found;
            },

            stripAccents(string){
                var accent_map = {
                    'á': 'a', 
                    'é': 'e',                     
                    'í': 'i',                    
                    'ó': 'o', 
                    'ú': 'u',
                    'ü': 'u',                      
                };

                if (typeof(string) === "number") { return string; }
                if (!string) { return ''; }
                var returnString = '';
                for (var i = 0; i < string.length; i++) {
                    returnString += accent_map[string.toLowerCase().charAt(i)] || string.toLowerCase().charAt(i);
                }
                return returnString;
            },

            getObject () {
                return {
                    data: this.data,
                    columns: this.columns,
                    title: this.title,
                    pagination: this.pagination,
                    search: this.search,
                }
            },

        }
    }
</script>

<style  scoped>
    .stats-table-header {border: 0.5px solid #333;}
    .stats-table-row:hover {cursor:pointer;}
    .stats-table-row {border-left: 0.5px solid #333 !important; border-right: 0.5px solid #333 !important;}
    .stats-table-row:last-of-type  {border-bottom: 0.5px solid #333 !important;}
    .stats-table-row td {height: 32px !important;}
</style>