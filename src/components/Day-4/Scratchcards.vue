<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const example = ref(`Card 1: 41 48 83 86 17 | 83 86 6 31 17 9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3: 1 21 53 59 44 | 69 82 63 72 16 21 14 1
Card 4: 41 92 73 84 69 | 59 84 76 51 58 5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`);

const total = ref<number>(0);
const selectedInput = ref(true);

const lines = computed(() => {
  const file = selectedInput.value ? example.value : fileContent.value;
  return selectedInput.value ? file?.split('\n') ?? [] : file?.split('\n').slice(0, -1) ?? [];
});

function getMatchingNumbers(lines: string[]) {
  const clearLine = lines.map((line) => line.split(':')[1].trim());
  return clearLine.map((line) => {
    const suit = line.split('|');
    const suit_1 = suit[0].trim().split(' ');
    const suit_2 = suit[1].trim().split(' ');
    return suit_1.filter((suit) => (suit ? suit_2.includes(suit) : ''));
  });
}

function stepOne() {
  const matchingNumbers = getMatchingNumbers(lines.value).filter((str: string[]) => str.length);
  const result = matchingNumbers.map((numbers: string[]) => (numbers.length > 1 ? Math.pow(2, numbers.length - 1) : 1));

  total.value = result.reduce((a: number, b: number) => a + b, 0);
}

function stepTwo() {
  const matchingNumbers = getMatchingNumbers(lines.value).map((numbers: string[]) => numbers.length);

  let scratchcards = [] as number[];

  for (let i = 0; i < matchingNumbers.length; i++) {
    const valueDuplicate = matchingNumbers[i];

    if (i >= scratchcards.length) {
      scratchcards[i] = 1;
    }
    for (let j = i + 1; j <= i + valueDuplicate; j++) {
      scratchcards[j] = (scratchcards[j] || 1) + scratchcards[i];
    }
  }

  total.value = scratchcards.reduce((a, b) => a + b, 0);
}
</script>
<template>
  <Card
    v-model:example="example"
    title="Day 4: Scratchcards"
    :result="total"
    :rating="2"
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
