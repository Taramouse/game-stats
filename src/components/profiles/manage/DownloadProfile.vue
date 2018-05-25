<template>
  <v-layout>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                class="primary--text"
                :width="7"
                :size="70"
                v-if="loading">
              </v-progress-circular>
            </v-flex>
          </v-layout>
          <v-container fluid class="pa-0" v-if="!loading">
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
                          <v-spacer></v-spacer>
                          <v-btn
                            flat
                            :to="'/profiles/' + profile.id">
                            <v-icon color="info" left>remove_red_eye</v-icon>
                            <span class="hidden-sm-and-down">Preview</span>
                          </v-btn>
                          <v-btn
                            flat
                            @click="setActiveProfile(profile.id)"
                            >
                            <v-icon color="success" left>cloud_download</v-icon>
                            <span class="hidden-sm-and-down">Download</span>
                          </v-btn>
                          <v-btn
                            flat
                            @click="editProfile(profile.id)"
                            >
                            <v-icon color="warning" left>edit</v-icon>
                            <span class="hidden-sm-and-down">Edit</span>
                          </v-btn>
                          <v-btn
                            flat
                            @click="deleteProfile(profile.id)"
                            >
                            <v-icon color="error" left>delete</v-icon>
                            <span class="hidden-sm-and-down">Delete</span>
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
        alertMessage: '',
        showAlert: false
      }
    },
    created () {
      this.$store.dispatch('loadUserProfiles')
      // this.$store.dispatch('enablePersistence')
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      profiles () {
        return this.$store.getters.getLoadedProfiles
      }
    },
    methods: {
      setActiveProfile (id) {
        console.log('Download Selected')
        const activeProfile = this.$store.getters.getProfileById(id)
        this.$store.commit('setActiveProfile', activeProfile)
        this.$router.push('/record/' + id)
      },
      editProfile (id) {
        console.log('Edit Selected')
        // load the selected profile into ProfileEditor
      },
      deleteProfile (id) {
        console.log('Delete profile id: ' + id + ' selected.')
        this.alertMessage = `Are you sure you want to delete this profile?
                            This action cannot be undone.
                            `
        this.showAlertDialogue = true
      }
    }
  }
</script>
