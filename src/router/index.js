import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Profiles from '@/components/profiles/profiles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profiles',
      name: 'Profiles',
      component: Profiles,
      beforeEnter: AuthGuard
    }
  ]
  // mode: 'history'
})
