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
              <v-card>
                <v-container fluid grid-list-sm>
                  <v-layout row>
                    <v-flex xs12 class="pa-0 ma-0">
                        <div>
                          <v-card-text
                            class="primary display-3"
                          >{{profile.name}}
                          </v-card-text>
                          <v-card-text
                            class="primary subheading"
                          >{{profile.description}}
                        </v-card-text>
                        </div>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap class="hidden-sm-and-down">
                    <v-flex xs12>
                      <v-card-text>
                        <v-data-table
                          :headers="profile.items"
                          :items="data"
                          hide-actions
                          disable-initial-sort
                          class="elevation-1"
                          dark
                        >
                        </v-data-table>
                        <template slot="items" slot-scope="props">
                          <td>{{ props.data.name }}</td>
                        </template>
                        <template slot="no-data">
                          <v-alert :value="true" color="info" icon="info" transition="scale-transition">
                            No data displayed during preview.
                          </v-alert>
                        </template>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <!-- Small Preview -->
                  <v-layout row wrap class="hidden-md-and-up">
                    <v-flex xs12>
                      <v-card-text>
                        <v-list>
                          <v-list-tile v-for="item in profile.items" :key="item.text">
                            <v-list-tile-content>{{item.text}}</v-list-tile-content>
                            <v-list-tile-content class="align-end">Enter stat here</v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
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
        return this.$store.getters.getProfileById(this.id)
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
