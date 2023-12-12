<script setup lang="ts">
//import { isNumber } from '~/composables/useLib';

const { fileContent, handleFileChange } = useFileReader();

const total = ref<number>(0);
const lines = computed(() => fileContent.value?.split('\n').slice(0, -1) ?? []);

function stepOne() {
  total.value = 0;
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
