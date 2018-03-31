<template>
    <v-container> 
        <v-layout>
            <v-flex class="px-3">
                <v-toolbar color="primary" v-if="cimero" class="white--text">
                    <v-toolbar-title >{{cimero.fullname}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-expansion-panel v-for="communidad in logros" :key="communidad.id" v-if="logros" focusable>
                    <v-expansion-panel-content >
                        <div slot="header">{{communidad[0][0].communidad.nombre}}
                            <v-badge color="primary">
                                <span slot="badge" v-html="countLogros(communidad)"></span>
                            </v-badge>
                        </div>
                        <v-list two-line>
                            <v-list-tile @click="" v-for="provincia in communidad" :key="provincia.id">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{provincia[0].provincia.nombre}}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{provincia.length}} Logros</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>

    export default {
        props: ["userLogros"],
        data: function() {
            return {
                communidads: [],
                cimas: [],
                loading: true,
                dialog: false,
                logros: null,
                cimero: null,
            };
        },

        mounted: function() {
            var dispatch = this.$route.name === 'user-logros' ? "authCimero" : "cimeros";

            this.$store.dispatch(dispatch,this.$route.params.uid).then(cimero => {
                this.organizeLogros(cimero.logros);
                this.cimero = cimero;
            });
        },

        methods: {

            organizeLogros (logros) {
                var comms = _.values(_.groupBy(logros,"communidad.id"));
                this.logros = comms.map(comm => {return _.values(_.groupBy(comm,"provincia.id"))})
                this.loading = false;

            },

            countLogros (communidad) {
                var count = 0;
                communidad.forEach(prov => prov.forEach(logro => count++));
                return count;
            }
        }
    }
</script>
