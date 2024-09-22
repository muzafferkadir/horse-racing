<template>
  <header class="bg-white border-b border-gray-100 py-8 px-12 lg:px-20">
    <div
      class="container mx-auto flex flex-wrap items-center justify-center gap-8 lg:justify-between h-full"
    >
      <Logo />
      <div class="flex items-center gap-4">
        <button
          @click="generateProgram"
          :disabled="isRacing"
          class="py-3 px-6 rounded-md border border-primary-500 bg-transparent text-primary-500 font-semibold"
        >
          GENERATE PROGRAM
        </button>
        <button
          @click="toggleRacing"
          :disabled="!isGenerated || isProgramFinished"
          class="py-3 px-6 rounded-md border border-primary-500 bg-primary-500 text-white font-semibold"
          :class="{ 'cursor-not-allowed': !isGenerated || isProgramFinished }"
        >
          {{ isRacing ? 'STOP' : 'START' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { State } from '../../types/types'
import Logo from './TheLogo.vue'

export default defineComponent({
  name: 'TheHeader',
  components: {
    Logo
  },
  setup() {
    const store = useStore<State>()

    const generateProgram = (): void => {
      store.dispatch('generateProgram')
    }

    const toggleRacing = (): void => {
      if (!store.state.programStarted) {
        store.dispatch('startProgram')
        return
      }

      store.commit('setIsRacing', !store.state.isRacing)
    }

    return {
      generateProgram,
      toggleRacing,
      isRacing: computed((): boolean => store.state.isRacing),
      isGenerated: computed((): boolean => store.state.isGenerated),
      isProgramFinished: computed((): boolean => store.state.programFinished)
    }
  }
})
</script>

<style lang="scss" scoped></style>
