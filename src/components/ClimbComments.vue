<template>  
  <v-card md6>
    <v-container v-if="user && showAdd">
      <v-text-field
        label="Titulo"
        single-line
        counter=100
        v-model="title"
      ></v-text-field>
      <v-text-field
        label="Commentario"
        textarea
        rows="10"
        auto-grow
        counter=1000
        v-model="text"
      ></v-text-field>
      <v-btn color="primary" @click="add">Añadir</v-btn>
      <v-btn color="secondary" @click="showAdd = false">Cerrar</v-btn>
    </v-container>

    <v-btn color="primary" @click="showAdd = true"v-if="user && !showAdd">Add comment</v-btn>

    <v-list three-line v-for="comment in comments">
      <v-list-item
        :key="comment.id"
        @click=""
      >
        <v-list-item-content>
          <v-list-item-title v-text="comment.title"></v-list-item-title>
          <v-list-item-subtitle class="text--primary" v-text="comment.text"></v-list-item-subtitle>
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
      title: '',
      text: '',
      showAdd: false,
      comments : [],
    }
  },


  mounted () {
    this.fetch()
  },

  methods: {

    fetch () {
      this.$store.dispatch("comments/getComments",this.climb).then(response => {

        this.comments = response.results
      })
    },

    add () {
      this.loading = true
      let data = {
        title: this.title,
        text: this.text,
        climb: this.climb
      }

      this.$store.dispatch("comments/createComment",data).then(response => {
        this.showAdd = false
      })
    },
  }
}
</script>
