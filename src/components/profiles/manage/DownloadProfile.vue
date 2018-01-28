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
                            v-for="item in cardActions"
                            :key="item.title"
                            :to="item.link + item.id">
                            <v-icon :color="item.color" left>{{ item.icon }}</v-icon>
                            <span class="hidden-sm-and-down">{{ item.title }}</span>
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
        cardActions: [
          {icon: 'cloud_download', title: 'Download', link: '#', color: 'success'},
          {icon: 'edit', title: 'Edit', link: '#', color: 'warning'},
          {icon: 'delete', title: 'Delete', link: '#', color: 'error'}
        ]
      }
    },
    created () {
      this.$store.dispatch('loadUserProfiles')
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      profiles () {
        return this.$store.getters.getLoadedProfiles
      }
    }
  }
</script>
