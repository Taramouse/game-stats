<template>
  <v-container fluid>
      <v-layout column>
        <div class="text-xs-center">
          <h1>{{profileTitle}}</h1>
        </div>
      </v-layout>
      <v-layout row>
          <v-flex xs12 md8>
            <div class="editArea mt-2">

              <draggable v-model="profileItems" @start="drag=true" @end="drag=false">
                <transition-group>
                  <div v-for="item in profileItems" :key="item.id">
                  <v-chip v-model="item.id" close light @input="remove(data.item)">{{item.title}}</v-chip>
                  </div>
                </transition-group>
              </draggable>

            </div>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<<script>
  export default {
    data () {
      return {
        profileTitle: 'Real Racing 3',
        profileItems: [
          { id: '7ghu8', title: 'Fastest Lap' },
          { id: '1tg7j', title: 'Race Time' },
          { id: '2rr6j', title: 'Circuit' },
          { id: '3xtuk', title: 'Car Manufacturer' },
          { id: '4r7hn', title: 'Car Model' }
        ]
      }
    }
  }
</script>

<style scoped>
  .editArea {
    min-width: 100%;
    min-height: 10px;
  }
</style>

