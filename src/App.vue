<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
// import RaceSchedule from './components/RaceSchedule.vue'
// import RaceResults from './components/RaceResults.vue'
// import RaceTrack from './components/RaceTrack.vue'
import TheHeader from './components/TheHeader.vue'
import HorseList from './components/HorseList.vue'
import RaceArea from './components/RaceArea.vue'
import RaceInfo from './components/RaceInfo.vue'

export default defineComponent({
  name: 'App',
  components: {
    // RaceSchedule,
    // RaceResults,
    // RaceTrack,
    TheHeader,
    HorseList,
    RaceArea,
    RaceInfo
  },
  methods: {
    ...mapActions(['generateRace', 'startRace'])
  },
  data() {
    return {
      program: {
        rounds: [
          { name: 'Round 1', distance: 1200 },
          { name: 'Round 2', distance: 1600 }
        ],
        racers: [
          {
            id: 1,
            name: 'Horse 1',
            color: '#123123',
            condition: 60,
            speed: 60,
            distance: false
          },
          {
            id: 2,
            name: 'Horse 2',
            color: '#AD235B',
            condition: 90,
            speed: 80,
            distance: false
          }
        ]
      }
    }
  }
})
</script>

<template>
  <TheHeader />
  <div class="container mx-auto flex gap-5 py-5 px-2 min-w-[1300px]">
    <HorseList />
    <RaceArea :program="program" />
    <RaceInfo />
  </div>
</template>

<style scoped></style>
