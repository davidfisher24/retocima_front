<template> 
<div id="wrapper">
    <l-map :zoom="zoom" :center="getPathMapCenter()" :style="style" v-if="coords && mounted">
        <l-marker v-if="path"  :lat-lng="coords[0]" :icon="startIcon"></l-marker>
        <l-marker  :lat-lng="coords[coords.length -1]" :icon="finishIcon"></l-marker>
        <l-polyline v-if="path"  :lat-lngs="coords" color="#0000FF"></l-polyline>
        <l-polyline v-for="alt in alternatives"  :lat-lngs="alt.coords" :color="alt.color"></l-polyline>
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
                zoom: 12,
                path: [],
                alternatives: [],
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
              iconSize: [20, 32],
              iconAnchor: [10, 32]
            })
          },
          finishIcon () {
            return L.icon({
              iconUrl: finish,
              iconSize: [20, 32],
              iconAnchor: [10, 32]
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
                    var map = data.data;

                    map.forEach(function(el) {

                        if (el[5][0][1][0].indexOf('L') === 0) {
                            el[2][0][0].forEach(c => coords.push(
                                {lat: c[0][0], lng: c[0][1]}
                            ))
                        }
                        else if (el[5][0][1][0] === 'Final') {
                            coords.push(
                                {lat: el[1][0][0][0], lng: el[1][0][0][1]}
                            );
                        } else {
                            var co = []
                            el[2][0][0].forEach(c => co.push(
                                {lat: c[0][0], lng: c[0][1]}
                            ))
                            self.alternatives.push({
                                coords: co,
                                color: el[6],
                                name: el[5][0][1][0]
                            })
                        }
                    })

                    self.coords = coords;
                    self.putLine(); 
                })
            },

            putCenter (vert) {
                this.coords = [{lat: parseFloat(vert.cima.longitude), lng: parseFloat(vert.cima.latitude)}];
            },

            getPathMapCenter(){
                if (this.coords.length === 1) {
                    return  {
                        lat: this.coords[0].lat,
                        lng: this.coords[0].lng,
                    }
                }
                var lats = [], lngs = [];
                this.coords.forEach(function(coord){
                    lats.push(coord.lat); lngs.push(coord.lng);
                });
                return {
                    lat: (Math.max.apply(null,lats) + Math.min.apply(null,lats)) / 2,
                    lng: (Math.max.apply(null,lngs) + Math.min.apply(null,lngs)) / 2,
                }
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
