<template> 
<div id="wrapper">
    <l-map :zoom="12" :center="getPathMapCenter()" :style="style" v-if="coords && mounted">
        <l-marker v-if="path"  :lat-lng="coords[0]" :icon="startIcon"></l-marker>
        <l-marker  :lat-lng="coords[coords.length -1]" :icon="finishIcon"></l-marker>
        <l-polyline v-if="path"  :lat-lngs="coords" color="#0000FF">
        </l-polyline>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
</div>
</template>

<script>
    import { LMap, LTileLayer, LMarker, LTooltip, LPolyline } from 'vue2-leaflet';
    import "leaflet/dist/leaflet.css"
    import pin from '../assets/icons/pin.png';
    import finish from '../assets/icons/finish.png';

    export default {
        name: 'example',
        components: {
          LMap,
          LTileLayer,
          LMarker,
          LTooltip,
          LPolyline,
        },

        props: ["id"],
        data() {
            return {
                style: {},
                mounted: false,
                coords: null,
                path: [],
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            };
        },

        mounted() {
            var that = this
            setTimeout(function(){ 
                that.calculateContainer()
                that.mounted = true
                that.getMapLines()
            }, 50);
            
        },

        computed: {
          startIcon () {
            return L.icon({
              iconUrl: pin,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          },
          finishIcon () {
            return L.icon({
              iconUrl: finish,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          }
        },


        methods: {

            calculateContainer () {
                var w = document.getElementById('wrapper').parentElement.offsetWidth;
                var h = document.getElementById('wrapper').parentElement.parentElement.parentElement.offsetHeight;
                if (h<=30 || h > w) h = w;
                this.style = {
                    height: h + "px",
                    width: '100%'
                }
            },

            getMapLines(){
                var self = this;
                this.$store.dispatch("cimas/mapline",this.id).then(data => {
                    if (!data.data) {
                        self.putCenter(data);
                        return;
                    }
                    var coords = [];
                    data.data.forEach(function(d) {
                        coords.push({lat: d[0][0], lng: d[0][1]})
                    });
                    self.coords = coords;
                    self.putLine(); 
                })
            },

            putCenter (cima) {
                this.coords = [{lat: parseFloat(cima.longitude), lng: parseFloat(cima.latitude)}];
            },

            getPathMapCenter(){
                if (this.coords.length === 1) return L.latLng(this.coords[0].longitude, this.coords[0].latitude)
                var lats = [], lngs = [];
                this.coords.forEach(function(coord){
                    lats.push(coord.lat); lngs.push(coord.lng);
                });
                return {
                    lat: (Math.max.apply(null,lats) + Math.min.apply(null,lats)) / 2,
                    lng: (Math.max.apply(null,lngs) + Math.min.apply(null,lngs) )/ 2,
                }
                var half = Math.round(this.coords.length / 2);
                return this.coords[half];
            },

            putLine(){
                this.path = this.coords;
            },
        },

        watch: { 
            id(newVal, oldVal) { 
                this.coords = null
                this.path = []
                this.calculateContainer()
                this.getMapLines()
            }
        }
    }

</script>
