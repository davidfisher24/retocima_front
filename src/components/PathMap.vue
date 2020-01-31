<template> 
<div id="wrapper" style="width:100%;height:100%">
    <l-map :zoom="zoom" :style="style" ref="map">
        <l-marker :lat-lng="start" :icon="startIcon"></l-marker>
        <l-marker :lat-lng="end" :icon="finishIcon"></l-marker>
        <l-polyline :lat-lngs="coords" color="#0000FF"></l-polyline>
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
        components: {
          LMap,
          LTileLayer,
          LMarker,
          LTooltip,
          LPolyline,
        },

        data() {
            return {
                style: {
                    height: "600px",
                    width: '800px'
                },
                climb: this.$store.getters['cimas/oneById'](this.$route.params.id),
                zoom: 12,
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            };
        },

        mounted() {
            
            this.$refs.map.fitBounds(this.bounds)
            this.calculateContainer()
            
        },

        updated() {
            this.$refs.map.mapObject.invalidateSize()
        },

        computed: {

          start () {
            const coordZero = this.climb.geometry.coordinates[0]
            return L.latLng(
              coordZero[1], coordZero[0]
            )
          },

          end () {
            const coordLast = this.climb.geometry.coordinates.pop()
            return L.latLng(
              coordLast[1], coordLast[0]
            )
          },

          bounds () {
            const bbox = this.climb.properties.extent
            return [[bbox[1], bbox[0]], [bbox[3], bbox[2]]]
          },

          coords () {
            return this.climb.geometry.coordinates.map(c => {
                return L.latLng(
                  c[1], c[0]
                )
            })
          },

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

                this.style = {
                    height: h + "px",
                    width: w + 'px'
                }
            },
        },
    }

</script>
