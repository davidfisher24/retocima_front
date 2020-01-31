<template> 
<div style="width:100%;height:100%">
    <l-map :zoom.sync="zoom" :center.sync="center" style="height:100%;width:100%;"> 
      <l-marker v-for="c in cimas" :lat-lng="c.marker" :icon="icon" @click="route(c.id)">
        <l-tooltip>
          <v-chip color="secondary" text-color="white" style="margin:0;padding:0;">
            <v-avatar class="accent">**</v-avatar>
            {{c.properties.name}}
          </v-chip>
        </l-tooltip>
      </l-marker>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
</div> 
</template>

<style>
  .leaflet-tooltip {background:transparent;box-shadow:none;-webkit-box-shadow:none;border:none;}
  .leaflet-tooltip-left:before {border-left-color: transparent;}
  .leaflet-tooltip-right:before {border-right-color: transparent;}

  .marker-cluster-small {background-color: rgba(181, 226, 140, 0.6);}
  .marker-cluster-small div {background-color: rgba(110, 204, 57, 0.6);}
  .marker-cluster-medium {background-color: rgba(241, 211, 87, 0.6);}
  .marker-cluster-medium div {background-color: rgba(240, 194, 12, 0.6);}
  .marker-cluster-large {background-color: rgba(253, 156, 115, 0.6);}
  .marker-cluster-large div {background-color: rgba(241, 128, 23, 0.6);}
</style>

<script>
    import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
    import "leaflet/dist/leaflet.css"
    import "leaflet.markercluster/dist/MarkerCluster.css"
    import "leaflet.markercluster/dist/MarkerCluster.Default.css"
    import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
    import Icon from '../assets/icons/marker.png';
    
    export default {
        name: 'example',
        components: {
          LMap,
          LTileLayer,
          LMarker,
          LTooltip,
          'v-marker-cluster': Vue2LeafletMarkerCluster,
        },

        data: function() {
          return {
            cimas: this.$store.getters['cimas/markers'],
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            mounted: false,
            position: this.$store.getters['mapPositions/getPosition'](this.$route.name),
            center: null,
            zoom: null
          };
        },

        computed: {
          icon () {
            return L.icon({
              iconUrl: Icon,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }
        },

        beforeMount () {
          this.zoom = this.position ? this.position.zoom : this.getMapZoom()
          this.center = this.position ? this.position.center : this.getMapCenter()
        },

        watch:{
          "center.lng"(val){
            this.logCurrentMapPosition()
          },
          "center.lat"(val){
            this.logCurrentMapPosition()
          },
          zoom(){
            this.logCurrentMapPosition()
          }
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
              return parseInt(maxDiff / 4);
          },

          getLats(){
            return this.cimas.map(c => c.geometry.coordinates[0])
          },

          getLngs(){
            return this.cimas.map(c => c.geometry.coordinates[1])
          },


          route (id) {
            this.$router.push({name: 'cima', params: {id: id}});
          },

          logCurrentMapPosition () {
            this.$store.dispatch('mapPositions/updatePosition',{
              name:this.$route.name,center:this.center,zoom:this.zoom
            })
          }
        },
    }

</script>

          
