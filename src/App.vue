<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import RaceSchedule from './components/RaceSchedule.vue'
import RaceResults from './components/RaceResults.vue'
import RaceTrack from './components/RaceTrack.vue'
import Header from './components/Header.vue'
import HorseList from './components/HorseList.vue'
import RaceArea from './components/RaceArea.vue'
import RaceInfo from './components/RaceInfo.vue'

export default defineComponent({
  name: 'App',
  components: {
    RaceSchedule,
    RaceResults,
    RaceTrack,
    Header,
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
  <Header />
  <div class="container mx-auto flex gap-5 py-5">
    <HorseList />
    <RaceArea :program="program" />
    <RaceInfo />
  </div>
  <!-- <main class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Horse Racing Game</h1>
    <div class="mb-4">
      <button @click="generateRace" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Generate Race
      </button>
      <button @click="startRace" class="bg-green-500 text-white px-4 py-2 rounded">
        Start Race
      </button>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">Race Schedule</h2>
        <race-schedule></race-schedule>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Results</h2>
        <race-results></race-results>
      </div>
    </div>
    <race-track></race-track>
  </main> -->
</template>

<style scoped></style>
