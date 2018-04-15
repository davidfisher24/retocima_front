<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <a slot="activator" style="width:100%;display:block;">
        <div v-for="provincia in provinciaGroup" v-if="provincia.completed > 0" :key="provincia.id"  @click="province = provincia.id">
            <v-layout>
                <v-flex xs4 offset-xs1 class="primary--text">{{provincia.nombre}}</v-flex>
                <v-flex xs7 class="primary--text">
                    <span v-if="provincia.completed === provincia.total">!!COMPLETADA!!</span>
                    {{provincia.completed}} / {{provincia.total}}
                </v-flex>
            </v-layout>
        </div>
    </a>

    <v-card v-if="province">
        <v-card-title>
            {{currentProvince.nombre}} {{currentProvince.completed}} / {{currentProvince.total}}
            <v-spacer></v-spacer>
            <v-btn icon small flat @click.native="dialog = false"><v-icon>close</v-icon></v-btn>
        </v-card-title>
          
        <v-list>
            <v-list-tile avatar v-for="cima in cimaList" 
            :class="['ma-1', completed(cima.id) ? 'info' : '']">
                <v-list-tile-avatar color="primary" tile>
                    <span class="white--text">{{cima.codigo}}</span>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="title">
                      {{cima.nombre}}
                      <v-icon v-if="completed(cima.id)">check</v-icon>
                  </v-list-tile-title>
                  
                </v-list-tile-content>
              </v-list-tile> 
        </v-list>
    </v-card>
</v-dialog>
</template>


<script>
  
  export default {
    props: ["provinciaGroup","communidad","cimas","logros"],
    data () {
      return {
        dialog: false,
        province: null,
      }
    },

    computed: {
        cimaList () {
            return this.cimas.filter(c => c.provincia_id === this.province)
        },
        currentProvince () {
            return this.provinciaGroup.find(p => p.id === this.province)
        }

    },

    methods: {
        completed (cimaId) {
            return this.logros[this.province.toString()].find(l => l.cima_id === cimaId)
        }
    }
    
  }
</script>
