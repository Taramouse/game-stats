<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-card class="card--flex-toolbar">

          <v-toolbar card dark>
            <v-toolbar-title>Profile Editor</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-items>
              <v-btn flat>
                <v-icon left>add</v-icon>
                Add Stat
              </v-btn>
              <v-btn flat>
                <v-icon left>cloud_upload</v-icon>
                Save
              </v-btn>
              <v-btn flat>
                <v-icon left>remove_red_eye</v-icon>
                Preview
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

            <v-card-text>
                <v-layout row>
                  <v-flex>
                    <div class="editArea pa-2">
                      <v-text-field
                        label="New Profile Name"
                        v-model="profileName"
                      ></v-text-field>

                      <draggable
                        v-model="profileItems"
                        :options="{group:'stats'}"
                        @start="drag=true"
                        @end="drag=false">
                        <transition-group>
                          <div v-for="item in profileItems" :key="item.id">
                            <v-chip close light @input="remove(item)">{{item.title}}</v-chip>
                          </div>
                        </transition-group>
                      </draggable>

                    </div>
                  </v-flex>
              </v-layout>
            </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>


  </v-container>
</template>

<<script>
  export default {
    data () {
      return {
        profileName: 'Real Racing 3',
        profileItems: [
          { id: '7ghu8', title: 'Fastest Lap' },
          { id: '1tg7j', title: 'Race Time' },
          { id: '2rr6j', title: 'Circuit' },
          { id: '3xtuk', title: 'Car Manufacturer' },
          { id: '4r7hn', title: 'Car Model' }
        ]
      }
    },
    methods: {
      remove (item) {
        this.profileItems.splice(this.profileItems.indexOf(item), 1)
        this.profileItems = [...this.profileItems]
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

