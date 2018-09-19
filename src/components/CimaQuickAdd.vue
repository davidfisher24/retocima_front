<template>  
  <div>
    <v-btn flat small color="transparent" class="my-0" v-if="!mount && user">
      <!-- Dummy Button -->
    </v-btn>
    <v-btn flat outline small color="white" class="primary--text my-0" v-if="user && mount && !done" :disabled="loading" @click="add()">
        <span class="body-1 mr-2"><strong>Añadir a mis logros</strong></span>
        <v-btn fab dark small color="primary" class="tiny-icon" :loading="loading" 
        ><v-icon>add</v-icon></v-btn>
    </v-btn>
    <v-btn flat outline small color="white" class="primary--text my-0 trophy-button" v-if="user && mount && done">
        <span class="body-1 mr-2"><strong>Completado!</strong></span>
        <v-icon color="yellow">star</v-icon>
    </v-btn>
  </div>      
</template>

<style>
  .trophy-button:hover, .trophy-button:focus {cursor: default;background-color:white;}
</style>

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
      if (this.cima.estado !== 1) return;
      this.$store.dispatch("user/checkLogro",this.cima.id).then(response =>{
        if (response === false) return // No user
        this.user = true
        if (typeof(response) === 'object') this.done = true 
        this.mount = true
      })
    },

    add () {
      this.loading = true
      this.$store.dispatch("user/addLogro",this.cima.id).then(() => {
        this.done = true
        this.loading = false
      })
    },
  }
}
</script>
