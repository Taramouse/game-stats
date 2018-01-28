/* eslint-disable no-dupe-keys */
import * as firebase from 'firebase'

export default {
  state: {
    loadedProfiles: [
      {
        id: 1,
        name: 'Vuex is working!',
        description: 'Log fastest lap and race time for tracks and cars.',
        items: [
          { text: 'Date Recorded', value: 'date' },
          { text: 'Fastest Lap', value: 'fastest-lap' },
          { text: 'Race Time', value: 'race-time' },
          { text: 'Circuit', value: 'circuit' },
          { text: 'Car Manufacturer', value: 'car-manufacturer' },
          { text: 'Car Model', value: 'car-model' }
        ]
      }
    ]
  },
  mutations: {
    setLoadedProfiles (state, profiles) {
      state.loadedProfiles = profiles
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
    // },
    createUserProfile (state, payload) {
      state.loadedProfiles.push(payload)
    }
  },
  actions: {
    createUserProfile ({ commit, getters }, payload) {
      commit('setLoading', true)
      const profile = {
        name: payload.name,
        description: payload.description,
        items: payload.items,
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
              items: obj[key].items,
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
    }
  }
}
