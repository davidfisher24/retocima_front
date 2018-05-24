<template> 
      <v-layout row wrap class="px-3 mb-4">
        <v-flex xs12 md4>
          <v-card flat height="100%" :class="['primary--text', 'body-2', 'mx-2', $vuetify.breakpoint.smAndDown ? 'pt-3 px-3' : 'pa-3' ]">
            <p :class="headClass" v-html="intro">
            </p>
            <div v-html="section1"></div>
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card flat class="primary--text body-2 mx-2 pa-3" height="100%">
            <div v-html="section2"></div>
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card flat class="mx-2 pa-2" height="100%" :style="bgImageStyle">
          </v-card>
        </v-flex>
      </v-layout>
</template>

<script>


    export default {
        props: ["class","intro","section1","section2","image"],
        data () {
		    return {
		      bgImageStyle: {
		          backgroundImage: 'url(\'' + this.image + '\' )',
		          backgroundSize:'cover',
		          minHeight: '200px',
		      },
		      headClass: [ 'subheading', 'indent', 'mb-4'],
		    }
		},
    }

</script>
