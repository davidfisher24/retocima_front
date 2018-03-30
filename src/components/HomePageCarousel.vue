<style>
    .slide--1 {
      background-color:cyan;
      height: 177px;
    }

    .slide--2 {

      background-color: blue;
      height: 177px;
    }

    .agile__arrow {
        height: 100%;
        bottom:0 ;
        width: 80px;
        position: absolute;
        padding:0;
        margin:0;
        border:0;
        transition-duration: .3s;
        background: transparent;
    }

    .agile__arrow--prev {
        left:0;
    }

    .agile__arrow--next {
        right:0;
    }

    .agile .svg-arrow {
        fill:white;
        fill-opacity: 0.2;
        stroke: white;
        stroke-opacity: 0.9;
        stroke-width: 0.2;
        height:30%;
    }

    .agile .svg-arrow:hover {
        fill-opacity: 0.7;
    }

    .agile__dots {
      align-items: center;
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      white-space: nowrap;
      bottom: 0;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);

      
    }

    .agile__dot button {
      margin: 4px;
      padding: 4px 4px;
      border-radius: 50%;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      background-color: transparent;
      border: 1px solid #fff;
    }

    .agile__dot button:hover {
        background-color: #fff;
    }
 
    .agile__dot--current button {
      background-color: #fff;
    }

    .slide {
      background-size: cover;
      background-position: center;
    }

    
</style>

<template>
    <main>
        <agile :options="options">
            <div class="slide slide--1" :style="{ backgroundImage: 'url(\'' + slide1+ '\')' }"></div>
            <div class="slide slide--2" :style="{ backgroundImage: 'url(\'' + slide2+ '\')' }"></div>
        </agile>
    </main>
</template>

<script>
    import Vue from 'vue'
    import VueAgile from 'vue-agile'
    import slide1 from '../assets/cima.jpg';
    import slide2 from '../assets/cima2.jpg';
    Vue.use(VueAgile)

    export default {
        data: function() {
            return {
              slide1: slide1,
              slide2: slide2,
              options: {
                prevArrow: '<svg class="svg-arrow" x="0px" y="0px" viewBox="0 0 24 24"><path d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z"/></svg>',
                nextArrow: '<svg class="svg-arrow" x="0px" y="0px" viewBox="0 0 24 24"><path d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z"/></svg>',
                arrows: true,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                speed: 750,
                dots: true,
                fade: true,
                timing: "linear",
                mobileFirst: true,
                infinite: true,
              },
            };
        },

        methods: {
            backgroundImage: function(url){
                return "background-image: url("+ url+")";
            }
        }

    }

</script>
