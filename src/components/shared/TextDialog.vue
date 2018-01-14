<template>
    <v-dialog width="350px" persistent v-model="editDialogue">

      <v-btn flat slot="activator">
        <v-icon left>add</v-icon>
        <span class="hidden-sm-and-down">Add Stat</span>
      </v-btn>

      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title><h4>Enter Stat Name</h4></v-card-title>
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
                  v-model="addedName"
                  required></v-text-field>
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
</template>

<script>
  export default {
    props: ['profileItems'],
    data () {
      return {
        addedName: '',
        editDialogue: false
      }
    },
    methods: {
      onDiscard () {
        this.editDialogue = false
      },
      onSaveChanges () {
        if (this.addedName.trim() === '') {
          return
        }

        this.editDialogue = false
        // ToDo do something to add addedName to profileItems

        // this.$store.dispatch('updateMeetupData', {
        //   id: this.meetup.id,
        //   title: this.editedTitle,
        //   description: this.editedDescription
        // })
      }
    }
  }
</script>
