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
          var series = []
          for (var key in this.data) {
              series.push({
                name: this.data[key].nombre,
                y: this.data[key].count
              })
          }

          return {
            chart: {
              type: 'pie',
                options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0,
              },
            }, 
            title: {
              text: 'Logros por provincia',
            },
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              depth: 35,
              dataLabels: {
                enabled: true,
                format: "{point.name}"
              }
            },
            legend: {
              enabled: false,
            },
            credits: {
              enabled: false,
            },
            series:[{
                  name: 'Ascensiones',
                  type: "pie",
                  data: series,
              }]
          }
        },
      }
    }

</script>
