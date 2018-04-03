<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
          <v-flex xs12 class="mx-3">
              <v-card>
                <v-list>
                  <v-list-tile avatar v-for="item in incompleteList" :key="item.id">
                    <v-list-tile-avatar>
                      {{ item.codigo }}
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn fab dark small color="indigo" class="x-small" 
                        v-if="adding.indexOf(item.id) === -1 && added.indexOf(item.id) === -1"
                        @click="add(item.id)"
                    >+</v-btn>
                      <v-btn fab dark small color="indigo" class="x-small" loading v-if="adding.indexOf(item.id) !== -1"></v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider inset></v-divider>

                  <v-expansion-panel>
                    <v-expansion-panel-content>
                      <div slot="header">Cimas Completadas - {{completed.length}} logros</div>
                        <v-list-tile avatar v-for="item in completeList" :key="item.id">
                            <v-list-tile-avatar>
                              {{ item.cima.codigo }}
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>{{ item.cima.nombre }}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-btn fab dark small color="cyan" class="x-small"  
                                v-if="adding.indexOf(item.id) === -1 && added.indexOf(item.id) === -1"
                                @click="remove(item.id)"
                              >-</v-btn>
                              <v-btn fab dark small color="cyan" class="x-small" loading v-if="adding.indexOf(item.id) !== -1"></v-btn>
                            </v-list-tile-action>
                          </v-list-tile>
                    </v-expansion-panel-content>
                  </v-expansion-panel>


                   
                </v-list>
              </v-card>
            </v-flex>
      </v-layout> 
    </v-slide-y-transition>
  </v-container>
</template>


<script>

import _ from 'lodash'
export default {

  data () {
    return {
      adding: [],
      added: [],
      completed: this.$route.params.data.complete,
      incompleted: this.$route.params.data.incomplete,
    }
  },

  computed: {
    completeList () {
      return _.orderBy(this.completed,"cima_codigo")
    },
    incompleteList () {
      return _.orderBy(this.incompleted,"codigo")
    }
  },

  methods: {
    add (id) {
      this.adding.push(id);
      this.$store.dispatch("addLogro",id).then(logro => {
        this.completed.push(logro);
        this.incompleted.splice(this.incompleted.indexOf(this.incompleted.find(x => x.id === id)),1)
        this.adding.splice(this.adding.indexOf(id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

    remove (id) {
      this.adding.push(id);
      var logro = this.completed.find(x => x.id === id);
      this.$store.dispatch("removeLogro",logro).then(cima => {
        this.incompleted.push(cima);
        this.completed.splice(this.completed.indexOf(this.completed.find(x => x.cima_id === cima.id)),1);
        this.adding.splice(this.adding.indexOf(id),1);
      }).catch(() => {
        this.adding.splice(this.adding.indexOf(id),1);
      })
    },

  }
}
</script>
