<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const example = ref(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);

const total = ref<number>(0);
const selectedInput = ref(true);

const lines = computed(() => {
  const file = selectedInput.value ? example.value : fileContent.value;
  return selectedInput.value ? file?.split('\n') ?? [] : file?.split('\n').slice(0, -1) ?? [];
});

function stepOne() {
  // total.value = result.reduce((a: number, b: number) => a + b, 0);
}

function stepTwo() {
  // total.value = scratchcards.reduce((a, b) => a + b, 0);
}
</script>
<template>
  <Card
    v-model:example="example"
    title="Day 7: Camel Cards"
    :result="total"
    :rating="0"
    @selected-input="selectedInput = $event"
  >
    <template #inputFile>
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary mx-auto w-full max-w-xs"
        @change="handleFileChange"
      />
    </template>
    <template #actions>
      <button type="button" class="btn btn-primary join-item" @click.prevent="stepOne()">Step 1</button>
      <button type="button" class="btn btn-primary join-item" @click.prevent="stepTwo()">Step 2</button>
    </template>
  </Card>
</template>
