<template>
  <div id="svg-wrapper">
    <svg></svg>
  </div>
</template>

<script>
    import * as d3 from "d3";

    export default {

        data() {
            return {
                climb: this.$store.getters['cimas/oneById'](this.$route.params.id),
            };
        },

        mounted() {
         this.renderChart(this.issues)   
        },


        computed: {
          width() {
            return document.getElementById('svg-wrapper').parentElement.offsetWidth;
          },
          height() {
            return this.width / 1.5
          },
          margin() {
            return this.height * 0.1
          },
          area() {
            return this.climb.properties.area
          },
          kilometers() {
            return this.climb.properties.kilometers
          },
          name () {
            return this.climb.properties.name
          }
        },


        methods: {

          toHex(n) {
            if (n <= 0) return "00"
            if (n >= 255) return "FF"
              var hex = n.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
          },

          getFillGradient(gradient) {
            let red,green;
            if (gradient < 0) {
              red = 255 - Math.round((Math.abs(gradient) * 10));
              green = 255
            } else {
              red = 255;
              green = Math.round(255 - (gradient * 17))
            }
            return `#${this.toHex(red)}${this.toHex(green)}00`
          },

          renderChart(issues_val) {
            const chart_width = this.width - 2 * this.margin;
            const chart_height = this.height - 2 * this.margin;
            const graphMin = 100 * Math.floor(d3.min(this.area, (d) => d.altitude)/100); 
            const graphMax = 100 * Math.ceil(d3.max(this.area, (d) => d.altitude)/100);


            const svg = d3
              .select("svg")
              .attr("width", this.width)
              .attr("height", this.height)
              .call(d3.zoom().on("zoom", function () {
                  svg.attr("transform", d3.event.transform)
              }))
              .append("g")
              .attr("transform", `translate(${this.margin}, ${this.margin})`);

              const xScale = d3.scaleLinear()
                .domain(d3.extent(this.area, (d) => d.distance))
                .range([0, chart_width])

              const yScale = d3.scaleLinear()
                .domain([graphMin, graphMax])
                .range([chart_height, 0])

              svg
                .append("g")
                .call(d3.axisLeft(yScale));

              svg
                .append("g")
                .attr("transform", `translate(0, ${chart_height})`)
                .call(d3.axisBottom(xScale))

              const areaFn = d3.area()
                .x((d) => xScale(d.distance))
                .y0(yScale(graphMin))
                .y1((d) => yScale(d.altitude))

              // Add area map to graph
              this.area.forEach((d,i) => {
                if (i > 0) {
                  const kmGradient = this.kilometers[Math.ceil(d.distance)].kmGradient
                  const sectGradient = d.altitude - this.area[i-1].altitude
                  svg.append("path")
                    .datum([this.area[i-1],d])
                      .attr("stroke", this.getFillGradient(kmGradient))
                      .style("fill", this.getFillGradient(kmGradient))
                      .attr("d", areaFn);
                }
              });

              // Append lines at km points
              svg.selectAll("kmLines")
                  .data(this.kilometers)
                  .enter()
                  .append("rect")
                    .attr('x', function(km,i) { return xScale(km.distance) })
                    .attr('y', function(km,i) { return yScale(km.altitude) })
                    .attr('height', function(km,i) { return chart_height - yScale(km.altitude) })
                    .attr('width', 1)
                    .attr("fill", "#333")

              // Append text of gradients
              svg.selectAll('gradientTexts')
                    .data(this.kilometers.slice(1))
                    .enter()
                    .append("text")
                      .attr("x", (km) => km.distance % 1 === 0 ? xScale(km.distance - 0.5) : xScale(km.distance))
                      .attr("y", (km) => chart_height - 5)
                      .text((km) => `${Math.round(km.kmGradient * 10) / 10}%`)
                      .attr("font-family", "sans-serif")
                      .attr("font-size", "12px")
                      .attr("fill", "#333")
                      .attr("text-anchor", "middle")

              // Append text of altitudes
              svg.selectAll('altitudeTexts')
                    .data(this.kilometers)
                    .enter()
                    .append("text")
                      .attr("x", (km) => xScale(km.distance))
                      .attr("y", (km) => yScale(km.altitude - 30))
                      .text((km) => `${Math.round(km.altitude)}`)
                      .attr("font-family", "sans-serif")
                      .attr("font-size", "12px")
                      .attr("fill", "#333")
                      .attr("text-anchor", "left")

              // Title
              svg.append("text")
                  .text(this.name)
                  .attr("x", chart_width  * 0.75)
                  .attr("y", 40)
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "12px")
                  .attr("fill", "#333")
                  .attr("text-anchor", "right")

              
          }

        },
    }

</script>
