<template>
  <div>
    <div v-for="(race, index) in races" :key="race.id" class="mb-2">
      <span class="font-semibold">Run {{ index + 1 }}:</span>
      {{ race.distance }}m - Horses: {{ getHorseNames(race.participants) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { State, Race, Horse } from '../../types/types'

export default defineComponent({
  name: 'RaceSchedule',
  setup() {
    const store = useStore<State>()

    const races = computed((): Race[] => store.state.races)

    const getHorseNames = (horses: Horse[]): string => {
      return horses.map((horse) => horse.name).join(', ')
    }

    return {
      races,
      getHorseNames
    }
  }
})
</script>
