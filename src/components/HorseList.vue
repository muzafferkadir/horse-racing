<template>
  <div class="max-w-[275px] max-h-max flex-1 sticky top-5">
    <div class="title bg-gray-100 rounded px-6 py-3 text-lg font-semibold">HORSE LIST (1-20)</div>
    <table class="w-full mt-2">
      <thead class="bg-gray-100 rounded">
        <tr>
          <th class="p-2 pl-6 text-left text-xs font-semibold">NAME</th>
          <th class="p-2 text-left text-xs font-semibold">CONDITION</th>
          <th class="p-2 text-left text-xs font-semibold">COLOR</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="horse in horses"
          :key="horse.id"
          class="border-b border-gray-100 rounded text-xs"
        >
          <td class="p-2 pl-6">{{ horse.name }}</td>
          <td class="p-2">{{ horse.condition }}</td>
          <td class="p-2">
            <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: horse.color }"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { Horse } from '../../types/types'

export default defineComponent({
  name: 'HorseList',
  setup() {
    const store = useStore()
    const horses = computed<Horse[]>(() => store.state.horses || [])

    return {
      horses
    }
  }
})
</script>

<style lang="scss" scoped></style>
