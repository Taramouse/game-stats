<<template>
  <v-layout row wrap>
    <v-flex sm12 md6 offset-md3>
      <v-card class="grid">
        <v-subheader>Manage Game Profiles</v-subheader>
        <v-container grid-list-lg>
          <v-layout row wrap>
            <v-flex xs4 v-for="item in menuItems" :key="item.title">
              <v-btn
                block
                large
                :to="item.link">
                <v-icon color="blue" large>{{ item.icon }}</v-icon>
                <span class="hidden-sm-and-down ml-2">{{ item.title }}</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

    <v-flex sm12 md6 offset-md3>
      <v-card class="grid">
        <v-subheader>Available Game Profiles</v-subheader>
        <v-container grid-list-lg>
          <v-layout row wrap>

            <v-card elevation-2 color="blue-grey darken-2" class="white--text mb-2">
              <v-card-title primary-title>
                <div class="headline">Real Racing 3</div>
              </v-card-title>
              <v-card-text>
                <p>Record your fastest laps and quickest races including car, track and event.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark>Record Now</v-btn>
              </v-card-actions>
            </v-card>

            <v-card elevation-2 color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">War Robots</div>
              </v-card-title>
              <v-card-text>
                <p>Record weapon and robot level.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn flat dark>Record Now</v-btn>
              </v-card-actions>
            </v-card>

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
          {icon: 'create_new_folder', title: 'New Profile', link: '/new-profile', color: 'blue'},
          {icon: 'cloud_download', title: 'Download Profile', link: '/download-profile', color: 'success'},
          {icon: 'cloud_upload', title: 'Upload Profile', link: '/share-profile', color: 'success'},
          {icon: 'edit', title: 'Edit Profile', link: '/edit-profile', color: 'blue'},
          {icon: 'share', title: 'Share Profile', link: '/share-profile', color: 'blue'},
          {icon: 'delete', title: 'Delete Profile', link: '/delete-profile', color: 'danger'}
        ]
      }
    }
  }

</script>
<<style scoped>
  .menuItem {
    font-size: 64px;
  }
</style>

