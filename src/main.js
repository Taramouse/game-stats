// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'

import App from './App'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  // render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCcOU6s2XI4LF-IqpqAzrtPclzE9pJhIto',
      authDomain: 'game-stats-9845e.firebaseapp.com',
      databaseURL: 'https://game-stats-9845e.firebaseio.com',
      projectId: 'game-stats-9845e',
      storageBucket: 'game-stats-9845e.appspot.com',
      messagingSenderId: '773568186716'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
