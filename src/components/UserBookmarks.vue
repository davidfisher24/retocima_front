<template>
    <v-container fluid class="pa-0 my-2">
        <v-layout row wrap>
            <v-flex xs12 md12 order-md1 order-xs2>
                <v-card>
                    <v-list v-for="bookmark in bookmarks">
                      <v-list-item
                        :key="bookmark.id"
                        @click=""
                      >
                        <v-list-item-icon>
                            <v-icon color="red">favorite</v-icon>
                        </v-btn>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="bookmark.climb.name"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>

    import _ from 'lodash'

    export default {
        data () {
            return {
                bookmarks: null,
            };
        },

        mounted () {
            this.getBookmarks()
        },

        methods: {
            getBookmarks () {
              this.$store.dispatch("user/bookmarks").then(data => {
                this.bookmarks = data.results
              })
            }

        }
    }
</script>
