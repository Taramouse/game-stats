<template>

        <v-card class="card--flex-toolbar">
          <v-toolbar card dark>
            <v-toolbar-title>Profile Editor</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-items>
              <v-btn flat @click="addStat">
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
                    <div class="editArea pa-4 black">
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

        </v-card>

</template>

<<script>
  export default {
    data () {
      return {
        profileName: 'Real Racing 3',
        profileDescription: 'For logging loads of Real Racing 3 stats.',
        profileItems: [
          { title: 'Fastest Lap' },
          { title: 'Race Time' },
          { title: 'Circuit' },
          { title: 'Car Manufacturer' },
          { title: 'Car Model' }
        ]
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

