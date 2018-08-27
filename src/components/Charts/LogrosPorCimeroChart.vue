<template> 
      <highcharts :options="options"></highcharts>
</template>


<script>
    import Vue from 'vue';
    import VueHighcharts from 'vue-highcharts';
    import _ from 'lodash'

    export default {
      props: ["data","activeCimas","user","provincia"],
      computed: {

        options () {
          var data = []
          var categories = [];
          var max = 0;

          var counts = _.groupBy(this.data, 'count')
          for (var key in counts) {
            if (key > this.activeCimas.length) {
              data[data.length - 1] += counts[key].length
            } else {
              data.push(counts[key].length)
              categories.push(key)
              max = counts[key].length > max ? counts[key].length : max
            }
          }

          return {
            chart: {
              type: 'column',
            },
            title: {
              text: 'Logros completados por cimeros en ' + this.provincia.nombre,
            },
            xAxis: {
              categories: categories,
              title: {
                text: "Numero de logros",
              },
              labels: {
                  rotation: -45,
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif',
                  }
              }
            },
            yAxis: {
              min: 0,
              max: max,
              title: {
                text: 'Cimeros',
              },
            },
            tooltip: {
              useHTML: true,
              headerFormat: '<small>Cimeros con</small> {point.key} <small>logros</small><table>',
              pointFormat: '<tr><td><b>{point.y}</b></td></tr>',
              footerFormat: '</table>',
            },
            plotOptions: {
              legend: {
                  enabled:false
              },
              column: {
                  showInLegends: false,
              }
            },
            legend: {
              enabled: false,
            },
            credits: {
              enabled: false,
            },
            series: [{
                "name":"Cimeros",
                "data": data
            }]
          }
        },
      }
    }

</script>
