/* eslint-disable no-dupe-keys */
import * as firebase from 'firebase'

export default {
  state: {
    profileName: 'Real Racing 3',
    profileDescription: 'Log fastest lap and race time for tracks and cars.',
    profileItems: [
      { text: 'Date Recorded', value: 'date' },
      { text: 'Fastest Lap', value: 'Fastest Lap' },
      { text: 'Race Time', value: 'Race Time' },
      { text: 'Circuit', value: 'Circuit' },
      { text: 'Car Manufacturer', value: 'Car Manufacturer' },
      { text: 'Car Model', value: 'Car Model' }
    ]
  },
  mutations: {
    createProfile (state, payload) {
      // state.loadedProfile.push(payload)
    }
  },
  actions: {
    createProfile ({ commit, getters }, payload) {
      commit('setLoading', true)
      const profile = {
        profileName: payload.profileName,
        profileItems: payload.profileItems,
        profileDescription: payload.profileDescription,
        date: new Date().toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('game-profiles').child(payload.profileName).push(profile)
        .then(() => {
          commit('setLoading', false)
          commit('createProfile', {
            ...profile
          })
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    loadProfile ({commit}) {
      commit('setLoading', true)
      // replace once with on for realtime updates from firebase.
      firebase.database().ref('game-profile').once('value')
        .then((data) => {
          const profiles = []
          const obj = data.val()
          for (let key in obj) {
            profiles.push({
              id: key,
              profileName: obj[key].profileName,
              prfileDescription: obj[key].profileDescription,
              profileItems: obj[key].profileItems,
              imageUrl: obj[key].imageUrl,
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
    loadedProfile (state) {
      return (profileId) => {
        return state.loadedProfile.find((profile) => {
          return profile.id === profileId
        })
      }
    }
  }
}
