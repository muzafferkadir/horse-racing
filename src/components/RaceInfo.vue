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
              v-for="position in getRaceResults(race.id)"
              :key="position.horseId"
              class="border-b border-gray-100 rounded text-xs"
            >
              <td class="p-2 pl-6">{{ position.position }}</td>
              <td class="p-2">{{ getHorseName(position.horseId) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import type { Horse, Position, RaceResult } from '../../types/types'

export default defineComponent({
  name: 'RaceInfo',
  computed: {
    ...mapState(['races', 'horses', 'results'])
  },
  methods: {
    getRaceResults(raceId: number): Position[] {
      const raceResult = (this.results as RaceResult[]).find((result) => result.raceId === raceId)
      return raceResult
        ? raceResult.positions.sort((a: Position, b: Position) => a.position - b.position)
        : []
    },
    getHorseName(horseId: number): string {
      const horse = (this.horses as Horse[]).find((h) => h.id === Number(horseId))
      return horse ? `${horse.name} => ${horse.condition}` : 'Unknown Horse'
    }
  }
})
</script>

<style lang="scss" scoped></style>
