import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Signup from '@/components/user/Signup'
import Signin from '@/components/user/Signin'
import Record from '@/components/record/Record'
import Stats from '@/components/stats/Stats'
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
      path: '/stats',
      name: 'Stats',
      component: Stats,
      beforeEnter: AuthGuard
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      beforeEnter: AuthGuard
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
