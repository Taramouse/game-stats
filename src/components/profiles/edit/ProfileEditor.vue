<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="createProfile">
     <!-- Toolbar -->
    <v-toolbar dark flat>
      <v-toolbar-title>Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="editDialogue = true">
          <v-icon left>add</v-icon>
          <span class="hidden-sm-and-down">Add Stat</span>
        </v-btn>
        <v-btn flat type="submit" :disabled="loading || !valid" :loading="loading">
          <v-icon left>cloud_upload</v-icon>
          <span class="hidden-sm-and-down">Save</span>
        </v-btn>
        <v-btn flat @click="preview = !preview">
          <v-icon color="primary" left v-if="preview">remove_red_eye</v-icon>
          <v-icon left v-if="!preview">remove_red_eye</v-icon>
            <span class="hidden-sm-and-down">Preview</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Editor -->
    <v-card tile>
      <v-container fluid class="pa-0">

          <v-layout row v-if="!preview">
            <v-flex xs12>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-text>
                  <div class="editArea pa-4">
                  <v-text-field
                    label="Profile Name"
                    v-model="profileName"
                    :rules="nameRules"
                    :counter="5"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Profile Description"
                    v-model="profileDescription"
                    :rules="descriptionRules"
                    :counter="10"
                    required
                  ></v-text-field>
                  <draggable
                    v-model="profileHeaders"
                    @start="drag=true"
                    @end="drag=false"
                  ><transition-group>
                    <div v-for="header in profileHeaders" :key="header.text">
                      <v-chip close light @input="removeStat(header.text)">{{header.text}}</v-chip>
                    </div>
                  </transition-group>
                </draggable>
                </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

        <!-- Preview -->
        <v-layout row v-if="preview">
          <v-flex xs12>
            <v-card>
              <v-container fluid grid-list-sm>
                <v-layout row>
                  <v-flex xs12 class="pa-0 ma-0">
                      <div>
                        <v-card-text
                          class="primary display-3"
                        >{{profileName}}
                        </v-card-text>
                        <v-card-text
                          class="primary subheading"
                        >{{profileDescription}}
                      </v-card-text>
                      </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="hidden-sm-and-down">
                  <v-flex xs12>
                    <v-card-text>
                      <v-data-table
                        :headers="profileHeaders"
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
                          Your recorded stats will be displayed in this area.
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
                        <v-list-tile v-for="header in profileHeaders" :key="header.value">
                          <v-list-tile-content>{{header.text}}</v-list-tile-content>
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
      </v-container>
    </v-card>
    <!-- Add stat dialog -->
    <v-dialog width="350px" persistent v-model="editDialogue">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Enter Stat Name</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="newHeader"
                      :rules="statRules"
                      :counter="3"
                      required>
                    </v-text-field>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card-actions>
                    <v-btn flat class="error--text" @click="onDiscard">Discard</v-btn>
                    <v-btn
                      flat
                      class="info--text"
                      @click="addStat"

                      >
                      Add Stat
                    </v-btn>
                  </v-card-actions>
              </v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    </v-form>
  </div>
</template>

<<script>
  /* eslint-disable no-dupe-keys */
  export default {
    data () {
      return {
        profileName: '',
        profileDescription: '',
        profileHeaders: [],
        newHeader: '',
        items: [{}],
        editDialogue: false,
        valid: false,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length >= 5 || 'Name must be at least 5 characters'
        ],
        descriptionRules: [
          (v) => !!v || 'Description is required',
          (v) => v.length >= 10 || 'Description must be at least 10 characters'
        ],
        statRules: [
          (v) => !!v || 'Stat name is required',
          (v) => v.length >= 3 || 'Stat name must be at least 3 characters',
          (v) => !this.profileHeaders.includes(v) || 'Stat names must be unique.'
        ],
        preview: false
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      addStat () {
        console.log(this.newHeader)
        if (this.newHeader.trim() === '') {
          return
        }
        this.editDialogue = false
        // ToDo These names must be unique - need validation
        const header = {
          text: this.newHeader,
          value: this.newHeader.toLowerCase()
          // ToDo replace spaces with - for value
        }
        console.log(header)
        this.profileHeaders.push(header)
      },
      removeStat (header) {
        console.log(header)
        this.profileHeaders.splice(this.profileHeaders.indexOf(header), 1)
        this.profileHeaders = [...this.profileHeaders]
      },
      createProfile () {
        const profileData = {
          name: this.profileName,
          description: this.profileDescription,
          headers: this.profileHeaders
        }
        this.$store.dispatch('createUserProfile', profileData)
      },
      onDiscard () {
        this.editDialogue = false
      },
      error () {
        return this.$store.getters.error
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .editArea {
    min-height: 10px;
  }
</style>

