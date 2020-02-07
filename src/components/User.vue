<template>
    <v-container fluid class="pa-0 my-2">
        <v-layout row wrap>
            <PageTitle text="Mis Logros"></PageTitle>
            <v-flex xs12 md4 order-md1 order-xs2 :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }">
                <v-expansion-panel class="dense-expansion">
                    <v-expansion-panel-content  v-for="communidad in communidads" :key="communidad.id">
                        <div slot="header" class="subheading primary--text py-0"><strong>{{communidad.nombre}}</strong></div>
                            <div v-for="provincia in provinceGroup(communidad.id)":key="provincia.id">
                                <v-layout class="mb-1">
                                    <v-flex xs4 offset-xs1 class="primary--text">{{provincia.nombre}}</v-flex>
                                    <v-flex xs4 class="primary--text">
                                        <strong>
                                            {{provincia.completed}} / {{provincia.active_cimas_count}}
                                        </strong>
                                        <v-icon v-if="provincia.completed == provincia.active_cimas_count" color="yellow">star</v-icon>
                                    </v-flex>
                                    <v-flex xs2 class="primary--text">
                                        <v-btn fab dark small color="primary" class="xxxs-icon"
                                        @click="$router.push({name: 'user-provincia', params: {pid: provincia.id}});"
                                        ><img src="@/assets/icons/logowhite.png" height="14px" width="14px">
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
            <v-flex xs12 md8 order-md2 order-xs1 :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }">
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>

    import _ from 'lodash'

    export default {
        props: ["userLogros"],
        data: function() {
            return {
                options: null,
            };
        },

        watch: {
            '$route.query': function (route) {
                this.createData()
                this.createMapData()
            }
        },

        beforeMount () {
            this.createData()
            this.createMapData()
        },

        methods: {

            provinceGroup (commId) {
                return this.provincias.filter(x => x.communidad_id === commId)
            },

            createData () {
                this.cimero = this.$route.params.cimero.cimero
                this.logros = this.$route.params.cimero.logros
                this.provincias = this.$route.params.cimero.provincias
                this.communidads = this.$route.params.cimero.communidads
                this.cimas = this.$route.params.cimas;
                this.provincias = this.provincias.map(x => {
                    let cimas = this.cimas.filter(c => c.provincia_id == x.id)
                    x.total = cimas.length;
                    x.completed = this.getCompletedTtl(cimas)
                    x.value = x.completed / x.total;
                    return x;
                })
            },

            getCompletedTtl(cimas) {
              return cimas.filter(c => this.completed(c)).length
            },

            completed (cima) {
              if (this.logros.find(l => l.cima_id == cima.id))
                return true
              if (cima.substitute) {
                if (cima.substitute) {
                    if (this.logros.find(l => l.cima_id == cima.substitute.id))
                      return true;
                  }
              }
              return false;
            },
        
            createMapData () {
                var that = this;
                
                this.options = {
                    plotOptions: provinceMap.plotOptions,
                    tooltip: {
                        enabled: false,
                    },
                    credits: {
                        enabled: false,
                    },
                    title: false,
                    series: [{
                        type: 'map',
                        joinBy: ['id'],
                        data: that.provincias,
                        mapData: provinceMap.map.data,


                    }],
                    colorAxis: {
                        min: 0,
                        max: 1,
                        showInLegend: false,
                        type: 'linear',
                        minColor: '#f5eee7',
                        maxColor: '#030f24',
                    },
                }
            }
        }
    }
</script>
