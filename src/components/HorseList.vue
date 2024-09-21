<template>
  <div class="max-w-[275px] max-h-max flex-1 sticky top-5">
    <div class="bg-gray-100 rounded px-6 py-3 text-lg font-semibold">HORSE LIST (1-20)</div>
    <table class="w-full mt-2">
      <thead class="bg-gray-100 rounded">
        <tr>
          <th class="p-2 pl-6 text-left text-xs font-semibold">NAME</th>
          <th class="p-2 text-left text-xs font-semibold">CONDITION</th>
          <th class="p-2 text-left text-xs font-semibold">COLOR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in 20" class="border-b border-gray-100 rounded text-xs">
          <td class="p-2 pl-6">Horse 1</td>
          <td class="p-2">Good</td>
          <td class="p-2">Brown</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped></style>
