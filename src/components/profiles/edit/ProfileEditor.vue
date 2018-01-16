<template>
  <div>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
     </v-layout>
        <v-card class="card--flex-toolbar mb-2">
          <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="onCreateProfile">
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
              <v-btn flat>
                <v-icon left>remove_red_eye</v-icon>
                <span class="hidden-sm-and-down">Preview</span>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

            <v-card-text>
                <v-layout row>
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
                        :options="{group:'stats'}"
                        @start="drag=true"
                        @end="drag=false">
                        <transition-group>
                          <div v-for="item in profileItems" :key="item.title">
                            <v-chip close light @input="remove(item)">{{item.title}}</v-chip>
                          </div>
                        </transition-group>
                      </draggable>

                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
          </v-form>
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
                  v-model="statName"
                  required unique></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn flat class="error--text" @click="onDiscard">Discard</v-btn>
                <v-btn flat class="info--text" @click="onSaveChanges">Add Stat</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    </v-card>
  </div>
</template>

<<script>
  export default {
    data () {
      return {
        profileName: '',
        profileDescription: '',
        profileItems: [],
        statName: '',
        editDialogue: false,
        valid: false,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length >= 5 || 'Name must be more than 3 characters'
        ],
        descriptionRules: [
          (v) => !!v || 'Description is required',
          (v) => v.length >= 10 || 'Descriptio must be more than 10 characters'
        ]
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
        this.profileItems.push({title: 'New Stat Added!'})
      },
      remove (item) {
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
      onSaveChanges () {
        if (this.statName.trim() === '') {
          return
        }

        this.editDialogue = false
        // ToDo These names must be unique - need validation
        this.profileItems.push({title: this.statName})
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

