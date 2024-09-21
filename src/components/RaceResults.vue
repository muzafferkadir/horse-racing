<template>
  <div>
    <div v-for="(result, index) in raceResults" :key="index" class="mb-2">
      <span class="font-semibold">Run {{ index + 1 }}:</span>
      {{ result.join(', ') }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'RaceResults',
  computed: {
    ...mapState(['raceResults'])
  }
})
</script>
