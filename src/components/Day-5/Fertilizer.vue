<script setup lang="ts">
const { fileContent, handleFileChange } = useFileReader();

const example = ref(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`);

const total = ref<number>(0);
const selectedInput = ref(true);

const lines = computed(() => {
  const file = selectedInput.value ? example.value : fileContent.value;
  return selectedInput.value ? file?.split('\n') ?? [] : file?.split('\n').slice(0, -1) ?? [];
});

function stepOne() {
  console.log(lines);

  // total.value = result.reduce((a: number, b: number) => a + b, 0);
}

function stepTwo() {
  // total.value = scratchcards.reduce((a, b) => a + b, 0);
}
</script>
<template>
  <Card
    v-model:example="example"
    title="Day 5: If You Give A Seed A Fertilizer"
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
