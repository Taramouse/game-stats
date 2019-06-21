<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar dark flat>
      <v-toolbar-title>Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="editDialogue = true">
          <v-icon left>add</v-icon>
          <span class="hidden-sm-and-down">Add Stat</span>
        </v-btn>

        <v-btn flat @click="createProfile" :disabled="loading || !valid" :loading="loading">
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
                  <v-text-field label="Profile Name" v-model="profileName" :rules="nameRules" :counter="5" required></v-text-field>
                  <v-text-field label="Profile Description" v-model="profileDescription" :rules="descriptionRules" :counter="10" required></v-text-field>
                  <draggable v-model="profileItems" @start="drag=true" @end="drag=false">
                    <transition-group>
                      <div v-for="item in profileItems" :key="item.text">
                        <v-chip close light @input="removeStat(item.text)">{{item.text}}</v-chip>
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
                      <v-card-text class="primary display-3">{{profileName}}
                      </v-card-text>
                      <v-card-text class="primary subheading">{{profileDescription}}
                      </v-card-text>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="hidden-sm-and-down">
                  <v-flex xs12>
                    <v-card-text>
                      <v-data-table :headers="profileItems" :items="items" hide-actions disable-initial-sort class="elevation-1" dark>
                      </v-data-table>
                      <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <!-- <td class="text-xs-right">{{ props.item.date }}</td>
                        <td class="text-xs-right">{{ props.item.fastest-lap }}</td>
                        <td class="text-xs-right">{{ props.item.race-time }}</td>
                        <td class="text-xs-right">{{ props.item.circuit }}</td>
                        <td class="text-xs-right">{{ props.item.car-manufacturer }}</td>
                        <td class="text-xs-right">{{ props.item.car-model }}</td> -->
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
                        <v-list-tile v-for="item in profileItems" :key="item.text">
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
                <v-text-field name="name" label="Name" id="name" v-model="newItem" :rules="statRules" :counter="3" required>
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn flat class="error--text" @click="onDiscard">Discard</v-btn>
                <v-btn flat class="info--text" @click="addStat">
                  Add Stat
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
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
        newItem: '',
        items: [
          { value: false, name: 'Record 1', date: '23-01-18', 'fastest-lap': '1:30.673', 'race-time': '10:48.549', circuit: 'Spa francorchamps', 'car-manufacturer': 'Porche', 'car-model': '911 RSR 2014' },
          { value: false, name: 'Record 2', date: '24-01-18', 'fastest-lap': '1:30.432', 'race-time': '10:28.338', circuit: 'Spa francorchamps', 'car-manufacturer': 'Porche', 'car-model': '911 RSR 2014' }
        ],
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
          (v) => !this.profileItems.includes(v) || 'Stat names must be unique.'
        ],
        preview: false
      }
    },
    computed: {
      profileName: {
        get () {
          return this.$store.getters.getProfileById(1).name
        },
        set (value) {
          this.$store.commit('updateProfileName', value)
        }
      },
      profileDescription: {
        get () {
          return this.$store.getters.getProfileById(1).description
        },
        set (value) {
          this.$store.commit('updateProfileDescription', value)
        }
      },
      profileItems: {
        get () {
          return this.$store.getters.getProfileById(1).items
        },
        set (value) {
          this.$store.commit('updateProfileItems', value)
        }
      },
      // profileItems () {
      //   return this.$store.getters.getProfileById(1).items
      // },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      addStat () {
        console.log(this.newItem)
        if (this.newItem.trim() === '') {
          return
        }
        this.editDialogue = false
        // ToDo These names must be unique - need validation
        const item = {
          text: this.newItem,
          value: this.newItem.toLowerCase()
          // ToDo replace spaces with - for value
        }
        console.log(item)
        this.$store.commit('updateProfileItems', item)
      },
      removeStat (item) {
        console.log(item)
        this.$store.commit('removeProfileItem', item)
      },
      createProfile () {
        const profileData = {
          name: this.profileName,
          description: this.profileDescription,
          items: this.profileItems
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

