<template>
  <div>
    <div v-for="(run, index) in raceSchedule" :key="index" class="mb-2">
      <span class="font-semibold">Run {{ index + 1 }}:</span>
      {{ run.distance }}m - Horses: {{ run.horses.join(', ') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'RaceSchedule',
  computed: {
    ...mapState(['raceSchedule'])
  }
})
</script>
