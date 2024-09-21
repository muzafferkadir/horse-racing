<template>
  <div class="mt-4">
    <div v-for="(horse, index) in currentRunHorses" :key="horse.id" class="relative h-8 mb-2">
      <div
        class="absolute h-8 rounded-full"
        :style="{
          width: `${horse.progress}%`,
          backgroundColor: horse.color,
          transition: 'width 0.5s linear'
        }"
      ></div>
      <span class="absolute left-2 top-1 text-white">Horse {{ horse.id }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'RaceTrack',
  computed: {
    ...mapState(['currentRunHorses'])
  }
})
</script>
