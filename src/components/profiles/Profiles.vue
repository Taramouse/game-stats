<template>

  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container fluid class="grid-list-md">
          <v-layout row wrap>
            <v-flex
              xs4
              md2
              v-for="item in menuItems"
              :key="item.title"
            >
              <v-card flat tile v-ripple>
                <router-link :to="item.link" tag="a">
                  <v-layout justify-space-around align-center>
                    <v-avatar tile>
                      <v-icon :color="item.color" x-large>{{item.icon}}</v-icon>
                    </v-avatar>
                  </v-layout>
                  <v-layout justify-space-around align-center class="mb-1">
                      <span class="grey--text">{{item.title}}</span>
                  </v-layout>
                </router-link>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    data () {
      return {
        menuItems: [
          {icon: 'add', title: 'New Profile', link: '/new-profile', color: 'info'},
          {icon: 'cloud_download', title: 'Download Profile', link: '/download-profile', color: 'success'},
          {icon: 'cloud_upload', title: 'Upload Profile', link: '/share-profile', color: 'success'},
          {icon: 'edit', title: 'Edit Profile', link: '/edit-profile', color: 'warning'},
          {icon: 'share', title: 'Share Profile', link: '/share-profile', color: 'info'},
          {icon: 'delete', title: 'Delete Profile', link: '/delete-profile', color: 'error'}
        ]
      }
    },
    methods: {
      onNavigate (link) {
        this.$router.push(link)
      }
    }
  }

</script>

<style scoped>
  a {
    text-decoration: none;
    cursor: pointer;
  }
</style>
