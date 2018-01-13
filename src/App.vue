<template>
  <v-app dark>
    <v-navigation-drawer
      temporary
      fixed
      v-model="sideNav"
      app>
      <v-list>
        <v-subheader>Menu</v-subheader>
        <v-list-tile
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
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="sideNav = !sideNav" dark></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Game Stats</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon class="primary--text" left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon class="primary--text" left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content class="grad-background">
      <router-view></router-view>
    </v-content>
    <v-footer fixed app>
      <span>Nicky Keyse 2018</span>
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
          {icon: 'face', title: 'Sign up', link: '/signup', color: 'info'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin', color: 'info'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'fiber_manual_record', title: 'Record Stats', link: '/record', color: 'error'},
            {icon: 'remove_red_eye', title: 'View Stats', link: '/stats', color: 'info'},
            {icon: 'videogame_asset', title: 'Game Profiles', link: '/profiles', color: 'info'}
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

<<style scoped>
  .grad-background {
    background: #6441a5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #6441a5, #2a0845); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #6441a5, #2a0845); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>

