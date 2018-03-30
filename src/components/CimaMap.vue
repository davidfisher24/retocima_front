<template> 
<div>
  <router-view></router-view>
    <div id="wrapper" v-show="this.$route.name === 'cima-map'">
      
        <gmap-map
          v-if="mounted"
          :center="getMapCenter()"
          :zoom="getMapZoom()"
          map-type-id="terrain"
          :style="style"
        >
             <gmap-cluster :max-zoom="10" :grid-size="25">

                <gmap-marker
                  :key="index"
                  v-for="(cima, index) in cimas"
                  :position="{lng:parseFloat(cima.latitude), lat:parseFloat(cima.longitude)}"
                  :clickable="true"
                  :draggable="false"
                  :icon="icon"
                  @click="route(cima.id)"
                >
                </gmap-marker>
            </gmap-cluster>
        </gmap-map>
    </div>
  </div>
</template>

<script>

    //import Vue from 'Vue'
    import icon from '../assets/icons/marker.png';

    export default {
        //props: ["cimas","center","zoom"],
        data: function() {
            return {
                icon:icon,
                mounted: false,
                style: "",
                infoWindow: {
                    open:false,
                    template: '',
                    position: {lat:0,lng:0},
                    options:{maxWidth: 300},
                },
                offSet: new google.maps.Size(0,-30),
            };
        },

        watch: {
          '$route.name': function (name) {
            console.log(name);
          }
        },


        mounted:function() {
            console.log(icon);
            this.cimas = this.$route.params.cimas;
            if (this.$route.params.center) this.center = this.$route.params.center;
            if (this.$route.params.zoom) this.zoom = this.$route.params.zoom;
            var hEst = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - document.getElementById('wrapper').parentElement.parentElement.getBoundingClientRect().y; 
            var w = document.getElementById('wrapper').parentElement.parentElement.offsetWidth;
            var h = document.getElementById('wrapper').parentElement.parentElement.offsetHeight < 1 ? document.getElementById('wrapper').parentElement.parentElement.offsetHeight : hEst;
            this.style = "width: "+w+"px; height: "+h+"px; margin:0;";
            this.mounted = true;
        },

        methods: {
            getMapCenter(){
                if (this.center) return this.center;
                var lats = this.getLats();
                var lngs = this.getLngs();
                var latSum = lats.reduce(function(a, b) { return a + b; });
                var lngSum = lngs.reduce(function(a, b) { return a + b; });
                return {lat: lngSum / lngs.length, lng: latSum / lats.length};
            },

            getMapZoom(){
                if (this.zoom) return this.zoom;
                var lats = this.getLats();
                var lngs = this.getLngs();
                var latDiff = Math.abs(Math.max.apply(null,lats) - Math.min.apply(null,lats));
                var lngDiff = Math.abs(Math.max.apply(null,lngs) - Math.min.apply(null,lngs));
                var maxDiff = Math.max(latDiff,lngDiff);
                return parseInt(11 - maxDiff);
                 
            },

            getLats(){
                return this.cimas.map(function(a){ return parseFloat(a.latitude) }).filter(function(b) { return b !== 0});
            },

            getLngs(){
                return this.cimas.map(function(a){ return parseFloat(a.longitude) }).filter(function(b) { return b !== 0});
            },

            openInfoWindowTemplate(item) {
                this.infoWindow.position = {lat:parseFloat(item.longitude), lng:parseFloat(item.latitude)};
                this.infoWindow.template = "<p style='margin-bottom:0;'><strong>" + item.codigo +"</strong>   " + item.nombre +"</p>";
                this.infoWindow.options = { pixelOffset: this.offSet};
                this.infoWindow.open = true;

            },

            closeInfoWindow(evt){
              this.infoWindow.open = false;
            },

            route (id) {
              this.$router.push({name: 'map-cima', params: {cid: id}})
            },
        },
    }

/*
@mouseover="openInfoWindowTemplate(cima)"
                  @mouseout="infoWindow.open = false"
          <gmap-info-window
                      :options="infoWindow.options"
                      :position="infoWindow.position"
                      :opened="infoWindow.open"
                      @closeclick="infoWindow.open=false">
                      <div v-html="infoWindow.template"></div>

                  </gmap-info-window>

*/

</script>
