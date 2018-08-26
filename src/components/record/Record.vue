<template>
  <v-container fluid class="pa-0">
    <v-layout row>
      <v-flex xs12 md8 offset-md2>
          <v-card>
            <v-container fluid grid-list-sm>
              <v-layout row>
                <v-flex xs12 class="pa-0 ma-0">
                  <div>
                    <v-card-text class="primary display-3">{{profile.name}}</v-card-text>
                    <v-card-text class="primary subheading">{{profile.description}}</v-card-text>
                  </div>
                </v-flex>
              </v-layout>
              <!-- Data Entry -->
              <v-layout row v-if="hasActiveProfile">
                <v-card>
                  <v-card-title>
                    <span class="headline">Add New Record</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4 v-for="header in headers" :key="header.value">
                          <v-text-field :label="header.text" v-model="editedItemData[header.value]"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click.native="clearData">Clear Form</v-btn>
                    <v-btn
                      color="blue darken-1"
                      flat
                      :disabled="loading"
                      :loading="loading"
                      @click.native="saveData"
                      >Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-layout>
            </v-container>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        dialog: false,
        editedItemData: {},
        itemData: {}
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
      hasActiveProfile () {
        return this.$store.getters.hasActiveProfile
      },
      headers () {
        return this.$store.getters.getHeaders
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
    },
    methods: {
      clearData () {
        this.editedItemData = {}
      },
      saveData () {
        // this.itemData.push(this.editedItemData)
        console.log(this.editedItemData)
        const itemData = {
          item: this.editedItemData
        }
        // save the data. Todo: Save data to cloud using store action.
        this.$store.dispatch('createUserData', itemData)
      }
    }
  }
</script>
