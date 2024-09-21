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
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import IconHorse from './icons/IconHorse.vue'

export default defineComponent({
  components: {
    IconHorse
  },
  data() {
    return {
      trackWidth: 400,
      racePositions: {} as { [key: number]: number }
    }
  },
  computed: {
    ...mapState(['horses', 'races', 'results', 'isRacing', 'currentRaceId', 'programStarted']),
    currentRace() {
      return (
        this.races.find((race) => race.id === this.currentRaceId) || {
          participants: [],
          distance: 0
        }
      )
    },
    raceResults() {
      return this.results.filter((result) => result.raceId === this.currentRaceId)
    }
  },
  watch: {
    isRacing(newValue) {
      if (newValue) {
        this.startRace()
      }
    }
  },
  methods: {
    ...mapMutations(['setIsRacing', 'addResult']),

    startRace() {
      this.racePositions = {}
      this.currentRace.participants.forEach((horse) => {
        this.racePositions[horse.id] = 0
      })
      this.animateRace()
    },

    animateRace() {
      if (!this.isRacing) return

      let allFinished = true
      this.currentRace.participants.forEach((horse) => {
        if (this.racePositions[horse.id] < this.currentRace.distance) {
          const speedReduction = Math.max(0, (100 - horse.condition) / 100) * 0.1
          const speed = Math.random() * 10 + 5 // Random speed between 5 and 15
          this.racePositions[horse.id] += speed * (1 - speedReduction)
          allFinished = false
        }
      })

      if (allFinished) {
        this.finishRace()
      } else {
        requestAnimationFrame(this.animateRace)
      }
    },

    finishRace() {
      const sortedHorses = Object.entries(this.racePositions)
        .sort(([, a], [, b]) => b - a)
        .map(([id]) => parseInt(id))

      this.addResult({
        raceId: this.currentRaceId,
        positions: sortedHorses.map((horseId, index) => ({ horseId, position: index + 1 }))
      })
      // this.setIsRacing(false)
    },

    getHorsePosition(horse: { id: number }) {
      return (
        ((this.racePositions[horse.id] || 0) / (this.currentRace.distance || 1)) * this.trackWidth
      )
    },

    getHorseName(horseId: number) {
      const horse = this.horses.find((h) => h.id === horseId)
      return horse ? horse.name : 'Unknown'
    }
  }
})
</script>
