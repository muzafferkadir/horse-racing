<template>
  <header class="h-[112px] bg-white border-b border-gray-100">
    <div class="container mx-auto flex items-center justify-between h-full">
      <Logo />
      <div class="flex items-center gap-4">
        <button
          class="py-3 px-6 rounded-md border border-primary-500 bg-transparent text-primary-500 font-semibold"
        >
          GENERATE PROGRAM
        </button>
        <button
          class="py-3 px-6 rounded-md border border-primary-500 bg-primary-500 text-white font-semibold"
        >
          START & PAUSE
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Logo from './Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped></style>
