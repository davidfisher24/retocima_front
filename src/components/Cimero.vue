<template>
    <v-container fluid class="px-0"> 
        <v-layout>
            <v-flex xs4>
                <v-card>
                    <v-list v-for="communidad in communidads" :key="communidad.id" v-if="communidad.completed > 0">
                        {{communidad.nombre}} {{communidad.completed}} / {{communidad.total}}
                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs8>
                <highmaps :options="options"></highmaps>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>

    import Vue from 'vue';
    import VueHighcharts from 'vue-highcharts';
    import Highcharts from 'highcharts';
    import loadMap from 'highcharts/modules/map';
    import provinceMap from './SVG/provinceMap'
    loadMap(Highcharts);
    Vue.use(VueHighcharts, { Highcharts });

    export default {
        props: ["userLogros"],
        data: function() {
            return {
                options: null,
                cimero: this.$route.params.cimero.cimero,
                logros: this.$route.params.cimero.logros,
                provincias: this.$route.params.cimero.provincias,
                communidads: this.$route.params.cimero.communidads,
            };
        },

        beforeMount () {
            this.createMapData()
        },

        methods: {

            createMapData () {
                var that = this;
                this.provincias = this.provincias.map(x => {
                    x.total = x.active_cimas_count;
                    x.completed = that.logros[x.id.toString()] ? that.logros[x.id.toString()].length : 0 ;
                    x.value = x.completed / x.total;
                    return x;
                })

                this.communidads = this.communidads.map(x => {
                    x.total = x.active_cimas_count;
                    x.completed = this.provincias.filter(p => p.communidad_id == x.id).reduce((prev, cur) => prev + cur.completed, 0)
                    return x;
                })

                this.options = {
                    width: '100%',
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                color: '#ffffff',
                                formatter: function(){
                                    return this.point.completed
                                }
                            }
                        }
                    },
                    mapNavigation: {
                        enabled: true,
                    },
                    title: false,
                    series: [{
                        type: 'map',
                        joinBy: ['id'],
                        data: that.provincias,
                        mapData: provinceMap.data
                    }],
                    colorAxis: {
                        min: 0,
                        max: 1,
                        showInLegend: false,
                        type: 'linear',
                        //minColor: '#00ff00',
                        minColor: '#f5eee7',
                        //maxColor: '#ff0000',
                        maxColor: '#030f24',
                        /*stops: [
                            [0, '#00ff00'],
                            [0.5, '#ffff00'],
                            [1, '#ff0000']
                        ]*/
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'grey',
                        headerFormat: '<span style="font-size: 10px">{point.name}</span><br/>.'
                    },
                }
            }
        }
    }
</script>
