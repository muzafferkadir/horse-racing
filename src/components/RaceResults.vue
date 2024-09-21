<template>
  <div>
    <div v-for="(result, index) in raceResults" :key="index" class="mb-2">
      <span class="font-semibold">Run {{ index + 1 }}:</span>
      {{ formatResult(result) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { State, RaceResult, Position } from '../../types/types'

export default defineComponent({
  name: 'RaceResults',
  setup() {
    const store = useStore<State>()

    const raceResults = computed(() => store.state.results)

    const formatResult = (result: RaceResult): string => {
      return result.positions
        .sort((a: Position, b: Position) => a.position - b.position)
        .map((position: Position) => position.horseId)
        .join(', ')
    }

    return {
      raceResults,
      formatResult
    }
  }
})
</script>
