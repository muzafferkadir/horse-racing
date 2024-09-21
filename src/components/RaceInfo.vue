<template>
  <div class="flex-1">
    <div class="grid grid-cols-2 gap-2 mb-2">
      <div class="bg-gray-100 rounded px-6 py-3 text-lg font-semibold">PROGRAM</div>
      <div class="bg-gray-100 rounded px-6 py-3 text-lg font-semibold">RESULTS</div>
    </div>
    <div :key="index" v-for="(race, index) in races" class="mb-5">
      <div class="bg-gray-100 rounded px-6 py-2 font-semibold text-center">
        RACE {{ index + 1 }} ({{ race.distance }}M)
      </div>
      <div class="grid grid-cols-2 gap-2">
        <table class="w-full mt-2">
          <thead class="bg-gray-100 rounded">
            <tr>
              <th class="p-2 pl-6 text-left text-xs font-semibold">POSITION</th>
              <th class="p-2 text-left text-xs font-semibold">NAME</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="horse.id"
              v-for="(horse, horseIndex) in race.participants"
              class="border-b border-gray-100 rounded text-xs"
            >
              <td class="p-2 pl-6">{{ horseIndex + 1 }}</td>
              <td class="p-2">{{ horse.name }}</td>
            </tr>
          </tbody>
        </table>
        <table class="w-full mt-2">
          <thead class="bg-gray-100 rounded">
            <tr>
              <th class="p-2 pl-6 text-left text-xs font-semibold">POSITION</th>
              <th class="p-2 text-left text-xs font-semibold">NAME</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="result.horseId"
              v-for="(result, resultIndex) in getRaceResults(race.id)"
              class="border-b border-gray-100 rounded text-xs"
            >
              <td class="p-2 pl-6">{{ resultIndex + 1 }}</td>
              <td class="p-2">{{ getHorseName(result.horseId) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore()

    const races = computed(() => store.state.races)
    const horses = computed(() => store.state.horses)
    const results = computed(() => store.state.results)

    const getRaceResults = (raceId: number) => {
      return results.value
        .filter((result) => result.raceId === raceId)
        .sort((a, b) => a.position - b.position)
    }

    const getHorseName = (horseId: number) => {
      const horse = horses.value.find((h) => h.id === horseId)
      return horse ? horse.name : 'Unknown Horse'
    }

    return {
      races,
      getRaceResults,
      getHorseName
    }
  }
})
</script>

<style lang="scss" scoped></style>
