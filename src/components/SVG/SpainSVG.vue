<template>
    <highmaps :options="options"></highmaps>
</template>


<script>

    import Vue from 'vue'
    import VueHighcharts from 'vue-highcharts'
    import Highcharts from 'highcharts'
    import loadMap from 'highcharts/modules/map'
    import provinceMap from './provinceMap'
    
    loadMap(Highcharts)
    Vue.use(VueHighcharts, { Highcharts })

    import tick from '../../assets/icons/tick-small.png'

    export default {
        props: ["options"],
        data: function() {
            return {
                tick: tick,
            };
        }
    }
</script>
