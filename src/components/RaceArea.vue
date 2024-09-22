<template>
  <div class="w-[500px]">
    <div class="sticky top-5">
      <div class="max-h-max flex flex-col sticky mb-3">
        <div
          class="absolute top-0 bottom-0 right-8 w-1 border-l border-dashed border-primary-500"
        ></div>
        <div
          v-for="(horse, index) in currentRace.participants"
          :key="horse.id"
          class="flex items-center w-full h-12 border border-t border-dashed border-gray-200"
        >
          <div
            class="w-16 h-full bg-gray-100 flex items-center justify-center font-semibold text-lg"
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1 relative h-full">
            <div
              class="absolute top-1/2 -translate-y-1/2 flex items-center"
              :style="{ transform: `translateX(${getHorsePosition(horse)}px)`, color: horse.color }"
            >
              <IconHorse :color="horse.color" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="currentRace?.participants?.length"
        class="flex rounded-md justify-center bg-gray-100"
      >
        <div class="py-3 px-6 text-sm font-semibold">
          {{ currentRace.name }} ({{ currentRace.distance }}M)
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import IconHorse from './icons/IconHorse.vue'
import type { State, Horse, Race, RaceResult } from '../../types/types'

export default defineComponent({
  components: {
    IconHorse
  },
  setup() {
    const store = useStore<State>()
    const trackWidth = 400
    const racePositions = ref<{ [key: number]: number }>({})
    const finishers = ref<number[]>([])

    const currentRace = computed<Race>(() => {
      const currentRaceId = store.state.currentRaceId
      return (
        store.state.races.find((race) => race.id === currentRaceId) || {
          id: 0,
          name: '',
          distance: 0,
          participants: []
        }
      )
    })

    const raceResults = computed<RaceResult[]>(() => {
      return store.state.results.filter((result) => result.raceId === store.state.currentRaceId)
    })

    watch(
      () => store.state.isRacing,
      (newValue) => {
        if (newValue) {
          startRace()
        }
      }
    )

    watch(
      () => store.state.programStarted,
      () => {
        racePositions.value = {}
      }
    )

    const startRace = () => {
      racePositions.value = {}
      currentRace.value.participants.forEach((horse) => {
        racePositions.value[horse.id] = 0
      })
      animateRace()
    }

    const animateRace = () => {
      if (!store.state.isRacing) return

      let allFinished = true
      let finishersInThisFrame: Horse[] = []
      currentRace.value.participants.forEach((horse) => {
        if (racePositions.value[horse.id] + horse.condition < currentRace.value.distance) {
          const animationSpeed = 100
          racePositions.value[horse.id] +=
            horse.condition / (currentRace.value.distance / animationSpeed)
          allFinished = false
          return
        } else {
          racePositions.value[horse.id] = currentRace.value.distance
          if (!finishers.value.includes(horse.id)) {
            finishersInThisFrame.push(horse)
          }
        }
      })

      finishersInThisFrame.sort((a, b) => b.condition - a.condition)

      finishers.value = [...finishers.value, ...finishersInThisFrame.map((horse) => horse.id)]

      if (allFinished) {
        finishRace()
      } else {
        requestAnimationFrame(animateRace)
      }
    }

    const finishRace = () => {
      store.commit('addResult', {
        raceId: store.state.currentRaceId,
        positions: finishers.value.map((horseId, index) => ({
          horseId,
          position: index + 1
        }))
      })

      finishers.value = []
      racePositions.value = {}
      currentRace.value.participants.forEach((horse) => {
        racePositions.value[horse.id] = 0
      })

      if (store.state.currentRaceId === 6) {
        store.commit('setIsRacing', false)
        store.commit('setProgramStarted', false)
        store.commit('setProgramFinished', true)
        return
      }

      resetAllRacePositions()
      store.commit('nextRace')

      if (!store.state.currentRaceId) {
        store.commit('setIsRacing', false)
        store.commit('setProgramStarted', false)
        return
      }

      startRace()
    }

    const getHorsePosition = (horse: Horse): number => {
      return ((racePositions.value[horse.id] || 0) / (currentRace.value.distance || 1)) * trackWidth
    }

    const getHorseName = (horseId: number): string => {
      const horse = store.state.horses.find((h) => h.id === horseId)
      return horse ? horse.name : 'Unknown'
    }

    const resetAllRacePositions = () => {
      currentRace.value.participants.forEach((horse) => {
        racePositions.value[horse.id] = 0
      })
    }

    return {
      currentRace,
      raceResults,
      getHorsePosition,
      getHorseName
    }
  }
})
</script>
