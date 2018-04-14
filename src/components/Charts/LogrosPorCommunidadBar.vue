<template> 
      <highcharts :options="options"></highcharts>
</template>


<script>
    import Vue from 'vue';
    import VueHighcharts from 'vue-highcharts';


    export default {
      props: ["data"],
      computed: {
        options () {
          var data = []
          var categories = [];
          var max = 0;
          for (var key in this.data) {
              data.push(this.data[key].count)
              categories.push(this.data[key].nombre);
              max = this.data[key].count > max ? this.data[key].count : max;
          }

          return {
            chart: {
              type: 'column',
            },
            title: {
              text: 'Logros por communidad',
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
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
                text: 'Ascensiones',
              },
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
                "name":"Ascensiones",
                "data": data
            }]
          }
        },
      }
    }

</script>
