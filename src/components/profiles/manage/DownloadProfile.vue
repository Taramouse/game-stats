<template>
  <v-layout>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-container fluid class="pa-0">
            <v-layout row>
              <v-flex xs12>
                <v-card>
                  <v-container fluid grid-list-sm>
                    <v-layout row wrap v-for="profile in profiles" :key="profile.id">
                      <v-flex xs12 class="pa-0 ma-1">
                          <v-card-text
                            class="primary display-3"
                          >{{profile.name}}
                          </v-card-text>
                          <v-card-text
                            class="primary darken-1 subheading"
                          >{{profile.description}}
                        </v-card-text>
                        <v-card-actions>
                          <v-btn flat>
                            <v-icon left>cloud_download</v-icon>
                            Download
                          </v-btn>
                          <v-btn flat>
                            <v-icon left>edit</v-icon>
                            Edit
                          </v-btn>
                          <v-btn flat color="error">
                            <v-icon left>delete</v-icon>
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>

          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    created () {
      this.$store.dispatch('loadUserProfiles')
    },
    computed: {
      profiles () {
        return this.$store.getters.getLoadedProfiles
      }
    }
  }
</script>
