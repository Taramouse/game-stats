<template>
  <div>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
     <v-flex xs12>
     <v-card class="card--flex-toolbar">
        <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="onCreateProfile">
          <!-- Toolbar -->
          <v-toolbar card dark>
            <v-toolbar-title>Profile Editor</v-toolbar-title>
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
          <v-card-text v-if="!preview">
            <v-flex>
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
                  v-model="profileItems"
                  @start="drag=true"
                  @end="drag=false"
                ><transition-group>
                  <div v-for="item in profileItems" :key="item.text">
                    <v-chip close light @input="removeStat(item)">{{item.text}}</v-chip>
                  </div>
                </transition-group>
              </draggable>
              </div>
            </v-flex>
          </v-card-text>
          <!-- Preview -->
          <v-card v-if="!preview">
            <v-flex>
              <div class="pa-4">
                <v-card-text
                  class="primary display-3"
                >{{profileName}}
                </v-card-text>
                <v-card-text
                  class="primary subheading"
                >{{profileDescription}}
              </v-card-text>
              </div>
              <v-card-text>
                <v-data-table
                v-bind:headers="profileItems"
                :items="items"
                hide-actions
                class="elevation-1"
                dark
              >
                <template slot="items" slot-scope="props">
                  <td>{{ <props class="item name"></props> }}</td>
                </template>
                <template slot="no-data">
                  <v-alert outline :value="true" color="info" icon="info" transition="scale-transition">
                    Your recorded stats will be displayed in this area.
                  </v-alert>
                </template>
              </v-data-table>
            </v-card-text>
            </v-flex>
          </v-card>

          <!-- <v-card-text v-if="preview">
            <v-flex>
            <h1 class="display-4 py-2">{{profileName}}</h1>
            <h5 class="subheading pa-3">{{profileDescription}}</h5>
            <v-data-table
              v-bind:headers="profileItems"
              :items="items"
              hide-actions
              class="elevation-1"
              dark
            >
              <template slot="items" slot-scope="props">
                <td>{{ <props class="item name"></props> }}</td>
              </template>
              <template slot="no-data">
                <v-alert outline :value="true" color="info" icon="info" transition="scale-transition">
                  Your recorded stats will be displayed in this area.
                </v-alert>
              </template>
            </v-data-table>
            </v-flex>
          </v-card-text> -->

          </v-form>
        </v-card>

      </v-flex>
    </v-layout>
    <v-dialog width="350px" persistent v-model="editDialogue">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Enter Stat Name</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onAddStat">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                    <v-text-field
                      name="name"
                      label="Name"
                      id="name"
                      v-model="statName"
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
                      :disabled="!valid"
                      type="submit"
                      >
                      Add Stat
                    </v-btn>
                  </v-card-actions>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<<script>
  /* eslint-disable no-dupe-keys */
  export default {
    data () {
      return {
        profileName: 'Real Racing 3',
        profileDescription: 'Log fastest lap and race time for tracks and cars.',
        profileItems: [
          { text: 'Date Recorded', value: 'date' },
          { text: 'Fastest Lap', value: 'Fastest Lap' },
          { text: 'Race Time', value: 'Race Time' },
          { text: 'Circuit', value: 'Circuit' },
          { text: 'Car Manufacturer', value: 'Car Manufacturer' },
          { text: 'Car Model', value: 'Car Model' }
        ],
        statName: '',
        items: [],
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
          (v) => this.profileItems.indexOf(v) === -1 || 'Stat names must be unique.'
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
      removeStat (item) {
        this.profileItems.splice(this.profileItems.indexOf(item), 1)
        this.profileItems = [...this.profileItems]
      },
      onCreateProfile () {
        if (this.$refs.form.validate()) {
          const profileData = {
            profileName: this.profileName,
            profileDescription: this.profileDescription,
            profileItems: this.profileItems
          }
          this.$store.dispatch('createProfile', profileData)
        }
      },
      onDiscard () {
        this.editDialogue = false
      },
      onAddStat () {
        if (this.statName.trim() === '') {
          return
        }

        this.editDialogue = false
        // ToDo These names must be unique - need validation
        this.profileItems.push({
          text: this.statName,
          value: this.statName
        })
        // this.$store.dispatch('updateMeetupData', {
        //   id: this.meetup.id,
        //   title: this.editedTitle,
        //   description: this.editedDescription
        // })
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
    min-width: 100%;
    min-height: 10px;
  }
</style>

