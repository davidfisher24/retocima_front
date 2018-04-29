<template>
    <v-container fluid class="pa-0 my-2">
        
        
        <v-layout row wrap>

            <v-toolbar color="white" flat dense class="primary--text mb-3 ">
                <v-toolbar-title class="display-2">
                   {{cimero.fullname}}
                </v-toolbar-title>
            </v-toolbar>


            <v-flex xs12 md4 order-md1 order-xs2 :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }">
                <v-expansion-panel class="dense-expansion">
                    <v-expansion-panel-content  v-for="communidad in communidads" :key="communidad.id" v-if="communidad.completed > 0">
                        <div slot="header" class="subheading primary--text py-0">{{communidad.nombre}} {{communidad.completed}} / {{communidad.total}}</div>
                        <ProvinciaLogroList :provinciaGroup="provinceGroup(communidad.id)" :communidad="communidad" :cimas="cimas" :logros="logros"></ProvinciaLogroList>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
            <v-flex xs12 md8 order-md2 order-xs1 :class="{'px-1': $vuetify.breakpoint.smAndDown, 'px-4' : $vuetify.breakpoint.mdAndUp, }">
                <SpainSVG :options="options"></SpainSVG>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import ProvinciaLogroList from './Dialogs/ProvinciaLogroList'
    import SpainSVG from './SVG/SpainSVG'
    import provinceMap from './SVG/provinceMap'

    export default {
        props: ["userLogros"],
        data: function() {
            return {
                options: null,
            };
        },

        components: {
            'ProvinciaLogroList' : ProvinciaLogroList,
            'SpainSVG' : SpainSVG
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
                this.cimas = this.$route.params.cimas
            },

        
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
