<style>
  .flag {
    margin: 2px 4px;
  }
</style>

<template> 
      <img :src="imageSource()" class="flag" height="20" width="24">  
</template>

<script>

    import flag1 from '../assets/communidads/1.png';
    import flag2 from '../assets/communidads/2.png';
    import flag3 from '../assets/communidads/3.png';
    import flag4 from '../assets/communidads/4.png';
    import flag5 from '../assets/communidads/5.png';
    import flag6 from '../assets/communidads/6.png';
    import flag7 from '../assets/communidads/7.png';
    import flag8 from '../assets/communidads/8.png';
    import flag9 from '../assets/communidads/9.png';
    import flag10 from '../assets/communidads/10.png';
    import flag11 from '../assets/communidads/11.png';
    import flag12 from '../assets/communidads/12.png';
    import flag13 from '../assets/communidads/13.png';
    import flag14 from '../assets/communidads/14.png';
    import flag15 from '../assets/communidads/15.png';
    import flag16 from '../assets/communidads/16.png';
    import flag17 from '../assets/communidads/17.png';
    import flag18 from '../assets/communidads/18.png';
    import flag19 from '../assets/communidads/19.png';
    import flag20 from '../assets/communidads/20.png';

    export default {
        props: ["id"],
        data () {
          return {
            flags: {
              1: flag1,
              2: flag2,
              3: flag3,
              4: flag4,
              5: flag5,
              6: flag6,
              7: flag7,
              8: flag8,
              9: flag9,
              10: flag10,
              11: flag11,
              12: flag12,
              13: flag13,
              14: flag14,
              15: flag15,
              16: flag16,
              17: flag17,
              18: flag18,
              19: flag19,
              20: flag20,
            }
          }
        },

        methods: {
          imageSource (id){
              return this.flags[this.id];
          },
   
        },
    }

</script>
