<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from './components/TheHeader.vue'
import HorseList from './components/HorseList.vue'
import RaceArea from './components/RaceArea.vue'
import RaceInfo from './components/RaceInfo.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    HorseList,
    RaceArea,
    RaceInfo
  }
})
</script>

<template>
  <TheHeader />
  <div class="container mx-auto flex gap-5 py-5 px-2 min-w-[1300px]">
    <HorseList />
    <RaceArea />
    <RaceInfo />
  </div>
</template>

<style scoped></style>
