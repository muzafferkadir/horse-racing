<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import RaceSchedule from './components/RaceSchedule.vue'
import RaceResults from './components/RaceResults.vue'
import RaceTrack from './components/RaceTrack.vue'

export default defineComponent({
  name: 'App',
  components: {
    RaceSchedule,
    RaceResults,
    RaceTrack
  },
  methods: {
    ...mapActions(['generateRace', 'startRace'])
  }
})
</script>

<template>
  <main class="container mx-auto p-4">
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
  </main>
</template>

<style scoped></style>
