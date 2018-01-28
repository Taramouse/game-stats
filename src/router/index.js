import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Signup from '@/components/user/Signup'
import Signin from '@/components/user/Signin'
import Record from '@/components/record/Record'
import Stats from '@/components/stats/Stats'
import Profiles from '@/components/profiles/Profiles'
import NewProfile from '@/components/profiles/manage/NewProfile'
import DeleteProfile from '@/components/profiles/manage/DeleteProfile'
import DownloadProfile from '@/components/profiles/manage/DownloadProfile'
import EditProfile from '@/components/profiles/manage/EditProfile'
import ShareProfile from '@/components/profiles/manage/ShareProfile'
import UploadProfile from '@/components/profiles/manage/UploadProfile'
import PreviewProfile from '@/components/profiles/manage/PreviewProfile'

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
    },
    {
      path: '/profiles/:id',
      name: 'Preview Profile',
      props: true,
      component: PreviewProfile
    },
    {
      path: '/new-profile',
      name: 'NewProfile',
      component: NewProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/delete-profile',
      name: 'DeleteProfile',
      component: DeleteProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/download-profile',
      name: 'DownloadProfile',
      component: DownloadProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/edit-profile',
      name: 'EditProfile',
      component: EditProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/share-profile',
      name: 'ShareProfile',
      component: ShareProfile,
      beforeEnter: AuthGuard
    },
    {
      path: '/upload-profile',
      name: 'UploadProfile',
      component: UploadProfile,
      beforeEnter: AuthGuard
    }
  ]
  // mode: 'history'
})
