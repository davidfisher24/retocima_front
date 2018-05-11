<template>  
  <div class="mt-2">
    <v-btn flat outline small color="white" class="primary--text py-1 mt-1" v-if="user && mount && !done" :disabled="loading" @click="add()">
        <span class="body-1 mr-2"><strong>Añadir a mis logros</strong></span>
        <v-btn fab dark small color="primary" class="xxxs-icon" :loading="loading" 
        ><v-icon>add</v-icon></v-btn>
    </v-btn>
    <v-btn flat outline small color="white" class="primary--text py-1 mt-1" v-if="user && mount && done">
        <span class="body-1 mr-2"><strong>Completado!</strong></span>
        <v-icon color="yellow">star</v-icon>
    </v-btn>
  </div>      
</template>


<script>
export default {
  props: ["cima"],
  data () {
    return {
      user: false,
      done: false,
      mount: false,
      loading: false
    }
  },

  mounted () {
    this.check()
  },

  watch: {
    cima (val) {
      this.mount = false
      this.done = false
      this.check()
    }
  },

  methods: {
    check () {
      this.$store.dispatch("user/checkLogro",this.cima).then(response =>{
        if (response === false) return
        this.user = true
        if (typeof(response) === 'object') this.done = true 
        this.mount = true
      })
    },

    add () {
      this.loading = true
      this.$store.dispatch("user/addLogro",this.cima).then(() => {
        this.done = true
        this.loading = false
      })
    },
  }
}
</script>
