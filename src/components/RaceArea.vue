<template>
  <div class="w-[500px]">
    <div class="sticky top-5">
      <div class="max-h-max flex flex-col sticky">
        <div
          class="absolute top-0 bottom-0 right-8 w-1 border-l border-dashed border-primary-500"
        ></div>
        <div
          v-for="(racer, index) in racers"
          :key="racer.id"
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
              :style="{ transform: `translateX(${getRacerPosition(racer)}px)`, color: racer.color }"
            >
              <IconHorse :color="racer.color" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex rounded-md mt-3 justify-center bg-gray-100">
        <div class="py-3 px-6 text-sm font-semibold">
          {{ currentRound.name }} ({{ currentRound.distance }}M)
        </div>
      </div>
      <div v-if="roundResults.length > 0" class="mt-3">
        <h3 class="font-bold">Round Results:</h3>
        <ul>
          <li v-for="(result, index) in roundResults" :key="index">
            Round {{ index + 1 }}: 1st: {{ result[0] }}, 2nd: {{ result[1] }}, 3rd: {{ result[2] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconHorse from './icons/IconHorse.vue'
import type { PropType } from 'vue'

interface Round {
  name: string
  distance: number
}

interface Racer {
  id: number
  name: string
  color: string
  condition: number
  speed: number
  distance: number
  finished: boolean
}

interface HorseRacingProgram {
  rounds: Round[]
  racers: Racer[]
}

export default defineComponent({
  components: {
    IconHorse
  },
  props: {
    program: {
      type: Object as PropType<HorseRacingProgram>,
      required: true
    }
  },
  data() {
    return {
      racers: [] as Racer[],
      currentRoundIndex: 0,
      trackWidth: 400,
      isRacing: false,
      finishedRacers: 0,
      roundResults: [] as number[][]
    }
  },
  computed: {
    currentRound(): Round {
      return this.program.rounds[this.currentRoundIndex]
    }
  },
  mounted() {
    this.initializeRacers()
    this.startRace()
  },
  methods: {
    initializeRacers() {
      this.racers = this.program.racers.map((racer) => ({
        ...racer,
        distance: 0,
        finished: false
      }))
    },
    startRace() {
      this.isRacing = true
      this.animateRace()
    },
    animateRace() {
      if (!this.isRacing) return

      this.racers.forEach((racer) => {
        if (racer.finished) return

        const speedReduction = Math.max(0, (100 - racer.condition) / 100) * 0.1
        const currentSpeed = Math.max(50, racer.speed * (1 - speedReduction))
        racer.distance += currentSpeed / 60

        if (racer.distance >= this.currentRound.distance) {
          racer.distance = this.currentRound.distance
          racer.finished = true
          this.finishedRacers++
        }
      })

      if (this.finishedRacers === this.racers.length) {
        this.finishRound()
      } else {
        requestAnimationFrame(this.animateRace)
      }
    },
    finishRound() {
      const sortedRacers = [...this.racers].sort((a, b) => b.distance - a.distance)
      this.roundResults.push(sortedRacers.slice(0, 3).map((racer) => racer.id))

      if (this.currentRoundIndex < this.program.rounds.length - 1) {
        this.currentRoundIndex++
        this.resetRacersForNextRound()
        this.startRace()
      } else {
        this.isRacing = false
      }
    },
    resetRacersForNextRound() {
      this.racers.forEach((racer) => {
        racer.distance = 0
        racer.finished = false
      })
      this.finishedRacers = 0
    },
    getRacerPosition(racer: Racer) {
      return (racer.distance / this.currentRound.distance) * this.trackWidth
    }
  }
})
</script>
