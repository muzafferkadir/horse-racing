<template>
  <div class="flex-1">
    <div class="grid grid-cols-2 gap-2 mb-2">
      <div class="bg-gray-100 rounded px-6 py-3 text-lg font-semibold">PROGRAM</div>
      <div class="bg-gray-100 rounded px-6 py-3 text-lg font-semibold">RESULTS</div>
    </div>
    <div :key="index" v-for="(round, index) in 6" class="mb-5">
      <div class="bg-gray-100 rounded px-6 py-2 font-semibold text-center">
        {{ index + 1 }}ST LAP(1200M)
      </div>
      <div class="grid grid-cols-2 gap-2">
        <table class="w-full mt-2">
          <thead class="bg-gray-100 rounded">
            <tr>
              <th class="p-2 pl-6 text-left text-xs font-semibold">POSITION</th>
              <th class="p-2 text-left text-xs font-semibold">NAME</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="index"
              v-for="(horse, index) in 10"
              class="border-b border-gray-100 rounded text-xs"
            >
              <td class="p-2 pl-6">1</td>
              <td class="p-2">HORSENAME</td>
            </tr>
          </tbody>
        </table>
        <table class="w-full mt-2">
          <thead class="bg-gray-100 rounded">
            <tr>
              <th class="p-2 pl-6 text-left text-xs font-semibold">POSITION</th>
              <th class="p-2 text-left text-xs font-semibold">NAME</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="index"
              v-for="(horse, index) in 10"
              class="border-b border-gray-100 rounded text-xs"
            >
              <td class="p-2 pl-6">1</td>
              <td class="p-2">HORSENAME</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped></style>
