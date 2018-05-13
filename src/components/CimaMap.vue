<template> 
<div style="width:100%;height:100%">
    <router-view></router-view><!-- remove for routing -->
    <l-map :zoom="getMapZoom()" :center="getMapCenter()" style="height:100%;width:100%;" v-if="mounted"
    v-show="this.$route.name === 'cima-map' || this.$route.name === 'provincia-map' || this.$route.name === 'patanegra-map'"> <!-- Remove for routing -->

     <v-marker-cluster v-if="addCimas">
      <l-marker v-for="c in validcimas" :lat-lng="c.marker" :icon="icon" @click="route(c.id)">
        <l-tooltip>
          <v-chip color="secondary" text-color="white" style="margin:0;padding:0;">
            <v-avatar class="accent">{{c.codigo}}</v-avatar>
            {{c.nombre}}
          </v-chip>
        </l-tooltip>
      </l-marker>
    </v-marker-cluster>

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
                cimas: [],
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                mounted: false,
                addCimas: false,
            };
        },

        computed: {
          validcimas () {
            return this.cimas.filter(c => c.latitude != 0 && c.longitude != 0);
          },
          icon () {
            return L.icon({
              iconUrl: Icon,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }
        },

        mounted () {
            if (this.$route.params.center) this.center = this.$route.params.center; 
            if (this.$route.params.zoom) this.zoom = this.$route.params.zoom;
            this.cimas = this.$route.params.cimas;
            this.cimas.forEach(c => {c.marker = L.latLng(c.longitude, c.latitude)}),
            this.mounted = true

            var that = this;
            window.setTimeout(function() {that.addCimas = true}, 50) 
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


            route (id) {
              if (this.$route.name === 'cima-map') this.$router.push({name: 'map-cima', params: {id: id}});
              else if (this.$route.name === 'provincia-map') this.$router.push({name: 'provincia-cima', params: {pid: this.$route.params.pid, cid: id}});
              else if (this.$route.name === 'patanegra-map') this.$router.push({name: 'patanegra-cima', params: {cid: id}});
            },
        },
    }

</script>

          
