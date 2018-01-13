<template>
    <v-layout row wrap>
      <v-flex sm12 md8 offset-md2>
        <v-card class="grid">

          <v-container grid-list-lg class="grey darken-4">
            <v-layout row wrap>
              <v-flex xs4 v-for="item in menuItems" :key="item.title">
                <!-- <v-btn
                  block
                  large
                  :to="item.link">
                  <v-icon color="blue" large>{{ item.icon }}</v-icon>
                  <span class="hidden-sm-and-down ml-2">{{ item.title }}</span>
                </v-btn> -->

                <v-layout justify-space-around align-center>
                    <a v-ripple @click="onNavigate(item.link)">
                      <v-avatar tile size="8em">
                        <v-icon :color="item.color" x-large>{{item.icon}}</v-icon>
                      </v-avatar>
                    </a>
                </v-layout>
                <v-layout justify-space-around align-center class="mb-1">
                    <span class="grey--text">{{item.title}}</span>
                </v-layout>

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
  }

</style>
