<template> 
    <div id="wrapper">
        <gmap-map
          v-if="coords && mounted"
          :center="getPathMapCenter()"
          :zoom="11"
          map-type-id="terrain"
          :style="style"
        >
            <gmap-polyline v-if="path" 
            :path="path" 
            :options="{strokeColor: '#0000FF'}"/>
            <gmap-marker
              v-if="path"
              :icon="pin"
              :position="coords[0]"
              :clickable="false"
              :draggable="false"
            ></gmap-marker>
            <gmap-marker
               v-if="path"
              :icon="finish"
              :position="coords[coords.length -1]"
              :clickable="false"
              :draggable="false"
            ></gmap-marker>
        </gmap-map>
        <!--<a @click="drawLine()">ROUTE</a>-->
    </div>
</template>

<script>
    import ajax from '../ajax';
    import pin from '../assets/icons/pin.png';
    import finish from '../assets/icons/finish.png';

    export default {
        props: ["id"],
        data() {
            return {
                mounted: false,
                style: "",
                coords: null,
                path: [],
                drawing: null,
                drawIndex: 0,
                pin: pin,
                finish:finish,
            };
        },

        mounted() {
            this.mounted = true
            this.getMapLines()
        },

        methods: {


            getMapLines(){
                var self = this;
                ajax.maplines(this.id).then(data => {
                    if (!data.data) {
                        self.putCenter(data);
                        return;
                    }
                    var coords = [];
                    data.data.forEach(function(d) {
                        coords.push({lat: d[0][0], lng: d[0][1]})
                    });
                    self.coords = coords;
                    var w = document.getElementById('wrapper').parentElement.offsetWidth;
                    var h = document.getElementById('wrapper').parentElement.parentElement.parentElement.offsetHeight;
                    if (h<=15 || h > w) h = w;
                    self.style = "width: "+w+"px; height: "+h+"px; margin:0;";
                    self.putLine(); 
                })
            },

            putCenter (cima) {
                this.coords = [{lat: parseFloat(cima.longitude), lng: parseFloat(cima.latitude)}];
                var w = document.getElementById('wrapper').parentElement.offsetWidth;
                var h = document.getElementById('wrapper').parentElement.parentElement.parentElement.offsetHeight;
                if (h<=15) h = w/1.6;
                this.style = "width: "+w+"px; height: "+h+"px; margin:0;";
            },

            getPathMapCenter(){
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

            drawLine(){
                var self = this;
                this.drawing = setInterval(function(){ self.draw() }, 10)
            },

            draw(){
                if (this.coords[this.drawIndex]) {
                    this.path.push(this.coords[this.drawIndex]);
                    this.drawIndex = this.drawIndex + 1;
                } else {
                  clearInterval(this.drawing);
                }
            },
        },

        watch: { 
            id(newVal, oldVal) { 
                this.coords = null
                this.path = []
                this.getMapLines()
            }
        }
    }

</script>
