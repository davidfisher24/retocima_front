<template>  
  <v-card md6>
    <v-container>
       <div class="dropbox">
        <input type="file" @change="attachFiles($event.target.files);"
          accept="image/*" class="input-file">
      </div>
      <v-text-field
        label="Texto"
        rows="10"
        auto-grow
        counter=100
        v-model="text"
      ></v-text-field>
      <v-btn color="primary" @click="add">Añadir</v-btn>
      <v-btn color="secondary" @click="showAdd = false">Cerrar</v-btn>
    </v-container>

    <v-btn color="primary" @click="showAdd = true"v-if="user && !showAdd">Add Photo</v-btn>

    <v-list three-line v-for="photo in photos">
      <v-list-item
        :key="photo.id"
        @click=""
      >
        <v-list-item-content>
          <v-img
            :src="photo.url"
            height="300px"
            width="300px"
            dark
            aspect-ratio="1"
          ></v-img>
          <v-list-item-title v-text="photo.id"></v-list-item-title>
          <v-list-item-subtitle class="text--primary" v-text="photo.text"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>      
</template>

<style>
</style>

<script>

export default {
  props: ["climb"],
  data () {
    return {
      user: this.$store.getters['user/loggedIn'],
      photo: null,
      text: '',
      showAdd: false,
      photos : [],
    }
  },


  mounted () {
    this.fetch()
  },

  methods: {

    fetch () {
      this.$store.dispatch("photos/getPhotos",this.climb).then(response => {
        this.photos = response.results
      })
    },

    add () {
      this.loading = true
      const files = [
        { key: 'photo', file: this.photo },
        { key: 'text', file: this.text },
        { key: 'climb', file: this.climb }
      ]

      this.$store.dispatch("photos/createPhoto",files).then(response => {
        this.showAdd = false
      })
    },

    attachFiles (files) {
      this.photo = files[0]
    },

    formPhotoUrl(photo) {
      alert(photo.path)
      return process.env.API_URL + photo.path
    }
  }
}
</script>
