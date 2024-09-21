<template>
  <header class="h-[112px] bg-white border-b border-gray-100">
    <div class="container mx-auto flex items-center justify-between h-full">
      <Logo />
      <div class="flex items-center gap-4">
        <button
          @click="generateProgram"
          class="py-3 px-6 rounded-md border border-primary-500 bg-transparent text-primary-500 font-semibold"
        >
          GENERATE PROGRAM
        </button>
        <button
          @click="toggleRacing"
          :disabled="!isGenerated"
          class="py-3 px-6 rounded-md border border-primary-500 bg-primary-500 text-white font-semibold"
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
import Logo from './Logo.vue'

export default defineComponent({
  components: {
    Logo
  },
  setup() {
    const store = useStore()

    const generateProgram = () => {
      store.dispatch('generateProgram')
    }

    const toggleRacing = () => {
      store.commit('setIsRacing', !store.state.isRacing)
    }

    return {
      generateProgram,
      toggleRacing,
      isRacing: computed(() => store.state.isRacing),
      isGenerated: computed(() => store.state.isGenerated)
    }
  }
})
</script>

<style lang="scss" scoped></style>
