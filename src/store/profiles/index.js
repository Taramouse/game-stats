/* eslint-disable no-dupe-keys */
import * as firebase from 'firebase'

export default {
  state: {
    loadedProfiles: [
      {
        id: 1,
        name: 'Vuex is working!',
        description: 'Log fastest lap and race time for tracks and cars.',
        headers: [
          {
            text: 'Date Recorded',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Laps', value: 'laps' },
          { text: 'Circuit', value: 'circuit' },
          { text: 'Model', value: 'model' },
          { text: 'Manufacturer', value: 'manufacturer' },
          { text: 'Best Lap', value: 'bestlap' },
          { text: 'Race Time', value: 'racetime' }
        ]
      }
    ],
    items: [
      {
        name: '03/05/2018',
        laps: 3,
        circuit: 'Silverstone',
        model: 'Vanquish',
        manufacturer: 'Aston Martin',
        bestlap: '1:25:23',
        racetime: '4:25:26'
      },
      {
        name: '04/05/2018',
        laps: 5,
        circuit: 'Le Manns',
        model: 'Cobra',
        manufacturer: 'AC',
        bestlap: '3:02:04',
        racetime: '15:25:26'
      }
    ],
    activeProfile: {},
    hasActiveProfile: false,
    profileData: {}
  },
  mutations: {
    setLoadedProfiles (state, profiles) {
      state.loadedProfiles = profiles
    },
    setActiveProfile (state, profile) {
      state.hasActiveProfile = true
      state.activeProfile = profile
    },
    createUserProfile (state, payload) {
      state.loadedProfiles.push(payload)
    },
    updateProfileName (state, payload) {
      state.loadedProfiles.name = payload
    },
    updateProfileDescription (state, payload) {
      state.loadedProfiles.description = payload
    },
    updateProfileItems (state, payload) {
      state.loadedProfiles.items.push(payload)
      // state.loadedProfiles.items = [...this.loadedProfiles.items]
    },
    removeProfileItem (state, payload) {
      state.loadedProfiles.items
        .splice(state.loadedProfiles.items.indexOf(payload), 1)
      // state.loadedProfiles.items = [...this.loadedProfiles.items]
    },
    // deleteTodo (state, { todo }) {
    //   state.todos.splice(state.todos.indexOf(todo), 1)
    // }
    updateUserData (state, payload) {
      state.profileData.push(payload)
    }
  },
  actions: {
    createUserProfile ({ commit, getters }, payload) {
      commit('setLoading', true)
      const profile = {
        name: payload.name,
        description: payload.description,
        headers: payload.items,
        date: new Date().toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('user-profiles').push(profile)
        .then(() => {
          commit('setLoading', false)
          commit('createUserProfile', {
            ...profile
          })
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    loadUserProfiles ({commit}) {
      commit('setLoading', true)
      // replace once with on for realtime updates from firebase.
      firebase.database().ref('user-profiles').once('value')
        .then((data) => {
          const profiles = []
          const obj = data.val()
          for (let key in obj) {
            profiles.push({
              id: key,
              name: obj[key].name,
              description: obj[key].description,
              headers: obj[key].headers,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedProfiles', profiles)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    deleteUserProfile ({commit}) {
      // Delete user selected profile.
    }
  },
  getters: {
    getProfileById: (state) => (id) => {
      return state.loadedProfiles.find(loadedProfiles => loadedProfiles.id === id)
    },
    getLoadedProfiles (state) {
      return state.loadedProfiles.sort((profileA, profileB) => {
        return profileA.date < profileB.date
      })
    },
    getActiveProfile (state) {
      return state.activeProfile
    },
    hasActiveProfile (state) {
      return state.hasActiveProfile
    },
    getHeaders (state) {
      return state.activeProfile.headers
    },
    getUserData (state) {
      return state.profileData
    }
  }
}
