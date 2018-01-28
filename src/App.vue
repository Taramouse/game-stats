<template>
  <v-app dark>
    <!-- Nav Drawer -->
    <v-navigation-drawer
      temporary
      fixed
      v-model="sideNav"
      app>
      <v-list>
        <v-subheader>Stats</v-subheader>
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
        <v-subheader>Manage Profiles</v-subheader>
        <v-list-tile
          v-for="item in profileMenuItems"
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
    <!-- Toolbar -->
    <v-toolbar fixed app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="sideNav = !sideNav" dark></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Game Stats</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          class="hidden-sm-and-down"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon :color="item.color" left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-menu transition="slide-y-transition" offset-y>
          <v-btn
            flat
            class="hidden-sm-and-down"
            v-if="userIsAuthenticated"
            slot="activator">
            <v-icon class="primary--text" left dark>build</v-icon>
            Manage Profiles
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in profileMenuItems" :key="item.title" :to="item.link">
              <v-list-tile-action>
                <v-icon left dark>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon class="primary--text" left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- Pages -->
    <v-content class="grad-background">
      <v-container fluid fill-height class="pa-0">
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
       </v-container>
    </v-content>
    <!-- Footer -->
    <v-footer fixed app>
      <span>Nicky Keyse 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        profileMenuItems: [
          {icon: 'add', title: 'New Profile', link: '/new-profile', color: 'info'},
          {icon: 'cloud_download', title: 'Download Profile', link: '/download-profile', color: 'success'},
          // {icon: 'cloud_upload', title: 'Upload Profile', link: '/share-profile', color: 'success'},
          {icon: 'edit', title: 'Edit Profile', link: '/edit-profile', color: 'warning'},
          {icon: 'share', title: 'Share Profile', link: '/share-profile', color: 'info'},
          {icon: 'delete', title: 'Delete Profile', link: '/delete-profile', color: 'error'}
        ]
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
            {icon: 'remove_red_eye', title: 'View Stats', link: '/stats', color: 'info'}
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

