<template>  
  <div v-if="mount && user">
    <v-btn icon v-if="bookmarked" :disabled="loading" @click="remove()">
        <v-icon color="red">favorite</v-icon>
    </v-btn>

    <v-btn icon v-if="!bookmarked" :disabled="loading" @click="add()">
        <v-icon color="black">favorite_border</v-icon>
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
      user: this.$store.getters['user/loggedIn'],
      bookmarked: false,
      bookmark: null,
      mount: false,
      loading: false
    }
  },

  mounted () {
    this.check()
  },

  methods: {
    check () {
      if (!this.user) return
      this.$store.dispatch("user/checkBookmark",this.cima.id).then(response => {
        this.mount = true
        if (response.count > 0) {
          this.bookmarked = true
          this.bookmark = response.results[0]
        }
      })
    },

    add () {
      this.loading = true
      this.$store.dispatch("user/addBookmark",this.cima.id).then(response => {
        this.bookmarked = true
        this.bookmark = response
        this.loading = false
      })
    },

    remove () {
      this.loading = true
      this.$store.dispatch("user/removeBookmark",this.bookmark.id).then(() => {
        this.bookmarked = false
        this.bookmark = null
        this.loading = false
      })
    }
  }
}
</script>
