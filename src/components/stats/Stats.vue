<template>
  <v-layout justify-center align-center >
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

    <v-layout row>
      <v-flex xs12>
        <v-container fluid >
          <v-layout row wrap>
            <v-flex xs12 class="pa-0 ma-0">
              <v-card>
                <v-card-text
                  class="primary display-3"
                  >{{profile.name}}
                </v-card-text>
                <v-card-text
                  class="primary subheading"
                  >{{profile.description}}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>


                  <!-- <v-layout row wrap class="hidden-sm-and-down">
                    <v-flex xs12>
                      <v-card-text>
                        <v-data-table
                          :headers="profile.headers"
                          :items="items"
                          hide-actions
                          disable-initial-sort
                          class="elevation-1"
                          dark
                        >
                        </v-data-table>
                        <template slot="headers" slot-scope="props">

                        </template>
                        <template slot="no-data">
                          <v-alert :value="true" color="info" icon="info" transition="scale-transition">
                            No data displayed during preview.
                          </v-alert>
                        </template>
                      </v-card-text>
                    </v-flex>
                  </v-layout> -->
                  <!-- Card Preview -->
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex d-block v-for="item in items" :key="item.item.id" xs4>
            <v-card class="ma-2" v-for="item in items" :key="item.id">
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="(key, value) in item.item" :key="key">
                    <v-list-tile-content>
                      {{ value }}
                    </v-list-tile-content>
                    <v-list-tile-content class="align-end">
                      {{ key }}
                      </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        data: []
      }
    },
    computed: {
      profile () {
        if (this.id) {
          return this.$store.getters.getProfileById(this.id)
        } else if (this.$store.getters.hasActiveProfile) {
          return this.$store.getters.getActiveProfile
        } else {
          const profile = { id: '0', name: 'No Active Profile', description: 'Please download or create a new profile.', items: [] }
          return profile
        }
      },
      items () {
        return this.$store.getters.getUserData
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.profile.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
