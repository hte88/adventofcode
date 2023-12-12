<script setup lang="ts">
//import { isNumber } from '~/composables/useLib';

const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const lines = computed(() => fileContent.value?.split('\n').slice(0, -1) ?? []);

function stepOne() {
  const clearLine = lines.value.map((line) => line.split(':')[1].trim());
  const duplicates = clearLine
    .map((line) => {
      const suit = line.split('|');
      const suit_1 = suit[0].trim().split(' ');
      const suit_2 = suit[1].trim().split(' ');
      return suit_1.filter((suit) => (suit ? suit_2.includes(suit) : ''));
    })
    .filter((str) => str.length);

  const result = duplicates.map((numbers) => (numbers.length > 1 ? Math.pow(2, numbers.length - 1) : 1));

  total.value = result.reduce((a, b) => a + b, 0);
}
</script>
<template>
  <Card title="Day 4: Scratchcards" :result="total">
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs mx-auto"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn join-item btn-primary" @click.prevent="stepOne()">Step 1</button>
    </template>
  </Card>
</template>
