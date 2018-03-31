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
                  v-for="(cima, index) in validcimas"
                  :position="{lng:parseFloat(cima.latitude), lat:parseFloat(cima.longitude)}"
                  :clickable="true"
                  :draggable="false"
                  :icon="icon"
                  @mouseover="openInfoWindowTemplate(cima)"
                  @mouseout="infoWindow.open = false"
                  @click="route(cima.id)"
                >
                </gmap-marker>
                <gmap-info-window
                      :options="infoWindow.options"
                      :position="infoWindow.position"
                      :opened="infoWindow.open"
                      @closeclick="infoWindow.open=false">
                      <v-chip color="secondary" text-color="white" style="margin:0;padding:0;">
                        <v-avatar class="accent">{{infoWindow.cima.codigo}}</v-avatar>
                        {{infoWindow.cima.nombre}}
                      </v-chip>
                  </gmap-info-window>
            </gmap-cluster>
        </gmap-map>
    </div>
  </div>
</template>

<style>

</style>

<script>
    import icon from '../assets/icons/marker.png';

    export default {
        data: function() {
            return {
                icon:icon,
                mounted: false,
                style: "",
                infoWindow: {
                    open:false,
                    position: {lat:0,lng:0},
                    cima:{
                      codigo: null,
                      nombre: null,
                    },
                },
                offSet: new google.maps.Size(0,-30),
            };
        },

        computed: {
          validcimas () {
            return this.cimas.filter(c => c.latitude != 0 && c.longitude != 0);
          }
        },

        watch: {
          '$route.name': function (name) {
            console.log(name);
          }
        },


        mounted:function() {
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
                this.infoWindow.cima.codigo = item.codigo;
                this.infoWindow.cima.nombre = item.nombre;
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

</script>

          
