<template>

        <v-card class="card--flex-toolbar mb-2">
          <v-toolbar card dark>
            <v-toolbar-title>Profile Editor</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-items>
              <v-btn flat @click="editDialogue = true">
                <v-icon left>add</v-icon>
                <span class="hidden-sm-and-down">Add Stat</span>
              </v-btn>
              <v-btn flat @click="onCreateProfile">
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
                      ></v-text-field>
                      <v-text-field
                        label="Profile Description"
                        v-model="profileDescription"
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
</template>

<<script>
  export default {
    data () {
      return {
        profileName: '',
        profileDescription: '',
        profileItems: [],
        statName: '',
        editDialogue: false
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
        const profileData = {
          profileName: this.profileName,
          profileDescription: this.profileDescription,
          profileItems: this.profileItems
        }
        this.$store.dispatch('createProfile', profileData)
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

