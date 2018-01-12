<template>
  <v-app dark>
    <v-navigation-drawer
      temporary
      fixed
      v-model="sideNav"
      app>
      <v-list>
        <v-list-tile
          value="true"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          exact>
          <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn
         v-if="userIsAuthenticated"
        flat
        @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer fixed app>
      <span>&copy; Nicky Keyse 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'fiber_manual_record', title: 'Record Stats', link: '/home'},
            {icon: 'assessment', title: 'View Stats', link: '/home'},
            {icon: 'videogame_asset', title: 'Game Profiles', link: '/home'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
