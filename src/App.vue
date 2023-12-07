<script setup lang="ts">
import Trebuchet from './components/Day-1/Trebuchet.vue';
import CubeConundrum from './components/Day-2/CubeConundrum.vue';
import GearRatios from './components/Day-3/GearRatios.vue';

const components = [Trebuchet, CubeConundrum, GearRatios];
</script>

<template>
  <div class="max-w-5xl mx-auto py-10">
    <header>
      <h1 class="text-lg font-semibold">Advent of Code 2023</h1>
    </header>
    <main>
      <ul role="list" class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <li
          v-for="(name, index) in components"
          :key="index"
          class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <component :is="name" />
        </li>
      </ul>
    </main>
  </div>
</template>
