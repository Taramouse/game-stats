import * as firebase from 'firebase'

export default {
  state: {
    profileName: 'Real Racing 3',
    profileDescription: 'For logging loads of Real Racing 3 stats.',
    profileItems: [
      { title: 'Fastest Lap' },
      { title: 'Race Time' },
      { title: 'Circuit' },
      { title: 'Car Manufacturer' },
      { title: 'Car Model' }
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
